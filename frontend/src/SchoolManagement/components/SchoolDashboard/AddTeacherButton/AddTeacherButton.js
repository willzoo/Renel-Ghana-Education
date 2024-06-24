import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import './AddTeacherButton.css'
import { OpenModal } from '../../../../utils/functions';
import AdminContext from '../../../../AdminContext';

function AddTeacherButton(props) {
  const {selectedSchool, setSelectedSchool} = useContext(AdminContext).selectedSchool;

  const handleClick = () => {
    if (selectedSchool) {
      OpenModal(`${props.info.id}-school`);
    }
    else {
      alert("Please select a school first.");
    }
  }


  return (
    <div className="add-teacher-button" onClick={handleClick}>
      <div className="icon">
        <FontAwesomeIcon icon={props.info.icon} />
      </div>
      <p className="text">{props.info.text}</p>
    </div>
  );
}

export default AddTeacherButton;