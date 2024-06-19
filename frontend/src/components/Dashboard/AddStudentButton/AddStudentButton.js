import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './AddStudentButton.css'
import { OpenModal } from '../../../utils/functions'

function AddStudentButton(props) {
  return (
    <div className="add-student-button" onClick={() => OpenModal(`${props.info.id}-student`)}>
        <div className="icon">
            <FontAwesomeIcon icon={props.info.icon}/>
        </div>
        <p className="text">{props.info.text}</p>
    </div>
  );
}

export default AddStudentButton;