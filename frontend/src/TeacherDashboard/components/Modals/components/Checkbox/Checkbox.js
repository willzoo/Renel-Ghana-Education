import React from 'react'

function Checkbox(props) { // unused checkbox component
    return (
        <section className="modal-text-input">
            <label className="label" htmlFor={props.info.id}>{props.info.title} &ensp;</label> {/* add new label to checkbox */}
            <input
                className="modal-text-input"
                type="checkbox" id={props.info.id}
                name={props.info.name}
                checked={props.info.defaultValue} /> {/* add new checkbox */}
        </section>
    );
}
export default Checkbox;