import React, { useContext, useEffect, useState } from "react";
import './StudentItem.css'


import { OpenModal } from "../../../../../utils/functions";
import TeacherContext from "../../../../../TeacherContext";

function StudentItem({data}) { // individual item in student list, container for student info
    let [isEditButtonPressed, setEditButtonPressed] = useState(0); // tracker to update edit modal information

    const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
    const { classToEdit, setClassToEdit, } = useContext(TeacherContext).classToEdit;
    const { selectedStudent, setSelectedStudent } = useContext(TeacherContext).selectedStudent;

    const handleEdit = (event) => {
        setEditButtonPressed(1 - isEditButtonPressed); // flip between 1 and 0, just used to detect changes

        handleSelect(event); // select class

        OpenModal("edit-student"); // open the edit-student modal
    }

    useEffect(() => { // update the edit form's input parameters every time edit button is pressed
        if (selectedStudent && selectedStudent._id === data._id) {
            document.getElementById('student-name-edit').value = selectedStudent.name;
            document.getElementById('student-id-edit').value = selectedStudent.student_school_id;
            document.getElementById('student-dob-edit').value = selectedStudent.dob;
            document.getElementById('guardian-name-edit').value = selectedStudent.guardian_name;
            document.getElementById('guardian-contact-edit').value = selectedStudent.guardian_contact;
            document.getElementById('student-medical-edit').value = selectedStudent.health_conditions;
            document.getElementById('disability-status-edit-true').checked = selectedStudent.disabled;
            document.getElementById('additional-info-edit').value = selectedStudent.misc_info;
        }
    }, [isEditButtonPressed]); // dependencies, useEffect will tun when isEditButtonPressed changes

    const handleSelect = (event) => { // when class is selected or edited
        event.stopPropagation(); // prevent container from being clicked, allows for separate click functionality of container

        // add "selected" class to clicked student item
        // const studentListElements = Array.from(document.getElementsByClassName('student-list-item')); // get all student list itmes
        // studentListElements.forEach((element) => {
        //     element.classList.remove('selected'); // remove the selected class from all students
        // });

        // const clickedElement = studentListElements[id]; // get this student from the list of students
        // clickedElement.classList.add('selected'); // add selected class to student

        setSelectedStudent(data); // set global selectedStudent variable
    }
    
    useEffect(() => { // select correct class after editing, run whenever classInfo is updated
        const selectedElement = document.getElementById(data._id);

        if (data._id === selectedStudent?._id) {
            selectedElement.classList.add('selected');
            selectedElement.scrollIntoView({block: "center", behavior: "auto"});
        }
        else {
            selectedElement.classList.remove('selected');
        }

    }, [selectedStudent, selectedStudent?.name]) // dependencies, update whenever selectedStudent changes, or when its name changes

    return (
        <li key={data._id}>
            <div className="student-list-item" id={data._id}
                data-student-id={data._id}
                data-name={data.name}
                onClick={handleSelect}> {/* create student item container */}
                    <div style={{width: '200px', display: "inline-block"}}> {/* constant width so names of different lengths do not adjust positioning */}
                        <p className="title">{data.name}</p>
                        <p className="body">Student ID: {data.student_school_id}</p>
                        <p className="body">Disability: {data.disabled ? ('Yes') : ('No')}</p> {/* dispaly text based on disabled bool */}
                    </div>
                    <div style={{width: "300px", display: "inline-block"}}>
                        <p className="title">Parent Contact Information</p>
                        <p className="body">{data.guardian_name}</p>
                        <p className="body">{data.guardian_contact}</p>
                    </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p> {/* run handleEdit on click */}
                </div>
            </div>
        </li>
    );
}

export default StudentItem;