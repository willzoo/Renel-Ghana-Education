import React from 'react'
import './Buttons.css'

function Submit(props) { // submit button
    return (
        <div className="modal-button">
            <input type="submit" value={props.value} /> {/* custom submit type with given value */}
        </div>
    );
}

export default Submit;