import React, { useContext } from "react";
import './Students.css'
import StudentsList from "./StudentsList/StudentsList";

import TeacherContext from "../../../TeacherContext";

function Students() {
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

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