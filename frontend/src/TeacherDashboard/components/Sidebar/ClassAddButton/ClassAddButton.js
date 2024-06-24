import React from "react"
import './ClassAddButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OpenModal } from '../../../../utils/functions'

function ClassAddButton() {
  return (
    <div className="create-class-button" onClick={() => OpenModal('class-add')}>
      <FontAwesomeIcon icon={faPlus} /> &nbsp; Create New Class
    </div>
  );
}

export default ClassAddButton;
