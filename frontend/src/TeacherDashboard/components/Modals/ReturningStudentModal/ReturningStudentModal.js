import React, { useState } from 'react'
import { CloseModal } from '../../../../utils/functions';
import { OpenModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'

import { classInfo, selectedClass } from '../../Sidebar/Sidebar';

let returningStudentInfo = {
    studentID: { title: "Student ID", placeholder: "Find Student", id: "returning-student-id-request" },
}

function ReturningStudentModal() { // TODO: add fetch call to get student information from database

    const handleSubmit = (event) => {
        event.preventDefault(); // do not refresh page

        let id = document.getElementById("returning-student-id-request").value; // get value from modal

        if (id == "1234") { // TODO: if id is in database (within success output of fetch call)
            CloseModal("returning-student"); // close returning student modal

            OpenModal("edit-student", id); // open edit student modal
        }
        else {
            // show error if id is not in system
            alert('The requested ID is not in our system. Please confirm the ID is correct or use the Add New Student tool.');
        }

    }

    return (
        <section>
            <form id="returning-student-form" onSubmit={handleSubmit}> {/* run handleSubmit when form is submitted */}
                <section className="input-list" id="returning-student-text-input">
                    <TextInput info={returningStudentInfo.studentID} /> {/* single text input menu */}
                </section>
                <br /><br /><br /><br />
                
                <div className='modal-buttons-section'>
                    <Submit value="Search" /> {/* add submit button */}
                </div>
            </form>
        </section>
    );
}

export default ReturningStudentModal;