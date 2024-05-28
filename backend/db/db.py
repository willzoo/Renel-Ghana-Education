from pymongo import MongoClient
from dotenv import load_dotenv
import os

#Load environment variables from .env file
load_dotenv()

#MongoDB connection
uri = os.getenv("ATLAS_URI")
client = MongoClient(uri)

try:
    # Connect the client to the server
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error: {e}")

db = client["EduTracker"]

