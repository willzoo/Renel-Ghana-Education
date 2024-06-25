import React, { useContext } from "react";
import './Students.css'
import StudentItem from "./StudentItem/StudentItem";

import TeacherContext from "../../../../TeacherContext";

function Students() { // container for student items
    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const {selectedStudent, setSelectedStudent} = useContext(TeacherContext).selectedStudent;

    const deselectAll = () => { // if backdrop is selected  
        try {  
            const studentListElements = Array.from(document.getElementsByClassName('student-list-item')); // get all student list items
        
            studentListElements.forEach((element) => {
            element.classList.remove('selected'); // remove the selected class from each student item
            });
        } catch (e) {};
        
        setSelectedStudent(null); // set selectedStudent to none
    }

    let studentsList = []; // define blank list of students
    if (selectedClass) {
        for (let i = 0; i < selectedClass.students.length; i++) {
            studentsList.push((<StudentItem id={i} data={selectedClass.students[i]} />)); // add new studentItem to studentsList
        }
    }

    return (
        <div className="student-section"> {/* added for spacing */}
            <div className="students-list-container" onClick={deselectAll}> {/* deselect functionality, and visual container for elements */}
                <h1 className="title">{selectedClass ? selectedClass.class_name : "Class"}</h1> {/* update class name only when class is selected */}
                <p className="body">Students</p>

                <div id="students-root" className="students-list"> {/* create students list so it is scrollable */}
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