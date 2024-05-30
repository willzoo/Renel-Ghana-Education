#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app

school_bp = Blueprint('school', __name__)

@school_bp.route('/schools', methods=['POST'])
def create_school():
    try:
        data = request.get_json()
        school_id = data.get('_id')
        name = data.get('name')
        access_code = data.get('access_code')
        year = data.get('year')
        teachers = data.get('teachers', [])
        grade_levels = data.get('grade_levels', [])

        # Check for required fields
        if not school_id or not name or not access_code or not year:
            return jsonify({"error": "Missing required fields"}), 400

        school_data = {
            "_id": school_id,
            "name": name,
            "access_code": access_code,
            "year": year,
            "teachers": teachers,
            "grade_levels": grade_levels
        }

        mongo = current_app.extensions['pymongo']
        mongo.db.schools.insert_one(school_data)
        return jsonify({"message": "School created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
