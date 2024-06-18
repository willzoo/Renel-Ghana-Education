import React from 'react';
import AddTeacherButton from './AddTeacherButton/AddTeacherButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './SchoolBoard.css'

function SchoolBoard(props) {
    return (<section>
        <div className="main">
            <div className="header-info">

                <div>EduTracker Logo will eventually go here :)</div>
                <div className="upper-info">
                    <section id="grade-level-indicator"></section>
                    <section id="num-teachers-indicator"></section>
                    <section id="current-term-indicator"></section>
                </div>
            </div>
            <div style={{height:'20px'}}></div>

            {/* add teacher buttons */}
            <div className="add-teacher-section">
                {/* Old add teacher button */}
                {/* <AddTeacherButton id="new-teacher" text="Add Teacher" icon={faPlus}/> */}

                {/* <div style={{display: 'inline-block', width:'20px'}}></div> */}

                {/* add teacher/returning teacher button */}
                <AddTeacherButton id="returning" text="Add Teacher" icon={faPlus}/>
                
                {/* insert space between buttons */}
                <div style={{display: 'inline-block', width:'20px'}}></div>

                {/* add transfer teacher button */}
                <AddTeacherButton id="transfer" text="Add Transfer Teacher" icon={faArrowRight}/>

            </div>


            <div className="teacher-section">
                <div className="teachers-list-container">
                    <h1 className="title">Class Name</h1>
                    <p className="body">Teachers</p>
                    <div id="teachers-root" className="teachers-list"></div>
                </div>
            </div>

        </div>
    </section>
    );
}

export default SchoolBoard;


