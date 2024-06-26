import React, { useContext, useEffect } from 'react'
import { CloseModal, OpenModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Delete from '../components/Buttons/Delete'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import TeacherContext from '../../../../TeacherContext';
import Loading from '../components/Loading/Loading';

function EditClassModal() { // class edit modal
  const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
  const { classToEdit, setClassToEdit } = useContext(TeacherContext).classToEdit;
  const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
  const { isModalWaiting, setModalWaiting } = useContext(TeacherContext).modalWaiting;

  const editClassInfo = { // base text input values
    className: { title: "Class Name (optional)", placeholder: "Enter a class name", id: "class-name-edit", required: false },
  };

  const editClassDropdown = [ // dropdown values
    ["Grade Level", "grade-level-edit"],
    ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
    ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
  ];

  const handleSubmit = (event) => { // when form is submitted
    event.preventDefault(); // do not refresh page

    // get new values
    let className = document.getElementById('class-name-edit').value;
    let gradeLevel = document.getElementById('grade-level-edit').value;

    // prevent duplicates
    if (classInfo.classes.some(cls =>
      // if some other class (with different id) shares the same name, show error
      cls.class_name === selectedClass.class_name && cls._id !== selectedClass._id
    )) {
      alert("You already have a class with this name. Please choose a unique name.");
      return;
    }

    setModalWaiting(true);

    let content = { // assign content
      "class_name": className ? className : gradeLevel,
      "grade_level": gradeLevel,
      "teacher_id": selectedClass.teacher_id,
      "school_id": selectedClass.school_id,
      "students": selectedClass.students,
    };

    fetch(`http://127.0.0.1:8000/classes/${selectedClass._id}`, { // fetch call to modify the selected class
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

        Object.assign(classInfo.classes.find(cls => cls._id === selectedClass._id), content);

        classInfo.classes.sort((a, b) => {
          return a.class_name.localeCompare(b.class_name); // sort classes by name alphabetically
        });
        CloseModal('class-edit'); // close modal

        setModalWaiting(false);
        setSelectedClass(content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleDelete = () => { // functionality for class deletion
    if (window.confirm("Are you sure you want to delete this class?")) { // confirmation for class deletion
      setModalWaiting(true);

      fetch(`http://127.0.0.1:8000/classes/${selectedClass._id}`, { // delete selected class
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          // Handle the data returned from the server
          CloseModal('class-edit'); // close modal if confirmed
          
          classInfo.classes = classInfo.classes.filter(cls => cls._id !== selectedClass._id);

          setSelectedClass(null); // forget selected student

          setModalWaiting(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          CloseModal('class-edit'); // close modal if confirmed
          OpenModal('error'); // close modal if confirmed
          setModalWaiting(false);
        });

      try { document.getElementById('sidebar-classes').scrollTop = 0; } catch (e) { };
      // if sidebar-classes exists, scroll to top (try/catch required for initialization)
    }
  }

  return (
    <section>
      <form id="class-modal-form" onSubmit={handleSubmit}> {/* run handleSubmit when submitted */}
        <section className="input-list" id="class-edit-text-input"> {/* container for all class items */}
          <TextInput info={editClassInfo.className} editValue={selectedClass ? selectedClass.class_name : null} /> {/* class name text input */}
          <br />
          <Dropdown info={editClassDropdown} editValue={selectedClass ? selectedClass.grade_level : null} /> {/* grade select dropdown */}
          <br /><br /><br /><br />
        </section>

        <div className='modal-buttons-section'> {/* formatting for lower modal buttons */}
          {isModalWaiting ?
          (<div style={{height: '40px'}} ><Loading/></div>) :
          (<>
            <div><Delete value="Delete" onClick={handleDelete} /></div>
            <div style={{ display: 'inline-block', width: '20px' }}></div>
            <div><Submit value="Save" /></div>
          </>)}
        </div>
      </form>
    </section>
  );
}

export default EditClassModal;
