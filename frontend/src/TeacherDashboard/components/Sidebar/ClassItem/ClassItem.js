import React, { useContext, useEffect, useState } from 'react';
import './ClassItem.css'

import { OpenModal } from '../../../../utils/functions'
import TeacherContext from '../../../../TeacherContext';

function ClassItem(props) { // individual class item element

    let [isEditButtonPressed, setEditButtonPressed] = useState(0); // update variable whenever edit button is pressed, used to update modal

    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const { classToEdit, setClassToEdit, } = useContext(TeacherContext).classToEdit;
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;

    const handleEdit = (event) => { // run when edit button is clicked

        setEditButtonPressed(1 - isEditButtonPressed); // flip between 1 and 0, just used to detect changes
        handleSelect(event); // select this class

        OpenModal('class-edit');
    }

    useEffect(() => { // update the edit form's input parameters every time edit button is pressed
        if (selectedClass && selectedClass.id === props.data.id) {
            // if class name is the same as grade level, open as blank
            document.getElementById('class-name-edit').value = selectedClass.class_name != selectedClass.grade_level ? selectedClass.class_name : "";
            document.getElementById('grade-level-edit').value = selectedClass.grade_level;
        }
    }, [isEditButtonPressed]); // runs whenever isEditButtonPressed is updated

    const handleSelect = (event) => { // run when class is selected
        event.stopPropagation(); // stop container from being selected

        const sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class')); // get all sidebar classes
        sidebarClassElements.forEach((element) => {
            element.classList.remove('selected'); // remove selected class from all
        });

        const clickedElement = sidebarClassElements[props.id]; // get this class item
        clickedElement.classList.add('selected'); // select this class

        setSelectedClass(props.data); // set selected class to this class
        setSelectedStudent(null); // select no students
    };

    return (
        <li key={props.data._id}>
            <div className="sidebar-class" id={props.id}
                data-class-id={props.data._id}
                data-class-name={props.data.name}
                onClick={handleSelect}> {/* create class item and run handleSelect when selected */}
                <div>
                    <p className="title">{props.data.class_name}</p> {/* add class name */}
                    {/* if class name was set as grade level, do not show grade level */}
                    <p className="body">{props.data.class_name !== props.data.grade_level ? props.data.grade_level : " "}</p>
                    <p className="body">Total Enrolled Students: {props.data.students.length}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p> {/* add edit button */}
                </div>
            </div>
        </li>
    );
}

export default ClassItem;
