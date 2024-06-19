import React from 'react';
import AddStudentButton from './AddStudentButton/AddStudentButton';
import Indicators from './Indicators/Indicators'
import Students from './Students/Students';

import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';


import './Dashboard.css'

function Dashboard(props) {
    return (<section>
        <div className="main">
            <div className="header-info">

                <div>EduTracker Logo will eventually go here :)</div>
                <Indicators />
            </div>
            <div style={{height:'20px'}}></div>

            {/* add student buttons */}
            <div className="add-student-section">
                {/* Old add student button */}
                {/* <AddStudentButton id="new-student" text="Add Student" icon={faPlus}/> */}

                {/* <div style={{display: 'inline-block', width:'20px'}}></div> */}

                {/* add student/returning student button */}
                <AddStudentButton id="search" text="Add Student" icon={faPlus}/>
                
                {/* insert space between buttons */}
                <div style={{display: 'inline-block', width:'20px'}}></div>

                {/* add transfer student button */}
                <AddStudentButton id="transfer" text="Add Transfer Student" icon={faArrowRight}/>

            </div>


            <Students />

        </div>
    </section>
    );
}

export default Dashboard;


