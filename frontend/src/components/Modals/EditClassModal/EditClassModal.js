import React, { useContext } from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import TeacherContext from '../../../TeacherContext';

function EditClassModal() {
  const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

  let editClassInfo = {
    className: { title: "Class Name",
                  placeholder: "Enter a class name (optional)",
                  id: "class-name",
                  required: false},
  };

  let editClassDropdown = [
    ["Grade Level", "grade-level"],
    ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
    ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
  ];

  let handleSubmit = (event) => {
    event.preventDefault();
    CloseModal("class-edit");

    let className = document.getElementById('class-name').value;
    let gradeLevel = document.getElementById('grade-level').value;


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
