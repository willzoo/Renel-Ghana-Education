import React from 'react';
import './Sidebar.css';
import ClassAddButton from './ClassAddButton/ClassAddButton';


const Sidebar = () => {
  return (
    <section>
        <div className="sidebar">
            {/* This style of div is used throughout as a way to space objects apart */}
            <div style={{height: '100px'}}></div>

            {/* <!-- add profile info --> */}
            <section class="profile">
                <p id="teacher-name" className="name">First Last</p>
                <p id="school-name" className="info">School Name</p>
                <br />
                <p id="teacher-email" className="info" style={{fontSize: '15px'}}>emailaddress@renelglobal.org</p>
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
                </div>
            </div>

        </div>
    </section>
  );
};

export default Sidebar;
