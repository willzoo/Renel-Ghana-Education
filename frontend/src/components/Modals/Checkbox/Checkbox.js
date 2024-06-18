import React from 'react'

function Checkbox(props) {
    return (
        <section className="modal-text-input">
            <label className="modal-text-label" htmlFor={props.id}>{props.title} &ensp;</label>
            <input 
            className="modal-text-input" 
            type="checkbox" id={props.id} 
            name={props.name} 
            checked={props.defaultValue} />
        </section>
    );
}
export default Checkbox;