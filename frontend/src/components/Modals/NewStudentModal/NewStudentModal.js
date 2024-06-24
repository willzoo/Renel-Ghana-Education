import React, { useCallback, useContext } from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import Date from '../components/TextInput/Date'
import Checkbox from '../components/Checkbox/Checkbox'

import TeacherContext from '../../../TeacherContext';
import Radio_Button from '../components/Checkbox/Radio_Button';

let newStudentInfo = {
    studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name" },
    studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id" },
    studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob" },
    guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name" },
    guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact" },
    studentMedical: { title: "Student Medical Information (optional)", placeholder: "What disability? If none, any other medical info?", id: "student-medical", required: false  },
    disabilityStatus: { title: "Disability Status", id: "disability-status" },
    additionalInfo: { title: "Additional Information (optional)", placeholder: "Any additional information about the student?", id: "additional-info", required: false },
}

function NewStudentModal() {
    const {classInfo, setClassInfo} = useContext(TeacherContext).classInfo;
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;
    const {selectedStudent, setSelectedStudent} = useContext(TeacherContext).selectedStudent;

    let handleNewStudentSubmit = (event) => {
        event.preventDefault();
        CloseModal("new-student");

        // console.log("returning student 2: " + RETURNING_STUDENT_ID);

        let studentName = document.getElementById('student-name').value;
        let studentID = document.getElementById('student-id').value;
        let studentDOB = document.getElementById('student-dob').value;
        let guardianName = document.getElementById('guardian-name').value;
        let guardianContact = document.getElementById('guardian-contact').value;
        let studentMedical = document.getElementById('student-medical').value;
        //let disabilityStatus = document.getElementById('disability-status').value;
        let additionalInfo = document.getElementById('additional-info').value;

        let content = {
            'name': studentName,
            'guardian_name': guardianName,
            'guardian_contact': guardianContact,
            'dob': studentDOB,
            "student_school_id": studentID,
            'disabled': false,
            'health_conditions': studentMedical,
            'misc_info': additionalInfo,
            'class_id': selectedClass._id,
            'grade_level': selectedClass.grade_level,
            'school_id': classInfo.school_id,
            'history': [],
        };

        let tempStudents = selectedClass.students;
        tempStudents.push(content);

        tempStudents.sort((a, b) => {
        return a.name.localeCompare(b.name);
        });

        // solution created by AI
        setSelectedClass((oldStudentInfo) => ({
        ...oldStudentInfo,
        students: tempStudents,
        }));

        fetch('http://127.0.0.1:8000/students', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    return (
        <section>
            <form id="new-student-form" onSubmit={handleNewStudentSubmit}>
                <section className="input-list" id="new-student-text-input">
                    <TextInput info={newStudentInfo.studentName} />
                    <TextInput info={newStudentInfo.studentID} />
                    <Date info={newStudentInfo.studentDOB} />
                    <TextInput info={newStudentInfo.guardianName} />
                    <TextInput info={newStudentInfo.guardianContact} />
                    <br />
                    <Radio_Button info={newStudentInfo.disabilityStatus} />
                    <TextInput info={newStudentInfo.studentMedical} />
                    <TextInput info={newStudentInfo.additionalInfo} />
                </section>
                <br /><br /><br /><br />

                <div className='modal-buttons-section'>
                    <Submit value="Add" />
                </div>
            </form>
        </section>
    );
}

export default NewStudentModal;