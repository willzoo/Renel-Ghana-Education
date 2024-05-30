#citation: chatgpt.com
from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId

admin_bp = Blueprint('admin', __name__)

# Create an admin
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

# Read an admin
@admin_bp.route('/admins/<admin_id>', methods=['GET'])
def read_admin(admin_id):
    mongo = current_app.extensions["pymongo"]
    admin = mongo.db.admin.find_one({"_id": ObjectId(admin_id)})

    if admin:
        admin['_id'] = str(admin['_id'])
        return jsonify(admin), 200
    else:
        return jsonify({"error": "Admin not found"}), 404

# Update an admin
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

# Delete an admin
@admin_bp.route('/admins/<admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    mongo = current_app.extensions['pymongo']
    db = mongo.cx.EduTracker
    result = db.admin.delete_one({"_id": ObjectId(admin_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Admin deleted successfully"}), 200
    else:
        return jsonify({"error": "Admin not found"}), 404
