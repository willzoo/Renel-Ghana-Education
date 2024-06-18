import React from 'react'

function Checkbox(props) {
    return (
        <section className="modal-text-input">
            <label className="label" htmlFor={props.info.id}>{props.info.title} &ensp;</label>
            <input 
            className="modal-text-input" 
            type="checkbox" id={props.info.id} 
            name={props.info.name} 
            checked={props.info.defaultValue} />
        </section>
    );
}
export default Checkbox;