import React from 'react'
import './Buttons.css'
import Loading from '../Loading/Loading';

function Submit(props) { // submit button
    return (
        <div className="modal-button">
            <input type="submit" value={props.value} /> {/* custom submit type with given value */}
        </div>
    );
}

export default Submit;