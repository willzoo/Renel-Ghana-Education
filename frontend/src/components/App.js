// import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'

import { Route, Routes } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import TeacherLogin from './TeacherLogin/TeacherLogin';
import Reintegration from './Reintegration/Reintegration'; // Corrected the path
import AdminDashboard from './AdminDashboard'; // Corrected the path

import TeacherRegistration from './TeacherRegistration/TeacherRegistration';

function App() {

  return (
    // Routing between all different pages of the app
    <>
       <Routes>
          <Route path="/TeacherLogin/" element= {<TeacherLogin />} />
          <Route path="/" element= {<TeacherDashboard />} />
          <Route path="/reintegration" element={<Reintegration />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Add the new route */}
          <Route path="/TeacherLogin" element= {<TeacherLogin />} />
          <Route path="/TeacherRegistration" element= {<TeacherRegistration />} />
          <Route path="/TeacherDashboard" element= {<TeacherDashboard />} />
       </Routes>
    </>
    
  );
}

export default App;
