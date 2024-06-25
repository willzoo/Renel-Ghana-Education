import React, { useContext } from 'react';
import './Sidebar.css';
import ClassAddButton from './ClassAddButton/ClassAddButton';
import Classes from './Classes/Classes'
import TeacherContext from '../../../TeacherContext';
import Profile from './Profile/Profile';

function Sidebar() { // create sidebar content
  const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;

  return (
    <section>
      <div className="sidebar">
        <div style={{ height: '100px' }}></div> {/* set gap of 100 px */}

        <Profile /> {/* add profile info */}

        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}

        {/* divider line */}
        <hr style={{
          width: '75%',
          textAlign: 'center',
          height: '2px',
          backgroundColor: 'rgb(41, 41, 41)',
        }} />

        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}

        <ClassAddButton /> {/* add classAddButton above classes */}
        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}
        <Classes /> {/* display sidebar classes */}

      </div>
    </section>
  );
};

export default Sidebar;
