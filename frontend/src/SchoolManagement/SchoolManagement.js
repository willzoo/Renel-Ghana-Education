import '../TeacherDashboard/TeacherDashboard.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'
import Sidebar from './components/Sidebar/Sidebar';
import SchoolDashboard from './components/SchoolDashboard/SchoolDashboard';
import Modals from './components/Modals/Modals'
import { useEffect, useState, useContext } from 'react';
import { CloseModal, OpenModal } from '../utils/functions'
import AdminContext from '../AdminContext';

import { Routes, Route } from 'react-router-dom'

function SchoolManagement() {

  const [schoolInfo, setSchoolInfo] = useState({
    'schools': []
  });

  const [selectedSchool, setSelectedSchool] = useState(null);

  const [schoolToEdit, setSchoolToEdit] = useState(null);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  let loaded = false;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/schools/teachers`, {
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

          data.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });

          setSchoolInfo(data);
          setSelectedSchool(schoolInfo[0]);

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
    // Teacher context allows for schoolInfo and selectedSchool to be passed throughout the application
    <AdminContext.Provider value={{
      'schoolInfo': { schoolInfo, setSchoolInfo },
      'selectedSchool': { selectedSchool, setSelectedSchool },
      'schoolToEdit': { schoolToEdit, setSchoolToEdit },
      'selectedTeacher': { selectedTeacher, setSelectedTeacher },
    }}>
      <section>
        <div className="background">
          <Modals />
          <Sidebar /> 
          <SchoolDashboard /> {/* add dashboard content */}
        </div>
      </section>
    </AdminContext.Provider>    
  );
}

export default SchoolManagement;
