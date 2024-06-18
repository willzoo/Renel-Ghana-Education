from flask import Flask, current_app
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import time
import logging
import os

load_dotenv('../config.env')
mongo_uri = os.getenv('ATLAS_URI')
client = MongoClient(mongo_uri)
db = client.get_database("EduTracker")

# Setup logging to a file
logging.basicConfig(filename='grade_level_migration.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def move_grade_levels_for_all_schools(current_year, new_year):
    school_collection = db.schools

    # Iterate over all schools
    for school in school_collection.find():
        school_id = school["_id"]

        # Skip the school if it has already been updated to the new year
        if school.get("year") == new_year:
            logging.info(f"Skipping already updated school ID {school_id}")
            continue

        try:
            # Move current grade levels to past years
            past_years = school.get("past_years", {})
            if current_year not in past_years:
                past_years[current_year] = []
            past_years[current_year].extend(school.get("grade_levels", []))

            # Update the school's past years and create a new grade level list
            school_collection.update_one(
                {"_id": school_id},
                {
                    "$set": {
                        "past_years": past_years,
                        "grade_levels": [],
                        "year": new_year
                    }
                }
            )

            logging.info(f"Moved grade levels for year {current_year} to past years and created new grade levels list for {new_year} for school ID {school_id}")

        except Exception as e:
            logging.error(f"Error processing school ID {school_id}: {e}")
            continue

        break

    logging.info("Completed moving grade levels for all schools.")


def calculate_school_years():
    today = datetime.today()
    current_year_start = today.year - 1 if today.month < 8 else today.year
    current_year = f"{current_year_start}-{current_year_start + 1}"
    new_year = f"{current_year_start + 1}-{current_year_start + 2}"
    return current_year, new_year

def schedule_yearly_task():
    school_id = "your_school_id"  # Replace with the actual school ID
    current_year, new_year = calculate_school_years()

    move_grade_levels_for_all_schools(current_year, new_year)

if __name__ == "__main__":
    # print(current_app['MONGO_URI'])
    # scheduler = BackgroundScheduler()
    # # Schedule the task to run every year on August 7th at 00:00
    # scheduler.add_job(schedule_yearly_task, 'cron', month=8, day=7, hour=0, minute=0)

    # scheduler.start()
    print("Scheduler started. The move_grade_levels function will run every year on August 7th.")
    move_grade_levels_for_all_schools("2023-2024", "2024-2025")


    # Run the Flask app (if needed)
    # app.run(debug=True)

    try:
        # Keep the script running
        while True:
            time.sleep(2)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
