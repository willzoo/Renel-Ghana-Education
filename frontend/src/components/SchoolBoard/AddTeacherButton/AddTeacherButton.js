import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './AddTeacherButton.css'
import { OpenModal } from '../../../utils/functions'

function AddTeacherButton(props) {
  return (
    <div className="add-teacher-button" onClick={() => OpenModal(`${props.id}-teacher`)}>
        <div className="icon">
            <FontAwesomeIcon icon={props.icon}/>
        </div>
        <p className="text">{props.text}</p>
    </div>
  );
}

export default AddTeacherButton;