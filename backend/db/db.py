from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Initialize PyMongo
mongo = PyMongo()

# Load environment variables from .env file
load_dotenv()

# MongoDB connection setup for standalone checks or utilities
uri = os.getenv("ATLAS_URI")
client = mongo.cx

try:
    # Connect the client to the server
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error: {e}")

# Accessing the database for standalone checks or utilities
db = client["EduTracker"]