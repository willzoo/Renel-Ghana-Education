import React from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Submit/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'

let addClassInfo = {
  className: { title: "Class Name", placeholder: "Enter a class name", id: "class-name" },
};

let addClassDropdown = [
  ["Grade Level", "grade-level"],
  ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
  ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
  ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
];

function ClassAddModal() {
  let handleSubmit = (event) => {
      event.preventDefault();
      CloseModal("class-add");

      let className = document.getElementById('class-name').value;
      let gradeLevel = document.getElementById('grade-level').value;

      let content = {
          "class_name": className,
          "grade_level": gradeLevel,
          "teacher_id": "665da0b90c1d6c0c45724285",
          "school_id": "665da7c60c1d6c0c45724286",
          "students": []
      };

      //classInfo.push(content);

      // selectedClass = content //classInfo.at(-1);

    //   classInfo.sort((a, b) => {
    //       return a.class_name.localeCompare(b.class_name);
    //   });

    //   fetch('http://127.0.0.1:8000/classes', {
    //       method: "POST",
    //       headers: {
    //           'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(content)
    //   })
    //       .then(response => {
    //           if (!response.ok) {
    //               throw new Error('Network response was not ok');
    //           }
    //           return response.json();
    //       })
    //       .then(data => {
    //           console.log('Data received:', data);
    //       })
    //       .catch(error => {
    //           console.error('There was a problem with the fetch operation:', error);
    //       });

      // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));

      // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
      // ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level" icon="fa fa-book" />, document.getElementById("grade-level-indicator"));
      // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
  }

  return (
      <section>
          <form id="class-modal-form" onSubmit={handleSubmit}>
              <section className="input-list" id="class-add-text-input">
                  <TextInput info={addClassInfo.className} />
                  <br />
                  <Dropdown data={addClassDropdown} />
                  <br /><br /><br /><br />
              </section>
              <Submit value="Create" />
          </form>
      </section>
  );
}

export default ClassAddModal;
