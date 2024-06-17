#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId

class_bp = Blueprint('class', __name__)

# Create a new class
@class_bp.route('/classes', methods=['POST'])
def create_class():
    data = request.get_json()
    class_name = data.get('class_name')
    grade_level = data.get('grade_level')
    school_id = data.get('school_id')
    teacher_id = data.get('teacher_id')
    students = data.get('students', [])

    if not class_name or not grade_level: # or not school_id or not teacher_id:
        return jsonify({"error": "Missing required fields"}), 400

    new_class = {
        'class_name': class_name,
        'grade_level': grade_level,
        'school_id': ObjectId(school_id),
        'teacher_id': ObjectId(teacher_id),
        'students': [ObjectId(student) for student in students]
    }

    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.classes.insert_one(new_class)
        class_id = str(result.inserted_id)

        #Patch teacher record with new class
        add_teacher_class(teacher_id, class_id)

        return jsonify({"message": "Class created successfully", "class_id": class_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Function to add a new class to a teacher's list of classes
def add_teacher_class(teacher_id, class_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        print("TESTING")

        # Add the new class to the teacher's classes
        result = db.teachers.update_one(
            {"_id": ObjectId(teacher_id)},
            {"$addToSet": {"classes": ObjectId(class_id)}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Teacher not found"}), 404

        return jsonify({"message": "Class added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Read class information
@class_bp.route('/classes/<class_id>', methods=['GET'])
def get_class(class_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        class_data = db.classes.find_one({"_id": ObjectId(class_id)})
        if not class_data:
            return jsonify({"error": "Class not found"}), 404

        class_data['_id'] = str(class_data['_id'])
        class_data['school_id'] = str(class_data['school_id'])
        class_data['teacher_id'] = str(class_data['teacher_id'])
        class_data['students'] = [str(student) for student in class_data['students']]

        return jsonify(class_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get class roster
@class_bp.route('/classes/<class_id>/roster', methods=['GET'])
def get_class_roster(class_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        class_data = db.classes.find_one({"_id": ObjectId(class_id)})
        if not class_data:
            return jsonify({"error": "Class not found"}), 404

        student_ids = class_data.get('students', [])
        students = mongo.db.students.find({"_id": {"$in": student_ids}})

        roster = []
        for student in students:
            student['_id'] = str(student['_id'])
            roster.append(student)

        return jsonify(roster), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update class information
@class_bp.route('/classes/<class_id>', methods=['PUT'])
def update_class(class_id):
    data = request.get_json()
    update_data = {key: value for key, value in data.items() if value is not None}

    # Convert ObjectId fields
    if 'school_id' in update_data:
        update_data['school_id'] = ObjectId(update_data['school_id'])
    if 'teacher_id' in update_data:
        update_data['teacher_id'] = ObjectId(update_data['teacher_id'])
    if 'students' in update_data:
        update_data['students'] = [ObjectId(student) for student in update_data['students']]

    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.classes.update_one({"_id": ObjectId(class_id)}, {"$set": update_data})
        if result.matched_count == 0:
            return jsonify({"error": "Class not found"}), 404

        return jsonify({"message": "Class updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update student list in a class
@class_bp.route('/classes/<class_id>/students', methods=['PUT'])
def update_class_students(class_id):
    data = request.get_json()
    student_ids = data.get('students', [])

    if not isinstance(student_ids, list):
        return jsonify({"error": "Students field must be a list"}), 400

    student_object_ids = [ObjectId(student_id) for student_id in student_ids]

    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.classes.update_one({"_id": ObjectId(class_id)}, {"$set": {"students": student_object_ids}})
        if result.matched_count == 0:
            return jsonify({"error": "Class not found"}), 404

        return jsonify({"message": "Student list updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a class (if needed)
@class_bp.route('/classes/<class_id>', methods=['DELETE'])
def delete_class(class_id):
    try:
        # Remove the class from the classes list in the grade_levels collection
        grade_level_update_result = mongo.db.grade_levels.update_many(
            {},
            {'$pull': {'classes': ObjectId(class_id)}}
        )
        
        if grade_level_update_result.modified_count == 0:
            return jsonify({'error': 'Class not found in any grade level'}), 404

        # Delete the class document
        class_delete_result = mongo.db.classes.delete_one({'_id': ObjectId(class_id)})

        if class_delete_result.deleted_count == 0:
            return jsonify({'error': 'Class not found'}), 404

        return jsonify({'message': 'Class deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#Route that adds a student to a class but checks if the student has been in the school's database previously
@class_bp.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    student_school_id = data.get('student_school_id')
    teacher_id = data.get('teacher_id')

    # Find the teacher to get the school_id
    teacher = db.teachers.find_one({'_id': teacher_id})
    if not teacher:
        return jsonify({"error": "Teacher not found"}), 404

    school_id = teacher['school_id']
    
    # Check current students
    current_students = db.students.find_one({'student_school_id': student_school_id, 'school_id': school_id})
    if current_students:
        return jsonify({"status": "existing", "student": current_students})

    # Check past students
    school = db.schools.find_one({'_id': school_id})
    if not school:
        return jsonify({"error": "School not found"}), 404

    for year in school.get('past_years', []):
        for grade in year.get('grade_levels', []):
            for cls in grade.get('classes', []):
                for student in cls.get('students', []):
                    if student.get('student_school_id') == student_school_id:
                        return jsonify({"status": "existing", "student": student})

    # If student not found, create a new student
    new_student = {
        "student_school_id": student_school_id,
        "name": data.get('name'),
        "parent_contact": data.get('parent_contact'),
        "dob": data.get('dob'),
        "disabled": data.get('disabled'),
        "health_conditions": data.get('health_conditions'),
        "misc_info": data.get('misc_info'),
        "class_id": data.get('class_id'),
        "grade_level": data.get('grade_level'),
        "school_id": school_id,
        "history": []
    }
    db.students.insert_one(new_student)
    return jsonify({"status": "new", "student": new_student})

# Remove a student from the class's student list as well as removes the student's class_id
@class_bp.route('/classes/<class_id>/students/<student_id>', methods=['PATCH'])
def remove_student_from_class(class_id, student_id):
    try:
        # Remove class_id from the student document
        student_update_result = mongo.db.students.update_one(
            {'_id': ObjectId(student_id)},
            {'$unset': {'class_id': ""}}
        )
        
        if student_update_result.modified_count == 0:
            return jsonify({'error': 'Student not found or already removed from class'}), 404
        
        # Remove student from the class's student list
        class_update_result = mongo.db.classes.update_one(
            {'_id': ObjectId(class_id)},
            {'$pull': {'students': ObjectId(student_id)}}
        )
        
        if class_update_result.modified_count == 0:
            return jsonify({'error': 'Class not found or student not in class'}), 404

        return jsonify({'message': 'Student removed from class successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500