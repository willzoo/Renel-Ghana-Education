import React from 'react'

function Submit (props) {
    return (
        <div className="modal-submit">
            <input type="submit" value={props.value} />
        </div>
    );
}

export default Submit;