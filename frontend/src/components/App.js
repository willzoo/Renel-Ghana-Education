import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Modals from './Modals/Modals'
import { useEffect, useState, useContext } from 'react';
import {CloseModal, OpenModal} from '../utils/functions'
import TeacherContext from '../TeacherContext';

function App() {
    // export let RETURNING_STUDENT_ID = '';
  // export var teacherID = "665da0b90c1d6c0c45724285";

  const [classInfo, setClassInfo] = useState({
      "name": "Patrick Kallenbach",
      "email": "pkallenbach21@gmail.com",
      "school_name": "PK Yonge DRS",
      'classes': [
          {
          "class_name": "Class 1",
          "grade_level": "Kindergarten 1",
          "teacher_id": "665da0b90c1d6c0c45724285",
          "school_id": "665da7c60c1d6c0c45724286",
          "students": [{
              'name': "Matthew Kallenbach",
              'guardian_name': "Alex Kallenbach",
              'guardian_contact': "arkall4@yahoo.com",
              'dob': "April 26, 2001",
              "student_school_id": '1525',
              'disabled': false,
              'health_conditions': "None",
              'misc_info': "None",
          }
          ]
      },
      {
          "class_name": "Class 2",
          "grade_level": "Primary 1",
          "teacher_id": "665da0b90c1d6c0c45724285",
          "school_id": "665da7c60c1d6c0c45724286",
          "students": [{
              'name': "Matthew Kallenbach",
              'guardian_name': "Alex Kallenbach",
              'guardian_contact': "arkall4@yahoo.com",
              'dob': "April 26, 2001",
              "student_school_id": '1525',
              'disabled': false,
              'health_conditions': "None",
              'misc_info': "None",
          }
          ]
      },
      {
          "class_name": "Class 3",
          "grade_level": "Junior High 1",
          "teacher_id": "665da0b90c1d6c0c45724285",
          "school_id": "665da7c60c1d6c0c45724286",
          "students": [{
              'name': "Matthew Kallenbach",
              'guardian_name': "Alex Kallenbach",
              'guardian_contact': "arkall4@yahoo.com",
              'dob': "April 26, 2001",
              "student_school_id": '1525',
              'disabled': false,
              'health_conditions': "None",
              'misc_info': "None",
          }
          ]
      },
  ]
  });

  const [selectedClass, setSelectedClass] = useState(classInfo.classes[0]);

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/teachers/665da0b90c1d6c0c45724285/classes`, {
  //     method: "GET",
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         console.log('Data received:', data);
  //         setClassInfo(data);
  
  //         classInfo.sort((a, b) => {
  //             return a.class_name.localeCompare(b.class_name);
  //         });
  
  //         setSelectedClass(classInfo[0]);

  //         CloseModal('loading');
  //     })
  //     .catch(error => {
  //         console.error('There was a problem with the fetch operation:', error);

  //         CloseModal('loading');
  //         OpenModal('error');
  //     }, []);
  // })

  return (
    // Teacher context allows for classInfo and selectedClass to be passed throughout the application
    <TeacherContext.Provider value={{'classInfo': {classInfo, setClassInfo}, 'selectedClass': {selectedClass, setSelectedClass}}}>
      <section>
        <div className="background">
          <Modals/> {/* add each modal to the page */}
          <Sidebar/> {/* add sidebar content */}
          <Dashboard /> {/* add dashboard content */}
        </div>
      </section>
    </TeacherContext.Provider>
  );
}

export default App;
