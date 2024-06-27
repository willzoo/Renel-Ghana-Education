import React, { useContext, useEffect } from 'react'
import { CloseModal } from '../../../../utils/functions';
import { OpenModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import TextInput from '../components/TextInput/TextInput'
import AdminContext from '../../../../AdminContext';
import Delete from '../components/Buttons/Delete';
import RadioButton from '../components/Checkbox/RadioButton';

function EditTeacherModal(props) {
    const { selectedTeacher, setSelectedTeacher } = useContext(AdminContext).selectedTeacher;
    const { selectedSchool, setSelectedSchool } = useContext(AdminContext).selectedSchool;
    const { schoolInfo, setSchoolInfo } = useContext(AdminContext).schoolInfo;

    let editTeacherInfo = {
        teacherName: { title: "Teacher Name", placeholder: "Please enter teacher name", id: "teacher-name-edit" },
        teacherEmail: { title: "Teacher Email", placeholder: "Please enter teacher email", id: "teacher-email-edit" },
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let teacherName = document.getElementById('teacher-name-edit').value;
        let teacherEmail = document.getElementById('teacher-email-edit').value;

        let content = {
            'name': teacherName,
            'email': teacherEmail
        };

        CloseModal("edit-teacher");

        let tempTeachers = selectedSchool.teachers;
        let teacherToEdit = tempTeachers.find(tchr =>
            tchr._id === selectedTeacher._id
        );

          if (teacherToEdit) {
            Object.assign(teacherToEdit, content);
          }

          tempTeachers.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });

          // solution created by AI
          setSelectedSchool((oldSelectedSchool) => {
            oldSelectedSchool.teachers = tempTeachers;
            return oldSelectedSchool;
          });

          let teacherListElements = Array.from(document.getElementsByClassName('teacher-list-item'));
          teacherListElements.find(tchr => tchr.dataset.teacherId === selectedTeacher._id).scrollIntoView();

        fetch(`http://127.0.0.1:8000/teachers/${selectedTeacher._id}`, {
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
            console.log('Teacher information updated:', data);
            const teacherIndex = selectedSchool.teachers.findIndex(teacher => teacher._id === selectedTeacher._id);
            if (teacherIndex > -1) {
                selectedSchool.teachers[teacherIndex] = content;
                selectedSchool.teachers[teacherIndex]['_id'] = selectedTeacher._id;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this teacher? Their classes and students will be deleted as well, and their information cannot be recovered.")) {
            CloseModal("edit-teacher");

            let tempTeachers = selectedSchool.teachers.filter(tchr => tchr._id !== selectedTeacher._id);

            // solution created by AI
            setSelectedSchool((oldSelectedSchool) => {
                oldSelectedSchool.teachers = tempTeachers;
                return oldSelectedSchool;
              });

            fetch(`http://127.0.0.1:8000/teachers/${selectedTeacher._id}`, {
              method: "DELETE",
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

              try {document.getElementById('teachers-list').scrollTop = 0;} catch (e) {};
        }
    }

    useEffect(() => {
        if (!selectedTeacher) return;

        const teacherListElements = Array.from(document.getElementsByClassName('teacher-list-item'));
        if (!teacherListElements) return;

        teacherListElements.forEach((element) => {
        element.classList.remove('selected');
        });

        const selectedElement = teacherListElements.find((element) =>
        element.dataset.teacherId === selectedTeacher._id
        );

        if (!selectedElement) return;
        selectedElement.classList.add('selected');
    }, [schoolInfo])

    // console.log("Edit student input called: " + props.student.name);
    return (
        <section>
            <form id="edit-teacher-form" onSubmit={handleSubmit}>
                <section className="input-list" id="edit-teacher-text-input">
                    <br />
                    <TextInput info={editTeacherInfo.teacherName} />
                    <TextInput info={editTeacherInfo.teacherEmail} />
                    <br />
                </section>
                <br /><br /><br /><br />
                <div className='modal-buttons-section'>
                    <Delete value="Delete" onClick={handleDelete} />
                    <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
                    <Submit value="Save" />
                </div>
            </form>
        </section>
    );
}

export default EditTeacherModal;