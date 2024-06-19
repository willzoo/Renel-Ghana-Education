import React from "react";
import './StudentItem.css'


import { OpenModal } from "../../../../utils/functions";
    
function StudentItem(props) {
    const handleEdit = (event) => {
        console.log("Student item function called")
        // ReactDOM.render(<EditStudentInput student={props.data} />, document.getElementById("edit-student-modal-root"));
        OpenModal("edit-student");
    }
    return (
        <li>
            <div className="student-list-item">
                <div>
                    <p className="title">{props.data.name}</p>
                    <p className="body">Student ID: {props.data.student_school_id}</p>
                    <p className="body">Disability: {props.data.disabled}</p>
                </div>
                <div>
                    <p className="title">Parent Contact Information</p>
                    <p className="body">{props.data.guardian_name}</p>
                    <p className="body">{props.data.guardian_contact}</p>
                </div>
                <div className="edit-button">
                    <p onClick={handleEdit}>Edit</p>
                </div>
            </div>
        </li>
    );
}

export default StudentItem;