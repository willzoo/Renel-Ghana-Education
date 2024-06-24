#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
import bcrypt

# Create a Blueprint instance for teachers
teacher_bp = Blueprint('teacher', __name__)

# Route to make a new teacher #ADMIN
@teacher_bp.route('/teachers', methods=['POST'])
def create_teacher():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        school_id = data.get('school_id')
        classes = data.get('classes', [])

        # Check for required fields
        if not name or not email or not school_id:
            return jsonify({"error": "Missing required fields"}), 400

        teacher_data = {
            "name": name,
            "email": email,
            "password": password,
            "school_id": school_id,
            "classes": classes
        }
        
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.teachers.insert_one(teacher_data)
        
        # Add the new teacher to the school's teacher list
        teacher_id = result.inserted_id

        print(school_id)
        print(teacher_id)

        result2 = db.schools.update_one(
            {"_id": ObjectId(school_id)},
            {"$push": {"teachers": teacher_id}}
        )
        print(result2)

        return jsonify({"message": "Teacher created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}),

# New route to get a teacher's classes, name, and email
@teacher_bp.route('/teachers/<teacher_id>/classes', methods=['GET'])
def get_teacher_classes(teacher_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Debugging: Print teacher_id
        # print(f"Fetching details for teacher_id: {teacher_id}")

        # Fetch teacher details
        teacher = db.teachers.find_one({"_id": ObjectId(teacher_id)}, {"name": 1, "email": 1, "school_id": 1, "classes": 1})
        
        # Debugging: Print fetched teacher details
        # print(f"Fetched teacher details: {teacher}")

        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404

        # Extract details
        teacher_name = teacher.get('name')
        teacher_email = teacher.get('email')
        school_id = teacher.get('school_id')

        # Fetch school name using school_id
        school = db.schools.find_one({"_id": ObjectId(school_id)}, {"name": 1})
        
        # Debugging: Print fetched school details
        # print(f"Fetched school details: {school}")

        if not school:
            return jsonify({"error": "School not found"}), 404

        school_name = school.get('name')

        class_ids = teacher.get('classes', [])
        if not class_ids:
            return jsonify({"name": teacher_name, "email": teacher_email, "school_name": school_name, "classes": []}), 200
        
        # Fetch class details
        classes = list(db.classes.find(
            {"_id": {"$in": [ObjectId(class_id) for class_id in class_ids]}},
            {"class_name": 1, "grade_level": 1, "school_id": 1, "teacher_id": 1, "students": 1}
        ))
        
        # Convert ObjectId fields to strings for JSON serialization
        for cls in classes:
            cls['_id'] = str(cls['_id'])
            cls['school_id'] = str(cls['school_id'])
            cls['teacher_id'] = str(cls['teacher_id'])
            cls['students'] = [str(student_id) for student_id in cls.get('students', [])]

            # Fetch student details (if necessary)
            student_ids = [ObjectId(student_id) for student_id in cls['students']]
            student_cursor = db.students.find({"_id": {"$in": student_ids}})
            students = []
            for student in student_cursor:
                student['_id'] = str(student['_id'])
                student['school_id'] = str(student['school_id'])
                student['class_id'] = str(student['class_id'])
                students.append(student)            
            cls['students'] = students

        return jsonify({"name": teacher_name, "email": teacher_email, "school_name": school_name, "school_id": school_id, "classes": classes}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route to patch (add) a new class to a teacher's list of classes
@teacher_bp.route('/teachers/<teacher_id>/classes', methods=['PATCH'])
def add_teacher_class(teacher_id):
    try:
        data = request.get_json()
        new_class_id = data.get('class_id')

        if not new_class_id:
            return jsonify({"error": "Missing class_id"}), 400

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Add the new class to the teacher's classes
        result = db.teachers.update_one(
            {"_id": ObjectId(teacher_id)},
            {"$addToSet": {"classes": new_class_id}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Teacher not found"}), 404

        return jsonify({"message": "Class added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Used for Teacher Login
@teacher_bp.route('/teachers/login', methods=['PATCH'])
def login_teacher():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Find the teacher by email
        teacher = db.teachers.find_one({"email": email})

        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404

        # Check if the provided password matches the stored hashed password
        if bcrypt.checkpw(password.encode('utf-8'), teacher['password']):
            return jsonify({"message": "Login successful", "teacher_id": str(teacher['_id'])}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Used for Teacher Registration
@teacher_bp.route('/teachers/registration', methods=['PATCH'])
def register_teacher():
    try:
        data = request.get_json()
        email = data.get('email')
        access_code = data.get('access_code')
        new_password = data.get('password')

        if not email or not access_code or not new_password:
            return jsonify({"error": "Missing email or password"}), 400

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Find the teacher by email
        teacher = db.teachers.find_one({"email": email})
        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404
        if teacher['password'] != '':
            return jsonify({"error": "Teacher already registered"}), 404
        
        # Find the school by _id
        school = db.schools.find_one({"_id": ObjectId(teacher['school_id'])})
        if not school:
            return jsonify({"error": "School not found"}), 404

        # Check if the provided access code matches the stored access code
        if access_code == school['access_code']:
            # Update the teacher's password
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            db.teachers.update_one(
                {"_id": ObjectId(teacher['_id'])},
                {"$set": {"password": hashed_password}}
            )
            return jsonify({"message": "Registration successful", "teacher_id": str(teacher['_id'])}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500






# --- UNUSED Routes --- 

# Route to patch a teacher with new info - UNUSED -
@teacher_bp.route('/teachers/<teacher_id>', methods=['PATCH'])
def update_teacher(teacher_id):
    try:
        data = request.get_json()

        # Filter out keys with None values
        update_data = {key: value for key, value in data.items() if value is not None}

        # Check if there is any data to update
        if not update_data:
            return jsonify({"error": "No fields to update"}), 400

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Update the teacher document
        result = db.teachers.update_one({"_id": ObjectId(teacher_id)}, {"$set": update_data})

        if result.matched_count == 0:
            return jsonify({"error": "Teacher not found"}), 404

        return jsonify({"message": "Teacher updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#Route to patch a teacher's password - UNUSED - 
@teacher_bp.route('/teachers/<teacher_id>/password', methods=['PATCH'])
def update_teacher_password(teacher_id):
    try:
        data = request.get_json()
        new_password = data.get('password')

        if not new_password:
            return jsonify({"error": "Missing password"}), 400

        # Hash the new password using bcrypt
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Update the teacher's password
        result = db.teachers.update_one(
            {"_id": ObjectId(teacher_id)},
            {"$set": {"password": hashed_password}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Teacher not found"}), 404

        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500