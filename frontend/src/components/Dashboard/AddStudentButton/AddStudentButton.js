import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import './AddStudentButton.css'
import { OpenModal } from '../../../utils/functions'
import TeacherContext from '../../../TeacherContext';

function AddStudentButton(props) {
  const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

  const handleClick = () => {
    if (selectedClass) {
      OpenModal(`${props.info.id}-student`);
    }
    else {
      alert("Please select a class first.");
    }
  }


  return (
    <div className="add-student-button" onClick={handleClick}>
      <div className="icon">
        <FontAwesomeIcon icon={props.info.icon} />
      </div>
      <p className="text">{props.info.text}</p>
    </div>
  );
}

export default AddStudentButton;