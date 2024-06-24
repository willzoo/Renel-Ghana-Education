// import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'

import { Routes, Route } from 'react-router-dom'
import TeacherDashboard from './TeacherDashboard';
import TeacherLogin from './TeacherLogin/TeacherLogin';
import TeacherRegistration from './TeacherRegistration/TeacherRegistration';

function App() {

  return (
    // Routing between all different pages of the app
    <>
       <Routes>
          <Route path="/TeacherLogin" element= {<TeacherLogin />} />
          <Route path="/TeacherRegistration" element= {<TeacherRegistration />} />
          <Route path="/TeacherDashboard" element= {<TeacherDashboard />} />
       </Routes>
    </>
    
  );
}

export default App;
