#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId

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
        return jsonify({"error": str(e)}), 500

# New route to get a teacher's classes, name, and email
@teacher_bp.route('/teachers/<teacher_id>/classes', methods=['GET'])
def get_teacher_classes(teacher_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        teacher = db.teachers.find_one({"_id": ObjectId(teacher_id)}, {"name": 1, "email": 1, "classes": 1})
        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404

        # Convert ObjectId to string for JSON serialization
        teacher['_id'] = str(teacher['_id'])
        teacher['classes'] = [str(class_id) for class_id in teacher.get('classes', [])]

        return jsonify(teacher), 200
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

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Update the teacher's password
        result = db.teachers.update_one(
            {"_id": ObjectId(teacher_id)},
            {"$set": {"password": new_password}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Teacher not found"}), 404

        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
