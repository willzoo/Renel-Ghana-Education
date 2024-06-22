import React, { useContext } from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import TeacherContext from '../../../TeacherContext';

function EditClassModal() {
  const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;
  const {classToEdit, setClassToEdit} = useContext(TeacherContext).classToEdit;
  const {classInfo, setClassInfo} = useContext(TeacherContext).classInfo;

  let editClassInfo = {
    className: { title: "Class Name",
                  placeholder: "Enter a class name (optional)",
                  id: "class-name-edit",
                  required: false},
  };

  let editClassDropdown = [
    ["Grade Level", "grade-level-edit"],
    ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
    ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
  ];

  let handleSubmit = (event) => {
    event.preventDefault();
    CloseModal('class-edit');

    let className = document.getElementById('class-name-edit').value;
    let gradeLevel = document.getElementById('grade-level-edit').value;

    let content = {
      "class_name": className ? className : gradeLevel,
      "grade_level": gradeLevel,
      "teacher_id": selectedClass.teacher_id,
      "school_id": selectedClass.school_id,
      "students": selectedClass.students,
    };

    //@#)(@*&#)PLACEHOLDER@#)(@

    let tempClasses = classInfo.classes;
    let classToEdit = tempClasses.find(cls => 
      cls.class_name === selectedClass.class_name && cls.grade_level === selectedClass.grade_level
    );
    
    if (classToEdit) {
      Object.assign(classToEdit, content);
    }

    tempClasses.sort((a, b) => {
      return a.class_name.localeCompare(b.class_name);
    });

    // solution created by AI
    setClassInfo((oldClassInfo) => ({
      ...oldClassInfo,
      classes: tempClasses,
    }));

    setSelectedClass(content);

    // FIXME - properly update class in database

    // fetch('http://127.0.0.1:8000/classes', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(content)
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Data received:', data);
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    //   });

  }

  return (
    <section>
      <form id="class-modal-form" onSubmit={handleSubmit}>
        <section className="input-list" id="class-edit-text-input">
          <TextInput info={editClassInfo.className} editValue={selectedClass ? selectedClass.class_name : null} />
          <br />
          <Dropdown info={editClassDropdown} editValue={selectedClass ? selectedClass.grade_level : null}/>
          <br /><br /><br /><br />
        </section>
        <Submit value="Save" />
      </form>
    </section>
  );
}

export default EditClassModal;
