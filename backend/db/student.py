#citation: chatgpt
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId

student_bp = Blueprint('student', __name__)

# Create a new student
@student_bp.route('/students', methods=['POST'])
def create_student():
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 415
    
    data = request.get_json(force=True, silent=True)  # force=True to handle empty body
    if data is None:
        return jsonify({"error": "No input data provided"}), 400
    
    name = data.get('name')
    guardian_name = data.get('guardian_name')
    guardian_contact = data.get('guardian_contact')
    dob = data.get('dob')
    student_school_id = data.get('student_school_id')
    disabled = data.get('disabled', False)
    health_conditions = data.get('health_conditions', '')
    misc_info = data.get('misc_info', '')
    class_id = data.get('class_id')
    grade_level = data.get('grade_level')
    school_id = data.get('school_id')

    if not name or not guardian_contact or not class_id or not grade_level or not school_id:
        return jsonify({"error": "Missing required fields"}), 400
    
    new_student = {
        'name': name,
        'guardian_name': guardian_name,
        'guardian_contact': guardian_contact,
        'dob': dob,
        "student_school_id": student_school_id,
        'disabled': disabled,
        'health_conditions': health_conditions,
        'misc_info': misc_info,
        'class_id': class_id,
        'grade_level': grade_level,
        'school_id': school_id,
        'history': []
    }

    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker  
        result = db.students.insert_one(new_student)
        student_id = str(result.inserted_id)
        
        # Add the student reference to its class
        db.classes.update_one(
            {"_id": ObjectId(class_id)},
            {"$addToSet": {"students": ObjectId(student_id)}}
        )

        return jsonify({"message": "Student created successfully", "student_id": student_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Read student information
@student_bp.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        student = db.students.find_one({"_id": ObjectId(student_id)})
        if not student:
            return jsonify({"error": "Student not found"}), 404

        student['_id'] = str(student['_id'])
        return jsonify(student), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update student information
@student_bp.route('/students/<student_id>', methods=['PATCH'])
def update_student(student_id):
    data = request.get_json()
    update_data = {key: value for key, value in data.items() if value is not None}
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.students.update_one({"_id": ObjectId(student_id)}, {"$set": update_data})
        if result.matched_count == 0:
            return jsonify({"error": "Student not found"}), 404

        return jsonify({"message": "Student updated successfully"}), 200
    except Exception as e:
        print("error" + str(e))
        return jsonify({"error": str(e)}), 500

# Delete a student (if needed)
@student_bp.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.students.delete_one({"_id": ObjectId(student_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Student not found"}), 404

        return jsonify({"message": "Student deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500