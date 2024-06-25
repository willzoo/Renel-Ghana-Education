import React, { useContext, useEffect, useState } from 'react';
import './ClassItem.css'

import { OpenModal } from '../../../../utils/functions'
import TeacherContext from '../../../../TeacherContext';

function ClassItem(props) {

    let [isEditButtonPressed, setEditButtonPressed] = useState(0);

    const {classInfo, setClassInfo} = useContext(TeacherContext).classInfo;
    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const { classToEdit, setClassToEdit, } = useContext(TeacherContext).classToEdit;
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;

    const handleEdit = (event) => {

        setEditButtonPressed(1 - isEditButtonPressed); // flip between 1 and 0, just used to detect changes
        handleSelect(event);

        OpenModal('class-edit');
    }

    useEffect(() => { // update the edit form's input parameters every time edit button is pressed
        if (selectedClass && selectedClass.id === classInfo.classes[props.id].id) {
            document.getElementById('class-name-edit').value = selectedClass.class_name != selectedClass.grade_level ? selectedClass.class_name : "";
            document.getElementById('grade-level-edit').value = selectedClass.grade_level;
        }
    }, [isEditButtonPressed]);

    const handleSelect = (event) => {
        event.stopPropagation();

        const sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class'));
        sidebarClassElements.forEach((element) => {
            element.classList.remove('selected');
        });

        const clickedElement = sidebarClassElements[props.id];
        clickedElement.classList.add('selected');

        setSelectedClass(classInfo.classes[props.id]);
        setSelectedStudent(null);
    };

    return (
        <li>
            <div className="sidebar-class" id={props.id}
                data-class-id={classInfo.classes[props.id]._id}
                data-class-name={classInfo.classes[props.id].name}
                onClick={handleSelect}>
                <div>
                    <p className="title">{classInfo.classes[props.id].class_name}</p>
                    <p className="body">{classInfo.classes[props.id].class_name !== classInfo.classes[props.id].grade_level ? classInfo.classes[props.id].grade_level : " "}</p>
                    <p className="body">Total Enrolled Students: {classInfo.classes[props.id].students.length}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default ClassItem;
