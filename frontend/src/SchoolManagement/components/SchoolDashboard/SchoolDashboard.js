import React from 'react';
import AddTeacherButton from './AddTeacherButton/AddTeacherButton';
import Teachers from './Teachers/Teachers';

import { faPlus, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';


import './SchoolDashboard.css'

function SchoolDashboard(props) {
    let buttons = {
        newTeacher: { id: "new", text: "Add New Teacher", icon: faPlus },
    }

    return (<section>
        <div className="main">
            {/* <div className="header-info">
            </div> */}
            <div style={{ height: '100px' }}></div>

            {/* add teacher buttons */}
            <div className="add-teacher-section">
                <AddTeacherButton info={buttons.newTeacher} /> {/* Add New Teacher button */}
            </div>


            <Teachers />

        </div>
    </section>
    );
}

export default SchoolDashboard;


