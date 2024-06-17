from flask import Flask
from flask_pymongo import PyMongo
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import time

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/edutracker"
mongo = PyMongo(app)

def move_grade_levels(school_id, current_year, new_year):
    school_collection = mongo.db.schools

    # Find the school by ID
    school = school_collection.find_one({"_id": school_id})

    if not school:
        print("School not found")
        return

    # Move current grade levels to past years
    past_years = school.get("past_years", {})
    past_years[current_year] = school.get("grade_levels", [])

    # Update the school's past years and create a new grade level list
    school_collection.update_one(
        {"_id": school_id},
        {
            "$set": {
                "past_years": past_years,
                "grade_levels": []
            },
            "$push": {
                "years": new_year
            }
        }
    )

    print(f"Moved grade levels for year {current_year} to past years and created new grade levels list for {new_year}")

def calculate_school_years():
    today = datetime.today()
    current_year_start = today.year - 1 if today.month < 8 else today.year
    current_year = f"{current_year_start}-{current_year_start + 1}"
    new_year = f"{current_year_start + 1}-{current_year_start + 2}"
    return current_year, new_year

def schedule_yearly_task():
    school_id = "your_school_id"  # Replace with the actual school ID
    current_year, new_year = calculate_school_years()

    move_grade_levels(school_id, current_year, new_year)

if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    # Schedule the task to run every year on August 7th at 00:00
    scheduler.add_job(schedule_yearly_task, 'cron', month=8, day=7, hour=0, minute=0)

    scheduler.start()
    print("Scheduler started. The move_grade_levels function will run every year on August 7th.")

    # Run the Flask app (if needed)
    # app.run(debug=True)

    try:
        # Keep the script running
        while True:
            time.sleep(2)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
