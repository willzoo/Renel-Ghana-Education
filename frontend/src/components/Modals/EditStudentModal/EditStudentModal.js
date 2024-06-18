import React from 'react'
import { CloseModal } from '../../../utils/functions';
import { OpenModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import Checkbox from '../components/Checkbox/Checkbox'

import {classInfo, selectedClass} from "../../../utils/global"

let editStudentInfo = {
    studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name-edit" },
    studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id-edit" },
    studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob-edit" },
    guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name-edit" },
    guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact-edit" },
    studentMedical: { title: "Student Medical Information", placeholder: "Any known allergies? Other valuable information?", id: "student-medical-edit" },
    disabilityStatus: { title: "Disability Status", id: "disability-status-edit" },
    additionalInfo: { title: "Additional Information", placeholder: "Any additional information about the student?", id: "additional-info-edit" },
}

function EditStudentModal(props) {
    const handleSubmit = (event) => {
        event.preventDefault();

        // const studentData = {
        //     name: document.getElementById(editStudentInfo.studentName.id).value,
        //     student_school_id: document.getElementById(editStudentInfo.studentID.id).value,
        //     dob: document.getElementById(editStudentInfo.studentDOB.id).value,
        //     guardian_name: document.getElementById(editStudentInfo.guardianName.id).value,
        //     guardian_contact: document.getElementById(editStudentInfo.guardianContact.id).value,
        //     health_conditions: document.getElementById(editStudentInfo.studentMedical.id).value,
        //     disabled: document.getElementById(editStudentInfo.disabilityStatus.id).checked,
        //     misc_info: document.getElementById(editStudentInfo.additionalInfo.id).value
        // };

        // fetch(`http://127.0.0.1:8000/students/${props.student._id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(studentData)
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Student information updated:', data);
        //     const studentIndex = selectedClass.students.findIndex(student => student._id === props.student._id);
        //     if (studentIndex > -1) {
        //         selectedClass.students[studentIndex] = studentData;
        //         selectedClass.students[studentIndex]['_id'] = props.student._id;
        //         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
        //     }
        // })
        // .catch(error => {
        //     console.error('There was a problem with the fetch operation:', error);
        // });
        CloseModal("edit-student");

        // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
    };

    // console.log("Edit student input called: " + props.student.name);
    return (
        <section>
            <form id="edit-student-form" onSubmit={handleSubmit}>
                <section className="input-list" id="edit-student-text-input">
                    <br/>
                    <TextInput info={editStudentInfo.studentName} />
                    <TextInput info={editStudentInfo.studentDOB} />
                    <TextInput info={editStudentInfo.studentID} />
                    <TextInput info={editStudentInfo.guardianName} />
                    <TextInput info={editStudentInfo.guardianContact} />
                    <TextInput info={editStudentInfo.studentMedical} />
                    <br />
                    <Checkbox info={editStudentInfo.disabilityStatus} />
                    <TextInput info={editStudentInfo.additionalInfo} />
                    <br/>
                </section>
                <br /><br /><br /><br />
                <Submit value="Save" />
            </form>
        </section>
    );
}

export default EditStudentModal;