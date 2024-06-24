import React, { useContext } from "react";
//import './Students.css'
import TeacherItem from "./TeacherItem/TeacherItem";

import AdminContext from "../../../../AdminContext";

function Teachers() {
    const { schoolInfo, setSchoolInfo } = useContext(AdminContext).schoolInfo;
    const { selectedSchool, setSelectedSchool } = useContext(AdminContext).selectedSchool;
    const { selectedTeacher, setSelectedTeacher } = useContext(AdminContext).selectedTeacher;

    const deselectAll = () => {
        if (!selectedTeacher) return;
    
        const teacherListElements = Array.from(document.getElementsByClassName('teacher-list-item'));
        if (!teacherListElements) return;
    
        teacherListElements.forEach((element) => {
          element.classList.remove('selected');
        });
        
        setSelectedTeacher(null);
    }

    let teachersList = [];
    if (selectedSchool) {
        for (let i = 0; i < selectedSchool.teachers.length; i++) {
            teachersList.push((<TeacherItem id={i} data={selectedSchool.teachers[i]} />));
        }
    }

    return (
        <div className="teacher-section">
            <div className="teachers-list-container" onClick={deselectAll}>
                <h1 className="title">{selectedSchool ? selectedSchool.name : "Select School"}</h1>
                <p className="body">Teachers</p>

                <div id="teachers-root" className="teachers-list">
                    <ul className="nobullet">
                        {// if selectedSchool is null, display error
                            !selectedSchool ? (<li><div className="list-issue">Please select a school to see associated teachers.</div></li>) :
                                teachersList.length == 0 ? // if there are no teachers in the teacher list
                                    (<li><div className="list-issue">There are no teachers that have been added to this class.</div></li>) :
                                    (teachersList) // display class list if students
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Teachers;