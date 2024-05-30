from flask import Flask, current_app
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Import the blueprint from their respective modules
from db.school import school_bp 
from db.student import student_bp 
from db.teacher import teacher_bp
from db.my_class import class_bp
from db.admin import admin_bp
from db.transfer import transfer_bp


# Initialize PyMongo
mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    
    # Load environment variables from .env file
    load_dotenv('config.env')

    # Set up MongoDB configuration
    app.config["MONGO_URI"] = os.getenv("ATLAS_URI")

    # Initialize PyMongo with the app
    mongo.init_app(app)
    with app.app_context():
        current_app.extensions['pymongo'] = mongo

    @app.route('/')
    def index():
        try:
            # Check the connection
            mongo.cx.admin.command('ping')
            return "Pinged your deployment. You successfully connected to MongoDB!"
        except Exception as e:
            return f"Mongo Connection Error: {e}"

    # Register the blueprints
    app.register_blueprint(school_bp, url_prefix='/schools')
    app.register_blueprint(student_bp, url_prefix='/students')
    app.register_blueprint(teacher_bp, url_prefix='/teachers')
    app.register_blueprint(class_bp, url_prefix='/classes')
    app.register_blueprint(admin_bp, url_prefix='/admins')
    app.register_blueprint(transfer_bp, url_prefix='/transfers')
    


    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=8000, debug=True)
