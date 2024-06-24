import React, { useContext } from 'react';
import './Sidebar.css';
import ClassAddButton from './SchoolAddButton/SchoolAddButton';
import Classes from './Schools/Classes'
import TeacherContext from '../../../TeacherContext';
import Profile from './Profile/Profile';

function Sidebar() {
  const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;

  return (
    <section>
      <div className="sidebar">
        <div style={{ height: '100px' }}></div> {/* set gap of 100 px */}

        {/* <Profile /> change to edutracker logo*/}

        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}

        {/* divider line */}
        <hr style={{
          width: '75%',
          textAlign: 'center',
          height: '2px',
          backgroundColor: 'rgb(41, 41, 41)',
        }} />

        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}

        <ClassAddButton />
        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}
        <Classes />

      </div>
    </section>
  );
};

export default Sidebar;
