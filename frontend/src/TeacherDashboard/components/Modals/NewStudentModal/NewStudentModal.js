import React, { useCallback, useContext } from 'react'
import { CloseModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import Date from '../components/TextInput/Date'
import Checkbox from '../components/Checkbox/Checkbox'

import TeacherContext from '../../../../TeacherContext';
import RadioButton from '../components/Checkbox/RadioButton';

function NewStudentModal() { // add new student to database
    const {classInfo, setClassInfo} = useContext(TeacherContext).classInfo;
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;
    const {selectedStudent, setSelectedStudent} = useContext(TeacherContext).selectedStudent;

    let newStudentInfo = { // initialize text input questions
        studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name" },
        studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id" },
        studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob" },
        guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name" },
        guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact" },
        studentMedical: { title: "Student Medical Information (optional)", placeholder: "What disability? If none, any other medical info?", id: "student-medical", required: false  },
        disabilityStatus: { title: "Does the student have a disability?", id: "disability-status"},
        additionalInfo: { title: "Additional Information (optional)", placeholder: "Any additional information about the student?", id: "additional-info", required: false },
    }

    let handleNewStudentSubmit = (event) => { // on submit
        event.preventDefault(); // dont refresh page

        // get all values from modal
        let studentName = document.getElementById('student-name').value;
        let studentID = document.getElementById('student-id').value;
        let studentDOB = document.getElementById('student-dob').value;
        let guardianName = document.getElementById('guardian-name').value;
        let guardianContact = document.getElementById('guardian-contact').value;
        let studentMedical = document.getElementById('student-medical').value;
        let disabilityStatus = document.getElementById('disability-status-true').checked;
        let additionalInfo = document.getElementById('additional-info').value;

        if (selectedClass.students.some(std =>
            std.student_school_id === studentID // if student with school id already exists, display error
        )) {
            alert("You already have a student with this ID. Please choose a unique ID.");
            return;
        }
        
        CloseModal("new-student");

        let content = { // intialize submitted content
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
            'school_id': classInfo.school_id,
            'history': [],
        };

        let tempStudents = selectedClass.students; // get students
        tempStudents.push(content); // add new student

        tempStudents.sort((a, b) => {
        return a.name.localeCompare(b.name); // sort students
        });

        setSelectedClass((oldSelectedClass) => ({
            ...oldSelectedClass,
            students: tempStudents,
        }))

        let tempClasses = classInfo.classes;
        Object.assign(tempClasses.find(cls => cls._id === selectedClass._id), selectedClass);
        
        setClassInfo((oldClassInfo) => { // update selectedClass
            oldClassInfo.classes = tempClasses;
            return oldClassInfo
        });

        fetch('http://127.0.0.1:8000/students', { // run fetch call to add new student
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content) // send student info to fetch call
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);

                // on successful fetch call, find student with corresponding info in tempStudents and add returned database id

                tempStudents = selectedClass.students;
                tempStudents.find(std => std.name === studentName && std.dob === studentDOB && std.guardian_contact === guardianContact)._id = data.student_id;
                
                setSelectedClass((oldSelectedClass) => { // update selectedClass
                    oldSelectedClass.students = tempStudents;
                    return oldSelectedClass
                });

                let tempClasses = classInfo.classes;
                Object.assign(tempClasses.find(cls => cls._id === selectedClass._id), selectedClass);

                setClassInfo((oldClassInfo) => { // update selectedClass
                    oldClassInfo.classes = tempClasses;
                    return oldClassInfo
                });
        
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    return (
        <section>
            <form id="new-student-form" onSubmit={handleNewStudentSubmit}> {/* run handleNewStudentSubmit on run */}
                <section className="input-list" id="new-student-text-input">
                    {/* add student information inputs */}
                    <TextInput info={newStudentInfo.studentName} />
                    <TextInput info={newStudentInfo.studentID} />
                    <Date info={newStudentInfo.studentDOB} />
                    <TextInput info={newStudentInfo.guardianName} />
                    <TextInput info={newStudentInfo.guardianContact} />
                    <RadioButton info={newStudentInfo.disabilityStatus} />
                    <TextInput info={newStudentInfo.studentMedical} />
                    <TextInput info={newStudentInfo.additionalInfo} />
                </section>
                <br /><br /><br /><br />

                <div className='modal-buttons-section'>
                    <Submit value="Add" /> {/* add submit button */}
                </div>
            </form>
        </section>
    );
}

export default NewStudentModal;