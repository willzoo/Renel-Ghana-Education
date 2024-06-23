import React from 'react'
import './Buttons.css'

function Button(props) {
    return (
        <div className="modal-button">
            <input type="button" value={props.value} />
        </div>
    );
}

export default Button;