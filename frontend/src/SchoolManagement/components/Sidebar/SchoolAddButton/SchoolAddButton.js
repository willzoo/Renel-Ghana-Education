import React from "react"
import './SchoolAddButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OpenModal } from '../../../../utils/functions'

function SchoolAddButton() {
  return (
    <div className="create-school-button" onClick={() => OpenModal('school-add')}>
      <FontAwesomeIcon icon={faPlus} /> &nbsp; Create New School
    </div>
  );
}

export default SchoolAddButton;
