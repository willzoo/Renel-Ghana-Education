import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import './AddStudentButton.css'
import { OpenModal } from '../../../../utils/functions';
import TeacherContext from '../../../../TeacherContext';

function AddStudentButton(props) {
  const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

  const handleClick = () => { // when button is clicked
    if (props.info.id === "transfer") { // TODO: add transfer student modal
      alert("Sorry, this tool has not been completed yet.");
      return;
    }
    if (selectedClass) { // if class exists, open the corresponding modal
      OpenModal(`${props.info.id}-student`);
    }
    else { // otherwise, warn user
      alert("Please select a class first.");
    }
  }


  return (
    <div className="add-student-button" onClick={handleClick}> {/* add button division */}
      <div className="icon"> {/* Add icon container with icon inside */}
        <FontAwesomeIcon icon={props.info.icon} />
      </div>
      <p className="text">{props.info.text}</p> {/* Add button text */}
    </div>
  );
}

export default AddStudentButton;