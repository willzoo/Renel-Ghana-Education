import React, { useState } from 'react'
import { CloseModal } from '../../../utils/functions';
import { OpenModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'

import { classInfo, selectedClass } from '../../Sidebar/Sidebar';

let returningStudentInfo = {
    studentID: { title: "Student ID", placeholder: "Find Student", id: "returning-student-id-request" },
}

function ReturningStudentModal() {

    const handleSubmit = (event) => {
        event.preventDefault();
        //Global variable to be used later with in add new student
        // RETURNING_STUDENT_ID = document.getElementById("returning-student-id-request").value;
        // console.log("returning student: " + RETURNING_STUDENT_ID);
        // if (selectedClass.students.find(student => student.student_school_id === id)) {
        //     OpenModal("edit-student", id);
        // }
        // else {
        //     OpenModal("new-student");
        // }

        let id = document.getElementById("returning-student-id-request").value;

        if (id == "1234") {
            CloseModal("returning-student");

            OpenModal("edit-student", id);
        }
        else {
            alert('The requested ID is not in our system. Please confirm the ID is correct or use the Add New Student tool.');
        }

    }

    return (
        <section>
            <form id="returning-student-form" onSubmit={handleSubmit}>
                <section className="input-list" id="returning-student-text-input">
                    <TextInput info={returningStudentInfo.studentID} />
                </section>
                <br /><br /><br /><br />
                
                <div className='modal-buttons-section'>
                    <Submit value="Search" />
                </div>
            </form>
        </section>
    );
}

export default ReturningStudentModal;