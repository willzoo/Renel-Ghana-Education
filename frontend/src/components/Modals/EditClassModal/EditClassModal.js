import React from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'

import {classInfo, selectedClass} from "../../../utils/global"

let editClassInfo = {
  className: { title: "Class Name", placeholder: "Enter a class name", id: "class-name" },
};

let editClassDropdown = [
  ["Grade Level", "grade-level"],
  ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
  ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
  ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
];

function EditClassModal() {
  let handleSubmit = (event) => {
      event.preventDefault();
      CloseModal("class-edit");

      let className = document.getElementById('class-name').value;
      let gradeLevel = document.getElementById('grade-level').value;

      let content = {
          "class_name": className,
          "grade_level": gradeLevel,
          "teacher_id": "665da0b90c1d6c0c45724285",
          "school_id": "665da7c60c1d6c0c45724286",
          "students": []
      };
    }

  return (
      <section>
          <form id="class-modal-form" onSubmit={handleSubmit}>
              <section className="input-list" id="class-edit-text-input">
                  <TextInput info={editClassInfo.className} />
                  <br />
                  <Dropdown data={editClassDropdown} />
                  <br /><br /><br /><br />
              </section>
              <Submit value="Save" />
          </form>
      </section>
  );
}

export default EditClassModal;
