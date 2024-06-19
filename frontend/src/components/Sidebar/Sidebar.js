import React, { useContext } from 'react';
import './Sidebar.css';
import ClassAddButton from './ClassAddButton/ClassAddButton';
import ClassesList from './ClassesList/ClassesList'
import TeacherContext from '../../TeacherContext';

function Sidebar() {
    const {classInfo, setClassInfo} = useContext(TeacherContext).classInfo;

  return (
    <section>
        <div className="sidebar">
            {/* This style of div is used throughout as a way to space objects apart */}
            <div style={{height: '100px'}}></div>

            {/* <!-- add profile info --> */}
            <section className="profile">
                <p id="teacher-name" className="name">{classInfo.name}</p>
                <p id="school-name" className="info">School Name</p>
                <br />
                <p id="teacher-email" className="info" style={{fontSize: '15px'}}>{classInfo.email}</p>
            </section>

            <div style={{height: '50px'}}></div>

            {/* section line */}
            <hr style={{
                width: '75%',
                textAlign: 'center',
                height: '2px',
                backgroundColor: 'rgb(41, 41, 41)',
            }}/>

            <div style={{height: '50px'}}></div>   

            {/* create new class button */}
            <ClassAddButton/>

            <div style={{height: '50px'}}></div>

            {/* sidebar classes */}
            <div className="sidebar-classes-container">
                <h1>Classes</h1>
                <p>Select a class to view students</p>
                <div id="classes-root" className="sidebar-classes">
                    {/* Sidebar classes will be loaded here */}
                    <ClassesList info={classInfo}/>
                </div>
            </div>

        </div>
    </section>
  );
};

export default Sidebar;
