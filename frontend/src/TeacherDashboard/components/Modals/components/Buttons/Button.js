import React from 'react'
import './Buttons.css'

function Button(props) { // generic button
    return (
        <div className="modal-button">
            <input type="button" value={props.value} /> {/* add new button with value */}
        </div>
    );
}

export default Button;