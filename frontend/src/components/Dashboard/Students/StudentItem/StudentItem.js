import React, { useContext } from "react";
import './StudentItem.css'


import { OpenModal } from "../../../../utils/functions";
import TeacherContext from "../../../../TeacherContext";

function StudentItem(props) {
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;

    const handleEdit = (event) => {
        console.log("Student item function called")

        setSelectedStudent(props.data);

        OpenModal("edit-student");
    }

    const handleSelect = (event) => {
        const studentListElements = Array.from(document.getElementsByClassName('student-list-item'));
        studentListElements.forEach((element) => {
            element.classList.remove('selected');
        });

        const clickedElement = studentListElements[props.id];
        clickedElement.classList.add('selected');

        setSelectedStudent(props.data);
    }

    return (
        <li>
            <div className="student-list-item" onClick={handleSelect}>
                <div>
                    <p className="title">{props.data.name}</p>
                    <p className="body">Student ID: {props.data.student_school_id}</p>
                    <p className="body">Disability: {props.data.disabled ? ('No') : ('Yes')}</p>
                </div>
                <div>
                    <p className="title">Parent Contact Information</p>
                    <p className="body">{props.data.guardian_name}</p>
                    <p className="body">{props.data.guardian_contact}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default StudentItem;