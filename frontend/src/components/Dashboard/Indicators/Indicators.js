import React, {useContext} from "react";
import Indicator from './Indicator/Indicator'
import './Indicators.css'

import { faBook, faCalendar, faGraduationCap,} from '@fortawesome/free-solid-svg-icons';

import TeacherContext from "../../../TeacherContext";

function Indicators() {
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

    let indicatorInfo = {
        gradeLevel: {title: "Grade Level", value:selectedClass ? selectedClass.grade_level : "-", theme:"grade-level", icon: faBook},
        numStudents: {title: "Enrolled Students", value: selectedClass ? selectedClass.students.length : "-", theme: "num-students", icon: faGraduationCap},
        currentTerm: {title: "Current Term", value:"2", theme:"term-number", icon: faCalendar},
    }

    return (
        <div className="indicator">
            <Indicator info={indicatorInfo.gradeLevel}/>
            <Indicator info={indicatorInfo.numStudents}/>
            <Indicator info={indicatorInfo.currentTerm}/>
        </div>
    );
}
export default Indicators;