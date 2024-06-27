import React, { useContext, useEffect, useState } from 'react';
import './SchoolItem.css'

import { OpenModal } from '../../../../utils/functions'
import AdminContext from '../../../../AdminContext';

function SchoolItem(props) {

    let [isEditButtonPressed, setEditButtonPressed] = useState(0);

    const { selectedSchool, setSelectedSchool } = useContext(AdminContext).selectedSchool;
    const { schoolToEdit, setSchoolToEdit, } = useContext(AdminContext).schoolToEdit;
    const { selectedTeacher, setSelectedTeacher } = useContext(AdminContext).selectedTeacher;

    const handleEdit = (event) => {

        setEditButtonPressed(1 - isEditButtonPressed); // flip between 1 and 0, just used to detect changes
        handleSelect(event);

        OpenModal('school-edit');
    }

    useEffect(() => { // update the edit form's input parameters every time edit button is pressed
        if (selectedSchool && selectedSchool.id === props.data.id) {
            document.getElementById('school-name-edit').value = selectedSchool.name;
        }
    }, [isEditButtonPressed]);

    const handleSelect = (event) => {
        event.stopPropagation();

        const sidebarSchoolElements = Array.from(document.getElementsByClassName('sidebar-school'));
        sidebarSchoolElements.forEach((element) => {
            element.classList.remove('selected');
        });

        const clickedElement = sidebarSchoolElements[props.id];
        clickedElement.classList.add('selected');

        setSelectedSchool(props.data);
        setSelectedTeacher(null);
    };

    return (
        <li key={props.data._id}>
            <div className="sidebar-school" id={props.id}
                data-school-id={props.data._id}
                data-school-name={props.data.name}
                onClick={handleSelect}>
                <div>
                    <p className="title">{props.data.name}</p>
                    <p className="body">Total Teachers: {props.data.teachers.length}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default SchoolItem;
