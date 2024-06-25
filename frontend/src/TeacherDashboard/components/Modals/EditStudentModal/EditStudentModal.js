import React, { useContext, useEffect } from 'react'
import { CloseModal } from '../../../../utils/functions';
import { OpenModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import Checkbox from '../components/Checkbox/Checkbox'
import TeacherContext from '../../../../TeacherContext';
import Delete from '../components/Buttons/Delete';
import RadioButton from '../components/Checkbox/RadioButton';

function EditStudentModal(props) { // modal for editing student content
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;
    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;

    let editStudentInfo = { // initialization for all student questions
        studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name-edit" },
        studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id-edit" },
        studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob-edit" },
        guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name-edit" },
        guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact-edit" },
        studentMedical: { title: "Student Medical Information (optional)", placeholder: "Any known allergies? Other valuable information?", id: "student-medical-edit", required: false, },
        disabilityStatus: { title: "Does the student have a disability?", id: "disability-status-edit" },
        additionalInfo: { title: "Additional Information (optional)", placeholder: "Any additional information about the student?", id: "additional-info-edit", required: false },
    }

    const handleSubmit = (event) => { // run on submit
        event.preventDefault(); // dont refresh page

        // get all values from modal
        let studentName = document.getElementById('student-name-edit').value;
        let studentID = document.getElementById('student-id-edit').value;
        let studentDOB = document.getElementById('student-dob-edit').value;
        let guardianName = document.getElementById('guardian-name-edit').value;
        let guardianContact = document.getElementById('guardian-contact-edit').value;
        let studentMedical = document.getElementById('student-medical-edit').value;
        let disabilityStatus = document.getElementById('disability-status-edit-true').checked;
        let additionalInfo = document.getElementById('additional-info-edit').value;

        if (selectedClass.students.some(std =>
            std.student_school_id === studentID && std._id !== selectedStudent._id // if student with same school id but different system id exists
        )) {
            alert("You already have a student with this ID. Please choose a unique ID."); // show error
            return;
        }

        CloseModal("edit-student");

        let content = { // initialize content
            'name': studentName,
            'guardian_name': guardianName,
            'guardian_contact': guardianContact,
            'dob': studentDOB,
            "student_school_id": studentID,
            'disabled': disabilityStatus,
            'health_conditions': studentMedical ? studentMedical : "None",
            'misc_info': additionalInfo ? additionalInfo : "None",
            'class_id': selectedClass._id,
            'grade_level': selectedClass.grade_level,
            'school_id': classInfo.school_id,
            'history': [],
        };

        let tempStudents = selectedClass.students;
        let studentToEdit = tempStudents.find(std =>
            std._id === selectedStudent._id // find corresponding student to edit
        );

        if (studentToEdit) {
            Object.assign(studentToEdit, content); // update values
        }

        tempStudents.sort((a, b) => {
            return a.name.localeCompare(b.name); // sort students array alphabetically
        });

        setSelectedClass((oldSelectedClass) => ({ // update selectedClass
            ...oldSelectedClass,
            students: tempStudents,
        }));

        let studentListElements = Array.from(document.getElementsByClassName('student-list-item')); // get all student list items
        studentListElements.find(std => std.dataset.studentId === selectedStudent._id).scrollIntoView(); // scroll edited student into view

        fetch(`http://127.0.0.1:8000/students/${selectedStudent._id}`, { // update fetch call
            method: 'PATCH',
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
                console.log('Student information updated:', data);
                const studentIndex = selectedClass.students.findIndex(student => student._id === selectedStudent._id);
                if (studentIndex > -1) {
                    selectedClass.students[studentIndex] = content;
                    selectedClass.students[studentIndex]['_id'] = selectedStudent._id;
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleDelete = () => { // run when delete button is clicked
        if (window.confirm("Are you sure you want to delete this student? Their information can be recovered from our system.")) { // confirmation window
            CloseModal("edit-student"); // clsoe modal if confirmed

            let tempStudents = selectedClass.students.filter(std => std._id !== selectedStudent._id); // get list of students without selected student

            setSelectedClass((oldSelectedClass) => ({ // remove student from selected class
                ...oldSelectedClass,
                students: tempStudents,
            }));

            fetch(`http://127.0.0.1:8000/classes/${selectedClass._id}/${selectedStudent._id}`, { // update class to remove student from class
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the data returned from the server
                    console.log(data); // For demonstration purposes; adjust as needed
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            try { document.getElementById('students-list').scrollTop = 0; } catch (e) { };

            setSelectedStudent(null);
        }
    }

    useEffect(() => { // select proper student, update whenever classInfo changes
        try {
            const studentListElements = Array.from(document.getElementsByClassName('student-list-item')); // get all student list itmes

            studentListElements.forEach((element) => {
                element.classList.remove('selected'); // remove selected class from all
            });

            const selectedElement = studentListElements.find((element) =>
                element.dataset.studentId === selectedClass._id // find student with proper id
            );

            selectedElement.classList.add('selected'); // select that student
    } catch (e) {};
    }, [classInfo]) // update whenever classInfo updates

    return (
        <section>
            <form id="edit-student-form" onSubmit={handleSubmit}> {/* run handleSubmit when form is submitted */}
                <section className="input-list" id="edit-student-text-input">
                    <br /> {/* add all text inputs, and radio button for disability status */}
                    <TextInput info={editStudentInfo.studentName} />
                    <TextInput info={editStudentInfo.studentID} />
                    <TextInput info={editStudentInfo.studentDOB} />
                    <TextInput info={editStudentInfo.guardianName} />
                    <TextInput info={editStudentInfo.guardianContact} />
                    <RadioButton info={editStudentInfo.disabilityStatus} />
                    <TextInput info={editStudentInfo.studentMedical} />
                    <TextInput info={editStudentInfo.additionalInfo} />
                    <br />
                </section>
                <br /><br /><br /><br />
                <div className='modal-buttons-section'>
                    <Delete value="Delete" onClick={handleDelete} /> {/* add delete button */}
                    <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
                    <Submit value="Save" /> {/* add submit button */}
                </div>
            </form>
        </section>
    );
}

export default EditStudentModal;