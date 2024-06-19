import React from 'react'
import { CloseModal } from '../../../utils/functions';
import { OpenModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'

import { classInfo, selectedClass } from '../../Sidebar/Sidebar';

let searchStudentInfo = {
    studentID: { title: "Student ID", placeholder: "Find Student", id: "search-student-id-request" },
}

function AddStudentModal() {
    const handleSubmit = (event) => {
        event.preventDefault();

        CloseModal("search-student");
        let id = document.getElementById("search-student-id-request").value;
        //Global variable to be used later with in add new student
        // RETURNING_STUDENT_ID = document.getElementById("returning-student-id-request").value;
        // console.log("returning student: " + RETURNING_STUDENT_ID);
        // if (selectedClass.students.find(student => student.student_school_id === id)) {
        //     OpenModal("edit-student", id);
        // }
        // else {
        //     OpenModal("new-student");
        // }

        if (id == "1234") {
            OpenModal("edit-student", id);
        }
        else {
            OpenModal("new-student");
        }

    }

    return (
        <section>
            <form id="search-student-form" onSubmit={handleSubmit}>
                <section className="input-list" id="search-student-text-input">
                    <TextInput info={searchStudentInfo.studentID}/>
                </section>
                <br /><br /><br /><br />
                <Submit value="Search" />
            </form>
        </section>
    );
}

export default AddStudentModal;