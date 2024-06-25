import React, { useContext, useEffect } from 'react'
import { CloseModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Delete from '../components/Buttons/Delete'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import TeacherContext from '../../../../TeacherContext';

function EditClassModal() { // class edit modal
  const { selectedClass, setSelectedClass } = useContext(TeacherContext).selectedClass;
  const { classToEdit, setClassToEdit } = useContext(TeacherContext).classToEdit;
  const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;

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

    CloseModal('class-edit'); // close modal

    let content = { // assign content
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
      Object.assign(classToEdit, content); // modify class information
    }

    tempClasses.sort((a, b) => {
      return a.class_name.localeCompare(b.class_name); // sort classes by name alphabetically
    });

    setClassInfo((oldClassInfo) => ({ // update classInfo
      ...oldClassInfo,
      classes: tempClasses,
    }));

    let sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class')); // get all sidebar classes
    sidebarClassElements.find(cls => cls.dataset.classId === selectedClass._id).scrollIntoView(); // bring selected class into view

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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleDelete = () => { // functionality for class deletion
    if (window.confirm("Are you sure you want to delete this class?")) { // confirmation for class deletion
      CloseModal('class-edit'); // close modal if confirmed

      let tempClasses = classInfo.classes.filter(cls => cls._id !== selectedClass._id);
      // assign tempClasses to all classes without the requested deletion

      setClassInfo((oldClassInfo) => ({ // update classInfo
        ...oldClassInfo,
        classes: tempClasses,
      }));

      setSelectedClass(null); // forget selected student

      fetch(`http://127.0.0.1:8000/classes/${selectedClass._id}`, { // delete selected class
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
      // if sidebar-classes exists, scroll to top (try/catch required for initialization)
    }
  }

  useEffect(() => { // select correct class after editing, run whenever classInfo is updated
    if (!selectedClass) return; // if no class is selected, quit

    const sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class')); // get all sidebar classes
    if (!sidebarClassElements) return; // quit if classes dont exist

    sidebarClassElements.forEach((element) => {
      element.classList.remove('selected'); // remove selected class from all classes
    });

    const selectedElement = sidebarClassElements.find((element) =>
      element.dataset.classId === selectedClass._id // find class with corresponding id
    );

    if (!selectedElement) return; // quit if no class has that ID
    selectedElement.classList.add('selected'); // add selected class to new selected element
  }, [classInfo]) // dependencies, update whenever classInfo changes

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
          <div><Delete value="Delete" onClick={handleDelete} /></div> {/* delete button */}
          <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
          <div><Submit value="Save" /></div> {/* save button */}
        </div>
      </form>
    </section>
  );
}

export default EditClassModal;
