#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
import bcrypt

admin_bp = Blueprint('admin', __name__)

# Log in to admin account
@admin_bp.route('/admins/login', methods=['PATCH'])
def login_teacher():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker

        # Find the admin by email
        admin = db.admin.find_one({"email": email})

        if not admin:
            return jsonify({"error": "Admin not found"}), 404

        # Check if the provided password matches the stored hashed password
        if bcrypt.checkpw(password.encode('utf-8'), admin['password']):
            return jsonify({"message": "Login successful", "_id": str(admin['_id'])}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create an admin # -- UNUSED --
@admin_bp.route('/admins', methods=['POST'])
def create_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    
    mongo = current_app.extensions['pymongo']
    db = mongo.cx.EduTracker
    admin_id = db.admin.insert_one({
        "email": email,
        "password": password
    }).inserted_id

    return jsonify({"_id": str(admin_id), "email": email}), 201

# Read an admin # -- UNUSED --
@admin_bp.route('/admins/<admin_id>', methods=['GET'])
def read_admin(admin_id):
    mongo = current_app.extensions["pymongo"]
    admin = mongo.db.admin.find_one({"_id": ObjectId(admin_id)})

    if admin:
        admin['_id'] = str(admin['_id'])
        return jsonify(admin), 200
    else:
        return jsonify({"error": "Admin not found"}), 404

# Update an admin # -- UNUSED --
@admin_bp.route('/admins/<admin_id>', methods=['PUT'])
def update_admin(admin_id):
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    update_data = {}
    if email:
        update_data['email'] = email
    if password:
        update_data['password'] = password

    mongo = current_app.extensions['pymongo']
    db = mongo.cx.EduTracker
    result = db.admin.update_one({"_id": ObjectId(admin_id)}, {"$set": update_data})

    if result.matched_count > 0:
        return jsonify({"message": "Admin updated successfully"}), 200
    else:
        return jsonify({"error": "Admin not found"}), 404

# Delete an admin # -- UNUSED --
@admin_bp.route('/admins/<admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    mongo = current_app.extensions['pymongo']
    db = mongo.cx.EduTracker
    result = db.admin.delete_one({"_id": ObjectId(admin_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Admin deleted successfully"}), 200
    else:
        return jsonify({"error": "Admin not found"}), 404

# Route that creates multiple teacher accounts with an email list # -- UNUSED --
@admin_bp.route('/admins/create_accounts', methods=['POST'])
def create_multiple_accounts():
    try:
        data = request.get_json()
        emails = data.get('emails')
        school_id = data.get('school_id')

        if not emails:
            return jsonify({"error": "Emails are required"}), 400

        if not school_id:
            return jsonify({"error": "School ID is required"}), 400

        email_list = [email.strip() for email in emails.split(',') if email.strip()]

        if not email_list:
            return jsonify({"error": "Invalid email list"}), 400

        mongo = current_app.extensions['pymongo']
        db = mongo.cx.EduTracker
        created_accounts = []

        for email in email_list:
            new_account = {
                "email": email,
                "password": bcrypt.hashpw(b''.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),  # Set to an empty password
                "school_id": school_id
            }
            result = db.teachers.insert_one(new_account)
            created_accounts.append(str(result.inserted_id))

        return jsonify({"message": "Accounts created successfully", "accounts": created_accounts}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
