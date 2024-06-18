import React from 'react';
import AddStudentButton from './AddStudentButton/AddStudentButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'

function Dashboard(props) {
    return (<section>
        <div className="main">
            <div className="header-info">

                <div>EduTracker Logo will eventually go here :)</div>
                <div className="upper-info">
                    <section id="grade-level-indicator"></section>
                    <section id="num-students-indicator"></section>
                    <section id="current-term-indicator"></section>
                </div>
            </div>
            <div style={{height:'20px'}}></div>

            {/* add student buttons */}
            <div className="add-student-section">
                {/* Old add student button */}
                {/* <AddStudentButton id="new-student" text="Add Student" icon={faPlus}/> */}

                {/* <div style={{display: 'inline-block', width:'20px'}}></div> */}

                {/* add student/returning student button */}
                <AddStudentButton id="returning" text="Add Student" icon={faPlus}/>
                
                {/* insert space between buttons */}
                <div style={{display: 'inline-block', width:'20px'}}></div>

                {/* add transfer student button */}
                <AddStudentButton id="transfer" text="Add Transfer Student" icon={faArrowRight}/>

            </div>


            <div className="student-section">
                <div className="students-list-container">
                    <h1 className="title">Class Name</h1>
                    <p className="body">Students</p>
                    <div id="students-root" className="students-list"></div>
                </div>
            </div>

        </div>
    </section>
    );
}

export default Dashboard;


