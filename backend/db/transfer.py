from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId


transfer_bp = Blueprint('transfer', __name__)

# Create a transfer
@transfer_bp.route('/transfers', methods=['POST'])
def create_transfer():
    mongo = current_app.extensions["pymongo"]
    data = request.get_json()
    students = data.get('students')

    if not students:
        return jsonify({"error": "Students list is required"}), 400

    transfer_id = mongo.db.transfer.insert_one({
        "students": students
    }).inserted_id

    return jsonify({"_id": str(transfer_id)}), 201

# Read a transfer
@transfer_bp.route('/transfers/<transfer_id>', methods=['GET'])
def read_transfer(transfer_id):
    mongo = current_app.extensions["pymongo"]
    transfer = mongo.db.transfer.find_one({"_id": ObjectId(transfer_id)})

    if transfer:
        transfer['_id'] = str(transfer['_id'])
        return jsonify(transfer), 200
    else:
        return jsonify({"error": "Transfer not found"}), 404

# Update a transfer
@transfer_bp.route('/transfers/<transfer_id>', methods=['PUT'])
def update_transfer(transfer_id):
    mongo = current_app.extensions["pymongo"]
    data = request.get_json()
    students = data.get('students')

    if not students:
        return jsonify({"error": "Students list is required"}), 400

    result = mongo.db.transfer.update_one(
        {"_id": ObjectId(transfer_id)},
        {"$set": {"students": students}}
    )

    if result.matched_count > 0:
        return jsonify({"message": "Transfer updated successfully"}), 200
    else:
        return jsonify({"error": "Transfer not found"}), 404

# Delete a transfer
@transfer_bp.route('/transfers/<transfer_id>', methods=['DELETE'])
def delete_transfer(transfer_id):
    mongo = current_app.extensions["pymongo"]
    result = mongo.db.transfer.delete_one({"_id": ObjectId(transfer_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Transfer deleted successfully"}), 200
    else:
        return jsonify({"error": "Transfer not found"}), 404
