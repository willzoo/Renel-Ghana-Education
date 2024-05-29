from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Import the blueprint from their respective modules
from school import school_bp 
# from student import student_bp 
# from teacher import teacher_bp
# from my_class import class_bp

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

    @app.route('/')
    def index():
        try:
            # Check the connection
            mongo.cx.admin.command('ping')
            return "Pinged your deployment. You successfully connected to MongoDB!"
        except Exception as e:
            return "Error: {e}"

    # Register the school blueprint
    app.register_blueprint(school_bp, url_prefix='/schools')

    # # Register the student blueprint
    # app.register_blueprint(student_bp, url_prefix='/students')

    # # Register the teacher blueprint
    # app.register_blueprint(teacher_bp, url_prefix='/teachers')

    # # Register the class blueprint
    # app.register_blueprint(class_bp, url_prefix='/classes')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
