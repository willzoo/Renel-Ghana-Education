import React from "react";
import './Students.css'
import StudentsList from "./StudentsList/StudentsList";

import { selectedClass } from "../../../utils/global";

function Students() {
    return (
        <div className="student-section">
            <div className="students-list-container">
                <h1 className="title">{selectedClass.class_name}</h1>
                <p className="body">Students</p>
                <div id="students-root" className="students-list">
                    <StudentsList info={selectedClass}/>
                </div>
            </div>
        </div>
    )
}

export default Students;