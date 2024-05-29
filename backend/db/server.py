from flask import Flask
from db import mongo
import os
from dotenv import load_dotenv
# Import the blueprint from their respective modules
from school import school_bp 
from student import student_bp 

def create_app():
    app = Flask(__name__)
    load_dotenv('config.env')

    # Set up MongoDB configuration
    app.config["MONGO_URI"] = os.getenv("ATLAS_URI")

    # Initialize PyMongo
    mongo.init_app(app)

    @app.route('/')
    def index():
        try:
            # Check the connection
            mongo.cx.admin.command('ping')
            return "Pinged your deployment. You successfully connected to MongoDB!"
        except Exception as e:
            return f"Error: {e}"

    # Register the school blueprint
    app.register_blueprint(school_bp, url_prefix='/schools')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
