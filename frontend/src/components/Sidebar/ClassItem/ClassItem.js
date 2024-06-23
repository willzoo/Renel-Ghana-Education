import React, { useContext, useEffect, useState } from 'react';
import './ClassItem.css'

import { OpenModal } from '../../../utils/functions'
import TeacherContext from '../../../TeacherContext';

function ClassItem(props) {

    let [isEditButtonPressed, setEditButtonPressed] = useState(0);

    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const {classToEdit, setClassToEdit,} = useContext(TeacherContext).classToEdit;    
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;

    const handleEditClick = (e) => {
        e.stopPropagation();

        setEditButtonPressed(1 - isEditButtonPressed);
        handleSelect();

        OpenModal('class-edit');
    }

    useEffect(() => { // update the edit form's input parameters every time selectedClass is changed
        if (selectedClass && selectedClass.id === props.data.id) {
            document.getElementById('class-name-edit').value = selectedClass.class_name != selectedClass.grade_level ? selectedClass.class_name : "";
            document.getElementById('grade-level-edit').value = selectedClass.grade_level;
        }
    }, [selectedClass, isEditButtonPressed]);

    const handleSelect = () => {

        const sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class'));
        sidebarClassElements.forEach((element) => {
            element.classList.remove('selected');
        });

        const clickedElement = sidebarClassElements[props.id];
        clickedElement.classList.add('selected');

        setSelectedClass(props.data);
        setSelectedStudent(null);
    };

    return (
        <li>
            <div className="sidebar-class" id={props.id} onClick={handleSelect}>
                <div>
                    <p className="title">{props.data.class_name !== "" ? props.data.class_name : props.data.grade_level}</p>
                    <p className="body">{props.data.grade_level}</p>
                    <p className="body">Total Enrolled Students: {props.data.students.length}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEditClick}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default ClassItem;
