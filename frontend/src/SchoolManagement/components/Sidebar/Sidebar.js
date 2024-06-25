import React, { useContext } from 'react';
import './Sidebar.css';
import SchoolAddButton from './SchoolAddButton/SchoolAddButton';
import Schools from './Schools/Schools'
import AdminContext from '../../../AdminContext';
//import Profile from './Profile/Profile';
import Logo from './Logo/Logo';

function Sidebar() {
  const { schoolInfo, setSchoolInfo } = useContext(AdminContext).schoolInfo;

  return (
    <section>
      <div className="sidebar">
        <div style={{ height: '100px' }}></div> {/* set gap of 100 px */}

        <Logo />

        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}

        {/* divider line */}
        <hr style={{
          width: '75%',
          textAlign: 'center',
          height: '2px',
          backgroundColor: 'rgb(41, 41, 41)',
        }} />

        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}

        <SchoolAddButton />
        <div style={{ height: '50px' }}></div> {/* set gap of 50 px */}
        <Schools />

      </div>
    </section>
  );
};

export default Sidebar;
