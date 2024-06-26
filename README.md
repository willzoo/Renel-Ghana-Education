# EduTracker

A dashboard attendance tracking system for Teachers and the Renel Ghana Foundation.

## Overview

EduTracker is an attendance tracking system developed for the Renel Ghana Foundation (RGF) to manage and track student attendance, status changes (e.g., dropout, transfer, graduation), and historical data. This system helps Teachers and Renel Ghana Foundation Administrators with identifying and addressing specific barriers to education for primary grade students in Ghana.

## Features

- **Teacher Dashboard:** Manage classes, students, and attendance.
- **Admin Dashboard:** Manage school data and compare yearly statistics.
  - **School Management:** Add/edit teacher information, view student and teacher data by grade level.
  - **Reintegration Tracker:** Track enrollment status by school and grade level with color-coded indicators.

## Project-Wide Documentation Table of Contents

backend/
├── db/
│   ├── DATABASE_SCHEMAS.md - Contains all the format for database schemas to be followed for Schools, Teachers, Students, and Classes.
│   ├── RequiredFunctionality.txt - Planning document, outlining required routes for each user action.
│   └── requirements.txt - List of requirements to install
├── requirements.txt - List of requirements to install
└── README.md - Read me file for backend, contains summary of backend and important info like how to run backend server
frontend/
└── README.md - Read me file for frontend, contains summary of frontend and important info like how to run frontend server
figma/ - Archived folder from before we ported our HTML components to react
frontend_old/ - Another archived folder from before we ported our HTML components to react

## Getting Started

### Prerequisites

- Python 3.x
- MongoDB
- Node.js and npm
- Flask
- Flask-PyMongo

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/willzoo/Renel-Ghana-Education.git
    cd Renel-Ghana-Education
    ```

2. Install backend dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Configure MongoDB: Ensure it is running on the local machine or remote server.

### Running the Application

1. Start the Flask server:
    ```bash
    python backend/server.py
    ```

2. Start the React development server:
    ```bash
    cd frontend
    npm start
    ```

3. Open your web browser and navigate to `http://localhost:3000`

## Future Work

- Complete graduation checklist, transfer student menu, admin dashboard capabilities, and reintegration tracker.
- Host the React frontend on WordPress or AWS.
- Host the backend server on AWS.
---

## Project Team

**Renel Ghana 1: Education**

**CIS4930 Special Topics in CISE: Software Engineering and UX Design**  
**Ghana Study Abroad Summer A 2024**

- **Scrum Master:** William Zhu
- **Product Manager:** Rebecca Weinstein
- **Backend Developer:** Luis Ferrer
- **Frontend Developer:** Patrick Kallenbach

## Acknowledgements

**Professor Sanethia Thomas, PhD**  
Sanethia Thomas, PhD University of Florida, Computer & Information Science & Engineering

**Teaching Assistant Mouray Hutchinson**  
Mouray Hutchinson, Pursuing B.A in African American Studies & B.S Computer Science, University of Florida
