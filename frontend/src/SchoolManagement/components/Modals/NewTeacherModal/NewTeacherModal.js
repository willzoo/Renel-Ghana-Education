import React, { useCallback, useContext } from 'react'
import { CloseModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import TextInput from '../components/TextInput/TextInput'

import AdminContext from '../../../../AdminContext';

let newTeacherInfo = {
    teacherName: { title: "Teacher Name", placeholder: "Please enter teacher name", id: "teacher-name" },
    teacherEmail: { title: "Teacher Email", placeholder: "Please enter teacher email", id: "teacher-email" }
}

function NewTeacherModal() {
    const {schoolInfo, setSchoolInfo} = useContext(AdminContext).schoolInfo;
    const {selectedSchool, setSelectedSchool} = useContext(AdminContext).selectedSchool;

    let handleNewTeacherSubmit = (event) => {
        event.preventDefault();

        let teacherName = document.getElementById('teacher-name').value;
        let teacherEmail = document.getElementById('teacher-email').value;

        let content = {
            'name': teacherName,
            'email': teacherEmail,
            'password': '',
            'school_id': selectedSchool._id,
            'classes': [],
        };
        
        CloseModal("new-teacher");

        let tempTeachers = selectedSchool.teachers;
        tempTeachers.push(content);

        tempTeachers.sort((a, b) => {
        return a.name.localeCompare(b.name);
        });

        // solution created by AI
        setSelectedSchool((oldTeacherInfo) => ({
        ...oldTeacherInfo,
        teachers: tempTeachers,
        }));

        fetch('http://127.0.0.1:8000/teachers', {
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

                tempTeachers = selectedSchool.teachers;
                tempTeachers.find(tchr => tchr.email === teacherEmail && tchr.name === teacherName)._id = data._id; //TODO: Make sure data uses _id
                
                setSelectedSchool((oldSelectedSchool) => ({
                  ...oldSelectedSchool,
                  teachers: tempTeachers,
                }));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    return (
        <section>
            <form id="new-teacher-form" onSubmit={handleNewTeacherSubmit}>
                <section className="input-list" id="new-teacher-text-input">
                    <TextInput info={newTeacherInfo.teacherName} />
                    <TextInput info={newTeacherInfo.teacherEmail} />
                </section>
                <br /><br /><br /><br />

                <div className='modal-buttons-section'>
                    <Submit value="Add" />
                </div>
            </form>
        </section>
    );
}

export default NewTeacherModal;