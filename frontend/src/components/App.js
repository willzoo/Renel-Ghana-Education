// import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'

import { Routes, Route } from 'react-router-dom'
import TeacherDashboard from './TeacherDashboard';

function App() {

  return (
    // Teacher context allows for classInfo and selectedClass to be passed throughout the application
    <>
       <Routes>
          <Route path="/" element= {<TeacherDashboard />} />
       </Routes>
    </>
    
  );
}

export default App;
