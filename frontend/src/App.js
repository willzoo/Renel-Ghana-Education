// import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'

import { Route, Routes } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import TeacherLogin from './TeacherLogin/TeacherLogin';
import Reintegration from './Reintegration/Reintegration'; // Corrected the path
import AdminDashboard from './AdminDashboard/AdminDashboard'; // Corrected the path
import SchoolManagement from './SchoolManagement/SchoolManagement';
// import LandingPage from './LandingPage/LandingPage'; // Import the LandingPage component
import TeacherRegistration from './TeacherRegistration/TeacherRegistration';

function App() {

  return (
    // Routing between all different pages of the app
    <>
       <Routes>
       {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/Reintegration" element={<Reintegration />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/SchoolManagement" element={<SchoolManagement />} />
          <Route path="/TeacherLogin" element= {<TeacherLogin />} />
          <Route path="/TeacherRegistration" element= {<TeacherRegistration />} />
          <Route path="/TeacherDashboard" element= {<TeacherDashboard />} />
       </Routes>
    </>
    
  );
}

export default App;
