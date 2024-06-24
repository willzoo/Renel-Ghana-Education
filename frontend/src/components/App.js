// import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'

import { Route, Routes } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import TeacherLogin from './TeacherLogin/TeacherLogin';
<<<<<<< HEAD
import Reintegration from './Reintegration/Reintegration'; // Corrected the path
import AdminDashboard from './AdminDashboard'; // Corrected the path

=======
import TeacherRegistration from './TeacherRegistration/TeacherRegistration';
>>>>>>> a4a93ddebd61b665d274d9ad07de30ca3e9d4f74

function App() {

  return (
    // Routing between all different pages of the app
    <>
       <Routes>
<<<<<<< HEAD
          <Route path="/TeacherLogin/" element= {<TeacherLogin />} />
          <Route path="/" element= {<TeacherDashboard />} />
          <Route path="/reintegration" element={<Reintegration />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Add the new route */}
=======
          <Route path="/TeacherLogin" element= {<TeacherLogin />} />
          <Route path="/TeacherRegistration" element= {<TeacherRegistration />} />
          <Route path="/TeacherDashboard" element= {<TeacherDashboard />} />
>>>>>>> a4a93ddebd61b665d274d9ad07de30ca3e9d4f74
       </Routes>
    </>
    
  );
}

export default App;
