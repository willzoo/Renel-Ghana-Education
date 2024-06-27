import React, { useContext, useEffect, useState } from 'react'
import { CloseModal, OpenModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import TeacherContext from '../../../../TeacherContext';
import Loading from '../components/Loading/Loading';

function ClassAddModal() { // modal displayed for adding class to teacher dashbaord
  const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
  const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
  const { isModalWaiting, setModalWaiting } = useContext(TeacherContext).modalWaiting;
  
  let addClassInfo = { // text input definition, specifies text and id for each text input in modal
    className: { title: "Class Name (optional)", placeholder: "Enter a class name", id: "class-name", required: false },
  };

  let addClassDropdown = [ // define dropdown data
    ["Grade Level", "grade-level"],
    ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
    ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
  ];

  let handleSubmit = (event) => { // when submit button is pressed
    event.preventDefault(); // do not refresh page

    // get required values from each modal text input
    let className = document.getElementById('class-name').value;
    let gradeLevel = document.getElementById('grade-level').value;

    className = className ? className : gradeLevel; // assign className only if it is defined, otherwise set it to grade level

    if (classInfo.classes.find(cls =>
      cls.class_name === className // if class with this name exists, show error
    )) {
      alert("You already have a class with this name. Please choose a unique name.");
      return; // leave function, do not perform any lines of code below
    }

    setModalWaiting(true);

    let content = {
      "class_name": className,
      "grade_level": gradeLevel,
      "teacher_id": "665da0b90c1d6c0c45724285", // FIXME: add real teacher id
      "school_id": classInfo.school_id,
      "students": []
    };

    fetch('http://127.0.0.1:8000/classes', { // add class to database
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content) // load fetch command with content
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        content._id = data.class_id;
        classInfo.classes.push(content); // add new content

        classInfo.classes.sort((a, b) => { // sort list
          return a.class_name.localeCompare(b.class_name);
        });

        setSelectedClass(content); // set selected class to content

        CloseModal("class-add"); // on success, close modal

        setModalWaiting(false);

      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        CloseModal('class-add'); // close modal if confirmed
        OpenModal('error'); // close modal if confirmed
        setModalWaiting(false);
      });

  }

  return (
    <section>
      <form id="class-modal-form" onSubmit={handleSubmit}> {/* modal form */}
        <section className="input-list" id="class-add-text-input"> {/* container for all input values */}
          <TextInput info={addClassInfo.className} /> {/* add text input for class name */}
          <br />
          <Dropdown info={addClassDropdown} /> {/* add grade level dropdown */}
          <br /><br /><br /><br />
        </section>

        <div className='modal-buttons-section'> {/* formatting */}
          {isModalWaiting ?
          (<div style={{height: '40px'}} ><Loading/></div>) :
          (<Submit value="Create" />) /* add submit button */
          }
        </div>
      </form>
    </section>
  );
}

export default ClassAddModal;
