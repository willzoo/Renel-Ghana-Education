import React from 'react'
import './Submit.css'

function Submit (props) {
    return (
        <div className="modal-submit">
            <input type="submit" value={props.value} />
        </div>
    );
}

export default Submit;