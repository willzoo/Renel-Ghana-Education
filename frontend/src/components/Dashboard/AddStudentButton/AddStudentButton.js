import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './AddStudentButton.css'
import { OpenModal } from '../../../utils/functions'

function AddStudentButton(props) {
  return (
    <div className="add-student-button" onClick={() => OpenModal(`${props.id}-student`)}>
        <div className="icon">
            <FontAwesomeIcon icon={props.icon}/>
        </div>
        <p className="text">{props.text}</p>
    </div>
  );
}

export default AddStudentButton;