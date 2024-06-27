import React, { useContext } from "react";
import './Students.css'
import StudentItem from "./StudentItem/StudentItem";

import TeacherContext from "../../../TeacherContext";

function Students() {
    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const {selectedStudent, setSelectedStudent} = useContext(TeacherContext).selectedStudent;

    const deselectAll = () => {
        setSelectedStudent(null);
    }

    let studentsList = [];
    if (selectedClass) {
        for (let i = 0; i < selectedClass.students.length; i++) {
            studentsList.push((<StudentItem id={i} data={selectedClass.students[i]} />));
        }
    }

    return (
        <div className="student-section">
            <div className="students-list-container" onClick={deselectAll}>
                <h1 className="title">{selectedClass ? selectedClass.class_name : "Class"}</h1>
                <p className="body">Students</p>

                <div id="students-root" className="students-list">
                    <ul className="nobullet">
                        {// if selectedClass is null, display error
                            !selectedClass ? (<li key="error"><div className="list-issue">Please select a class to see associated students.</div></li>) :
                                studentsList.length == 0 ? // if there are no students in the student list
                                    (<li key="error"><div className="list-issue">There are no students that have been added to this class.</div></li>) :
                                    (studentsList) // display class list if students
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Students;