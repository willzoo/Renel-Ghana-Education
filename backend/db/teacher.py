#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
import bcrypt

# Create a Blueprint instance for teachers
teacher_bp = Blueprint('teacher', __name__)

@teacher_bp.route('/teachers', methods=['POST'])
def create_teacher():
    try:
        data = request.get_json()
        teacher_id = data.get('_id')
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        school_id = data.get('school_id')
        classes = data.get('classes', [])

        # Check for required fields
        if not teacher_id or not name or not email or not password or not school_id:
            return jsonify({"error": "Missing required fields"}), 400

        teacher_data = {
            "_id": teacher_id,
            "name": name,
            "email": email,
            "password": password,
            "school_id": school_id,
            "classes": classes
        }
        
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        db.teachers.insert_one(teacher_data)
        return jsonify({"message": "Teacher created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}),

# New route to get a teacher's classes, name, and email
@teacher_bp.route('/teachers/<teacher_id>/classes', methods=['GET'])
def get_teacher_classes(teacher_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Fetch teacher's class IDs
        teacher = db.teachers.find_one({"_id": ObjectId(teacher_id)}, {"classes": 1})
        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404

        class_ids = teacher.get('classes', [])
        if not class_ids:
            return jsonify([]), 200
        
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

            # Fetch and convert student details
            student_ids = [ObjectId(student_id) for student_id in cls['students']]
            student_cursor = db.students.find({"_id": {"$in": student_ids}})
            students = []
            for student in student_cursor:
                student['_id'] = str(student['_id'])
                student['school_id'] = str(student['school_id'])
                student['class_id'] = str(student['class_id'])
                student['name'] = str(student['name'])
                student['parent_contact'] = str(student['parent_contact'])
                student['dob'] = str(student['dob'])
                student['student_school_id'] = str(student['student_school_id'])
                student['disabled'] = str(student['disabled'])
                student['health_conditions'] = str(student['health_conditions'])
                student['misc_info'] = str(student['misc_info'])
                student['class_id'] = str(student['class_id'])
                student['grade_level'] = str(student['grade_level'])
                student['school_id'] = str(student['school_id'])
                students.append(student)            
            cls['students'] = students

        return jsonify(classes), 200
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

@teacher_bp.route('/teachers/login', methods=['GET'])
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

