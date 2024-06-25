import React, { useContext, useEffect, useState } from "react";
import './TeacherItem.css'


import { OpenModal } from "../../../../../utils/functions";
import AdminContext from "../../../../../AdminContext";

function TeacherItem(props) {
    let [isEditButtonPressed, setEditButtonPressed] = useState(0);

    const { selectedSchool, setSelectedSchool } = useContext(AdminContext).selectedSchool;
    const { schoolToEdit, setSchoolToEdit, } = useContext(AdminContext).schoolToEdit;
    const { selectedTeacher, setSelectedTeacher } = useContext(AdminContext).selectedTeacher;

    const handleEdit = (event) => {
        setEditButtonPressed(1 - isEditButtonPressed); // flip between 1 and 0, just used to detect changes

        handleSelect(event);

        OpenModal("edit-teacher");
    }

    useEffect(() => { // update the edit form's input parameters every time edit button is pressed
        if (selectedTeacher && selectedTeacher.email === props.data.email) {
            document.getElementById('teacher-name-edit').value = selectedTeacher.name;
            document.getElementById('teacher-email-edit').value = selectedTeacher.email;
        }
    }, [isEditButtonPressed]);

    const handleSelect = (event) => {
        event.stopPropagation();

        const teacherListElements = Array.from(document.getElementsByClassName('teacher-list-item'));
        teacherListElements.forEach((element) => {
            element.classList.remove('selected');
        });

        const clickedElement = teacherListElements[props.id];
        clickedElement.classList.add('selected');

        setSelectedTeacher(props.data);
    }

    return (
        <li>
            <div className="teacher-list-item" id={props.id}
                data-teacher-id={props.data._id}
                data-name={props.data.name}
                onClick={handleSelect}>
                    <div style={{width: '200px', display: "inline-block"}}>
                        <p className="title">Teacher Name</p>
                        <p className="body"> {props.data.name}</p>
                    </div>
                    <div style={{width: "300px", display: "inline-block"}}>
                        <p className="title">Teacher Email</p>
                        <p className="body">{props.data.email}</p>
                    </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default TeacherItem;