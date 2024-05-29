from flask import Blueprint, request, jsonify
from db import mongo

# Create a Blueprint instance for teachers
teacher_bp = Blueprint('teacher_bp', __name__)

@teacher_bp.route('/', methods=['POST'])
def create_teacher():
    try:
        data = request.get_json()
        teacher_id = data.get('_id')
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        current_school_id = data.get('current_school_id')
        current_classes = data.get('current_classes', [])

        # Check for required fields
        if not teacher_id or not name or not email or not password or not current_school_id:
            return jsonify({"error": "Missing required fields"}), 400

        teacher_data = {
            "_id": teacher_id,
            "name": name,
            "email": email,
            "password": password,
            "current_school_id": current_school_id,
            "current_classes": current_classes
        }

        mongo.db.teachers.insert_one(teacher_data)
        return jsonify({"message": "Teacher created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
