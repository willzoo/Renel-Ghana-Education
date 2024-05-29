#citation: chatgpt.com

from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId

class_bp = Blueprint('class', __name__)

# Create a new class
@class_bp.route('/classes', methods=['POST'])
def create_class():
    mongo = current_app.extensions['pymongo']

    data = request.get_json()
    class_name = data.get('class_name')
    grade_level = data.get('grade_level')
    school_id = data.get('school_id')
    teacher_id = data.get('teacher_id')
    students = data.get('students', [])

    if not class_name or not grade_level or not school_id or not teacher_id:
        return jsonify({"error": "Missing required fields"}), 400

    new_class = {
        'class_name': class_name,
        'grade_level': grade_level,
        'school_id': ObjectId(school_id),
        'teacher_id': ObjectId(teacher_id),
        'students': [ObjectId(student) for student in students]
    }

    try:
        result = mongo.db.classes.insert_one(new_class)
        class_id = str(result.inserted_id)
        return jsonify({"message": "Class created successfully", "class_id": class_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Read class information
@class_bp.route('/classes/<class_id>', methods=['GET'])
def get_class(class_id):
    mongo = current_app.extensions['pymongo']
    try:
        class_data = mongo.db.classes.find_one({"_id": ObjectId(class_id)})
        if not class_data:
            return jsonify({"error": "Class not found"}), 404

        class_data['_id'] = str(class_data['_id'])
        class_data['school_id'] = str(class_data['school_id'])
        class_data['teacher_id'] = str(class_data['teacher_id'])
        class_data['students'] = [str(student) for student in class_data['students']]

        return jsonify(class_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update class information
@class_bp.route('/classes/<class_id>', methods=['PUT'])
def update_class(class_id):
    mongo = current_app.extensions['pymongo']
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
        result = mongo.db.classes.update_one({"_id": ObjectId(class_id)}, {"$set": update_data})
        if result.matched_count == 0:
            return jsonify({"error": "Class not found"}), 404

        return jsonify({"message": "Class updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a class (if needed)
@class_bp.route('/classes/<class_id>', methods=['DELETE'])
def delete_class(class_id):
    mongo = current_app.extensions['pymongo']
    try:
        result = mongo.db.classes.delete_one({"_id": ObjectId(class_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Class not found"}), 404

        return jsonify({"message": "Class deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update student list in a class
@class_bp.route('/classes/<class_id>/students', methods=['PUT'])
def update_class_students(class_id):
    mongo = current_app.extensions['pymongo']
    data = request.get_json()
    student_ids = data.get('students', [])

    if not isinstance(student_ids, list):
        return jsonify({"error": "Students field must be a list"}), 400

    student_object_ids = [ObjectId(student_id) for student_id in student_ids]

    try:
        result = mongo.db.classes.update_one({"_id": ObjectId(class_id)}, {"$set": {"students": student_object_ids}})
        if result.matched_count == 0:
            return jsonify({"error": "Class not found"}), 404

        return jsonify({"message": "Student list updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get class roster
@class_bp.route('/classes/<class_id>/roster', methods=['GET'])
def get_class_roster(class_id):
    mongo = current_app.extensions['pymongo']
    try:
        class_data = mongo.db.classes.find_one({"_id": ObjectId(class_id)})
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