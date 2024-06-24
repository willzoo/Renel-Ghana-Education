import React from 'react'
import './Buttons.css'

function Delete(props) {
    return (
        <div className="modal-delete">
            <input type="button" value={props.value} onClick={props.onClick}/>
        </div>
    );
}

export default Delete;