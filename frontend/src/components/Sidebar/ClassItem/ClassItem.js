import React, { useContext } from 'react';
import './ClassItem.css'

import {OpenModal} from '../../../utils/functions'
import TeacherContext from '../../../TeacherContext';

function ClassItem(props) {
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

    const handleEditClick = () => {
        OpenModal('class-edit');
    }
    
    const handleClassClick = () => {
        setSelectedClass(props.data);
        // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
        // ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level" icon="fa fa-book" />, document.getElementById("grade-level-indicator"));
        // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
    };

    return (
        <li>
            <div className="sidebar-class" onClick={handleClassClick}>
                <div>
                    <p className="title">{props.data.class_name}</p>
                    <p className="body">{props.data.grade_level}</p>
                    <p className="body">Total Enrolled Students: {props.data.students.length}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEditClick}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default ClassItem;
