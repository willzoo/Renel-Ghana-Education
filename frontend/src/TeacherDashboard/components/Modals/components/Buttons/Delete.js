import React from 'react'
import './Buttons.css'

function Delete(props) { // delete button
    return (
        <div className="modal-delete">
            <input type="button" value={props.value} onClick={props.onClick}/> {/* delete button with special functionality */}
        </div>
    );
}

export default Delete;