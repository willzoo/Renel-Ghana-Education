import React from "react";
import Indicator from './Indicator/Indicator'
import './Indicators.css'

import { faBook, faCalendar, faGraduationCap,} from '@fortawesome/free-solid-svg-icons';

import { selectedClass } from "../../../utils/global";

let indicatorInfo = {
    gradeLevel: {title: "Grade Level", value:selectedClass.grade_level, theme:"grade-level", icon: faBook},
    numStudents: {title: "Enrolled Students", value: selectedClass.students.length, theme: "num-students", icon: faGraduationCap},
    currentTerm: {title: "Current Term", value:"2", theme:"term-number", icon: faCalendar},
}

function Indicators() {
    return (
        <div className="indicator">
            <Indicator info={indicatorInfo.gradeLevel}/>
            <Indicator info={indicatorInfo.numStudents}/>
            <Indicator info={indicatorInfo.currentTerm}/>
        </div>
    );
}
export default Indicators;