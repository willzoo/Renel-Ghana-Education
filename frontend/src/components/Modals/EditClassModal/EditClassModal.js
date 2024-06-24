import React, { useContext, useEffect } from 'react'
import { CloseModal } from '../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Delete from '../components/Buttons/Delete'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import TeacherContext from '../../../TeacherContext';

function EditClassModal() {
  const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
  const { classToEdit, setClassToEdit } = useContext(TeacherContext).classToEdit;
  const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;

  const editClassInfo = {
    className: { title: "Class Name (optional)", placeholder: "Enter a class name", id: "class-name-edit", required: false },
  };

  const editClassDropdown = [
    ["Grade Level", "grade-level-edit"],
    ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
    ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    let className = document.getElementById('class-name-edit').value;
    let gradeLevel = document.getElementById('grade-level-edit').value;

    if (classInfo.classes.some(cls =>
      cls.class_name === selectedClass.class_name && cls._id !== selectedClass._id
    )) {
      alert("You already have a class with this name. Please choose a unique name.");
      return;
    }

    CloseModal('class-edit');

    let content = {
      "class_name": className ? className : gradeLevel,
      "grade_level": gradeLevel,
      "teacher_id": selectedClass.teacher_id,
      "school_id": selectedClass.school_id,
      "students": selectedClass.students,
    };

    let tempClasses = classInfo.classes;
    let classToEdit = tempClasses.find(cls =>
      cls._id === selectedClass._id
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

    let sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class'));
    sidebarClassElements.find(cls => cls.dataset.classId === selectedClass._id).scrollIntoView();

    fetch(`http://127.0.0.1:8000/classes/${selectedClass._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the data returned from the server
        console.log(data); // For demonstration purposes; adjust as needed
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      CloseModal('class-edit');

      let tempClasses = classInfo.classes.filter(cls => cls._id !== selectedClass._id);

      // solution created by AI
      setClassInfo((oldClassInfo) => ({
        ...oldClassInfo,
        classes: tempClasses,
      }));

      fetch(`http://127.0.0.1:8000/classes/${selectedClass._id}`, {
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

      try { document.getElementById('sidebar-classes').scrollTop = 0; } catch (e) { };
    }
  }

  useEffect(() => {
    if (!selectedClass) return;

    const sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class'));
    if (!sidebarClassElements) return;

    sidebarClassElements.forEach((element) => {
      element.classList.remove('selected');
    });

    const selectedElement = sidebarClassElements.find((element) =>
      element.dataset.classId === selectedClass._id
    );

    if (!selectedElement) return;
    selectedElement.classList.add('selected');
  }, [classInfo])

  return (
    <section>
      <form id="class-modal-form" onSubmit={handleSubmit}>
        <section className="input-list" id="class-edit-text-input">
          <TextInput info={editClassInfo.className} editValue={selectedClass ? selectedClass.class_name : null} />
          <br />
          <Dropdown info={editClassDropdown} editValue={selectedClass ? selectedClass.grade_level : null} />
          <br /><br /><br /><br />
        </section>

        <div className='modal-buttons-section'>
          <div><Delete value="Delete" onClick={handleDelete} /></div>
          <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
          <div><Submit value="Save" /></div>
        </div>
      </form>
    </section>
  );
}

export default EditClassModal;
