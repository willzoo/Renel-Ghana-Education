import React from 'react'
import './Buttons.css'

function Submit(props) {
    return (
        <div className="modal-button">
            <input type="submit" value={props.value} />
        </div>
    );
}

export default Submit;