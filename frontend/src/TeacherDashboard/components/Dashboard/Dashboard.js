import React from 'react';
import AddStudentButton from './AddStudentButton/AddStudentButton';
import Indicators from './Indicators/Indicators'
import Students from './Students/Students';

import { faPlus, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';


import './Dashboard.css'
import Logo from './Logo/Logo';

function Dashboard(props) { // main dashboard page
    let buttons = { // define add student buttons
        newStudent: { id: "new", text: "Add New Student", icon: faPlus },
        returningStudent: { id: "returning", text: "Add Returning Student", icon: faArrowDown },
        transferStudent: { id: "transfer", text: "Add Transfer Student", icon: faArrowRight },
    }

    return (<section>
        <div className="main">
            <div className="header-info"> {/* define header boundaries */}
                <Logo /> {/* add logo in top left corner */}
                <Indicators /> {/* add indicators in top right corner */}
            </div>
            <div style={{ height: '20px' }}></div> {/* division between header and buttons */}

            {/* add student buttons */}
            <div className="add-student-section">
                <AddStudentButton info={buttons.newStudent} /> {/* Add New Student button */}
                <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
                <AddStudentButton info={buttons.returningStudent} /> {/* Add Returning Student button */}
                <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
                <AddStudentButton info={buttons.transferStudent} /> {/* Add Transfer Student button */}
            </div>


            <Students /> {/* add students list to main screen */}

        </div>
    </section>
    );
}

export default Dashboard;


