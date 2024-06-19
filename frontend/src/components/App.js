import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Modals from './Modals/Modals'
import { useEffect, useState, useContext } from 'react';
import {CloseModal} from '../utils/functions'

import { ClassProvider, ClassContext } from '../utils/global';


function App() {
  const { selectedClass, setSelectedClass, classInfo, setClassInfo } = useContext(ClassContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/teachers/665da0b90c1d6c0c45724285/classes`, {
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
          setClassInfo(data);
  
          classInfo.sort((a, b) => {
              return a.class_name.localeCompare(b.class_name);
          });
  
          setSelectedClass(classInfo[0]);
          // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));

          CloseModal('loading');
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      }, []);
  })

  return (
    <section>
      {/* <!-- add light grey background --> */}
      <div className="background">
        <Modals/>
        <Sidebar/>
        <Dashboard />
      </div>
    </section>
  );
}

export default App;
