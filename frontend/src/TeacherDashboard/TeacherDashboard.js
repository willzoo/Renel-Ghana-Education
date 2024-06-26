import './TeacherDashboard.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Modals from './components/Modals/Modals'
import { useEffect, useState, useContext } from 'react';
import { CloseModal, OpenModal } from '../utils/functions'
import TeacherContext from '../TeacherContext';

import { Routes, Route } from 'react-router-dom'

function TeacherDashboard() {
  // export let RETURNING_STUDENT_ID = '';
  // export var teacherID = "665da0b90c1d6c0c45724285";
  let teacher_id = localStorage['teacher_id'];

  const [classInfo, setClassInfo] = useState({
    "name": "Example Teacher",
    "email": "example.teacher@renelglobal.org",
    "school_name": "Example School",
    "school_id": "1234567890",
    'classes': []
  });

  const [selectedClass, setSelectedClass] = useState(null);

  const [classToEdit, setClassToEdit] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isModalWaiting, setModalWaiting] = useState(false);

  const [updateSelection, setUpdateSelection] = useState(0);

  let loaded = false;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/teachers/${teacher_id}/classes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);

        if (!loaded) {

          data.classes.sort((a, b) => {
            return a.class_name.localeCompare(b.class_name);
          });

          data.classes.forEach(element => {
            element.students.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
          });

          setClassInfo(data);

          CloseModal('loading');
          
          loaded = true;
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);

        CloseModal('loading');
        OpenModal('error');
      });
  }, []);

  return (
    // Teacher context allows for classInfo and selectedClass to be passed throughout the application
    <TeacherContext.Provider value={{
      'classInfo': { classInfo, setClassInfo },
      'selectedClass': { selectedClass, setSelectedClass },
      'classToEdit': { classToEdit, setClassToEdit },
      'selectedStudent': { selectedStudent, setSelectedStudent },
      'updateSelection': { updateSelection, setUpdateSelection },
      'modalWaiting': { isModalWaiting, setModalWaiting },
    }}>
      <section>
        <div className="background">
          <Modals /> {/* add each modal to the page */}
          <Sidebar /> {/* add sidebar content */}
          <Dashboard /> {/* add dashboard content */}
        </div>
      </section>
    </TeacherContext.Provider>    
  );
}

export default TeacherDashboard;
