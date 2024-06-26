import React, { useContext, useEffect, useState } from 'react';
import './ClassItem.css'

import { OpenModal } from '../../../../utils/functions'
import TeacherContext from '../../../../TeacherContext';

function ClassItem({data}) { // individual class item element

    let [isEditButtonPressed, setEditButtonPressed] = useState(0); // update variable whenever edit button is pressed, used to update modal

    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const { classToEdit, setClassToEdit, } = useContext(TeacherContext).classToEdit;
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;
    const { updateSelection, setUpdateSelection } = useContext(TeacherContext).updateSelection;
    const { isModalWaiting, setModalWaiting } = useContext(TeacherContext).modalWaiting;

    const handleEdit = (event) => { // run when edit button is clicked

        setEditButtonPressed(1 - isEditButtonPressed); // flip between 1 and 0, just used to detect changes
        handleSelect(event); // select this class

        OpenModal('class-edit');
    }

    useEffect(() => { // update the edit form's input parameters every time edit button is pressed
        if (selectedClass && selectedClass.id === data.id) {
            // if class name is the same as grade level, open as blank
            document.getElementById('class-name-edit').value = selectedClass.class_name != selectedClass.grade_level ? selectedClass.class_name : "";
            document.getElementById('grade-level-edit').value = selectedClass.grade_level;
        }
    }, [isEditButtonPressed]); // runs whenever isEditButtonPressed is updated

    const handleSelect = (event) => { // run when class is selected
        event.stopPropagation(); // stop container from being selected

        setSelectedClass(data); // set selected class to this class
        setSelectedStudent(null); // select no students
    };

    useEffect(() => { // select correct class after editing, run whenever classInfo is updated
        const selectedElement = document.getElementById(data._id);

        if (data._id === selectedClass?._id) {
            selectedElement.classList.add('selected');
        }
        else {
            selectedElement.classList.remove('selected');
        }

        selectedElement.scrollIntoView();
    }, [selectedClass, selectedClass?.class_name]) // dependencies, update whenever selectedClass changes, or when its name changes

    return (
        <li key={data._id}>
            <div className="sidebar-class" id={data._id}
                data-class-id={data._id}
                data-class-name={data.name}
                onClick={handleSelect}> {/* create class item and run handleSelect when selected */}
                <div>
                    <p className="title">{data.class_name}</p> {/* add class name */}
                    {/* if class name was set as grade level, do not show grade level */}
                    <p className="body">{data.class_name !== data.grade_level ? data.grade_level : " "}</p>
                    <p className="body">Total Enrolled Students: {data.students.length}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p> {/* add edit button */}
                </div>
            </div>
        </li>
    );
}

export default ClassItem;
