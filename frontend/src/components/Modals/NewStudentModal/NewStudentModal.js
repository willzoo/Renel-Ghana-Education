import React from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import Checkbox from '../components/Checkbox/Checkbox'

import { selectedClass } from '../../../utils/global';

let newStudentInfo = {
    studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name" },
    studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id" },
    studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob" },
    guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name" },
    guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact" },
    studentMedical: { title: "Student Medical Information", placeholder: "Any known allergies? Other valuable information?", id: "student-medical" },
    disabilityStatus: { title: "Disability Status", id: "disability-status" },
    additionalInfo: { title: "Additional Information", placeholder: "Any additional information about the student?", id: "additional-info" },
}

function NewStudentModal() {
    let handleNewStudentSubmit = (event) => {
        event.preventDefault();
        CloseModal("new-student");
        
        // console.log("returning student 2: " + RETURNING_STUDENT_ID);

        let studentName = document.getElementById('student-name').value;
        let studentID = "1234";//RETURNING_STUDENT_ID;
        let studentDOB = document.getElementById('student-dob').value;
        let guardianName = document.getElementById('guardian-name').value;
        let guardianContact = document.getElementById('guardian-contact').value;
        let studentMedical = document.getElementById('student-medical').value;
        let disabilityStatus = document.getElementById('disability-status').value;
        let additionalInfo = document.getElementById('additional-info').value;

        let content = {
            'name': studentName,
            'guardian_name': guardianName,
            'guardian_contact': guardianContact,
            'dob': studentDOB,
            "student_school_id": studentID,
            'disabled': disabilityStatus,
            'health_conditions': studentMedical,
            'misc_info': additionalInfo,
            'class_id': selectedClass._id,
            'grade_level': selectedClass.grade_level,
            'school_id': "nb9s",
            'history': [],
        };

        selectedClass.students.push(content);

        // fetch('http://127.0.0.1:8000/students', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(content)
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log('Data received:', data);
        //     })
        //     .catch(error => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     });

        // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
        // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));
        // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
    }

    return (
        <section>
            <form id="new-student-form" onSubmit={handleNewStudentSubmit}>
                <section className="input-list" id="new-student-text-input">
                    <TextInput info={newStudentInfo.studentName} />
                    <TextInput info={newStudentInfo.studentDOB} />
                    <TextInput info={newStudentInfo.guardianName} />
                    <TextInput info={newStudentInfo.guardianContact} />
                    <TextInput info={newStudentInfo.studentMedical} />
                    <br />
                    <Checkbox info={newStudentInfo.disabilityStatus} />
                    <TextInput info={newStudentInfo.additionalInfo} />
                </section>
                <br /><br /><br /><br />
                <Submit value="Add" />
            </form>
        </section>
    );
}

export default NewStudentModal;