import React, { useContext } from 'react';
import './ClassItem.css'

import {OpenModal} from '../../../utils/functions'
import TeacherContext from '../../../TeacherContext';

function ClassItem(props) {
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

    const handleEditClick = () => {
        OpenModal('class-edit');
    }
    
    const handleClassClick = () => {
        const sidebarClassElements = document.querySelectorAll('.sidebar-class');
        sidebarClassElements.forEach((element) => {
            element.classList.remove('selected');
        });

        const clickedElement = document.getElementById(props.id);
        clickedElement.classList.add('selected');

        setSelectedClass(props.data);
    };

    return (
        <li>
            <div className="sidebar-class" id={props.id} onClick={handleClassClick}>
                <div>
                    <p className="title">{props.data.class_name}</p>
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
