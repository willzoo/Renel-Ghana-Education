#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
import random
import string

school_bp = Blueprint('school', __name__)

def generate_unique_code(collection, field):
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        if not collection.find_one({field: code}):
            return code
        
@school_bp.route('/schools', methods=['POST'])
def create_school():
    try:
        data = request.get_json()
        name = data.get('name')
        teachers = data.get('teachers', [])
        grade_levels = data.get('grade_levels', [])

        # Check for required fields
        if not name:
            return jsonify({"error": "Missing required fields"}), 400

        school_data = {
            "name": name,
#            "access_code": access_code,
            "teachers": teachers,
            "grade_levels": grade_levels
        }

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        result = db.schools.insert_one(school_data)

        # Get the _id of the newly created school
        school_id = result.inserted_id

        return jsonify({"message": "School created successfully", "_id": str(school_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New route to get info of all schools with teachers defined
@school_bp.route('/schools/teachers', methods=['GET'])
def get_schools_with_teachers():
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Fetch all schools
        schools_cursor = db.schools.find({})
        schools = []

        for school in schools_cursor:
            school['_id'] = str(school['_id'])
            teacher_ids = school.get('teachers', [])
            teacher_ids = [ObjectId(teacher_id) for teacher_id in teacher_ids]

            # Fetch teacher details for the teachers in this school
            teacher_cursor = db.teachers.find({"_id": {"$in": teacher_ids}})
            teachers = []
            for teacher in teacher_cursor:                
                teachers.append({
                    '_id': str(teacher['_id']),
                    'name': teacher['name'],
                    'email': teacher['email'],
                })

            # Add school and its teachers to the list
            school['teachers'] = teachers
            schools.append(school)

        return jsonify(schools), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# New route to get a teacher's school name using the teacher's ID
@school_bp.route('/schools/teacher/<teacher_id>/name', methods=['GET'])
def get_teacher_school_name(teacher_id):
    try:
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        teacher = db.teachers.find_one({"_id": ObjectId(teacher_id)}, {"school_id": 1})
        if not teacher:
            return jsonify({"error": "Teacher not found"}), 404

        school = db.schools.find_one({"_id": ObjectId(teacher['school_id'])}, {"name": 1})
        if not school:
            return jsonify({"error": "School not found"}), 404

        return jsonify({"school_name": school['name']}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# GET route to fetch specific school's grade list and their students
@school_bp.route('/schools/<school_id>/grades', methods=['GET'])
def get_school_grades_and_students(school_id):
    try:
        # Convert school_id to ObjectId
        school_id = ObjectId(school_id)
        
        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Connect to the collections
        schools_collection = mongo.db.schools
        classes_collection = mongo.db.classes
        students_collection = mongo.db.students
        
        # Fetch school document to ensure it exists
        school = schools_collection.find_one({"_id": school_id}, {"grade_list": 1})
        
        if not school:
            return jsonify({"error": "School not found"}), 404
        
        # Initialize the response structure
        grade_list = school.get("grade_list", [])
        detailed_grades = []
        
        # Iterate through the grades to fetch class and student information
        for grade in grade_list:
            grade_level = grade.get("grade_level")
            classes = list(classes_collection.find({"school_id": school_id, "grade_level": grade_level}))
            
            # Fetch students for each class
            for _class in classes:
                _class['_id'] = str(_class['_id'])  # Convert ObjectId to string
                student_cursor = students_collection.find({"class_id": _class['_id']})
                _class['students'] = []
                for student in student_cursor:
                    student['_id'] = str(student['_id'])
                    student['school_id'] = str(student['school_id'])
                    student['class_id'] = str(student['class_id'])
                    student['name'] = str(student['name'])
                    student['guardian_name'] = str(student['guardian_name'])
                    student['guardian_contact'] = str(student['guardian_contact'])
                    student['dob'] = str(student['dob'])
                    student['student_school_id'] = str(student['student_school_id'])
                    student['disabled'] = str(student['disabled'])
                    student['health_conditions'] = str(student['health_conditions'])
                    student['misc_info'] = str(student['misc_info'])
                    student['grade_level'] = str(student['grade_level'])
                    _class['students'].append(student)
            
            # Append detailed information for the grade
            detailed_grades.append({
                "grade_level": grade_level,
                "classes": classes
            })
        
        # Return the detailed grades and students as JSON response
        return jsonify(detailed_grades), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

