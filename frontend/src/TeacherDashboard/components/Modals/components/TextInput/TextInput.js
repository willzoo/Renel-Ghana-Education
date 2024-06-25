import React from 'react'
import './TextInput.css'

function TextInput(props) { // generic text input
    let isRequired = props.info.required !== false; // sets isRequired as false ONLY when explicitly requested
    let editValue = props.editValue || "";

    return (
        <section className="modal-text-input">
            <p className="label">{props.info.title}</p> {/* add title */}

            <input // add input value
                placeholder={props.info.placeholder} // add placeholder text
                title={props.info.title}
                type="text"
                id={props.info.id}
                required={isRequired}
                defaultValue={editValue}
                /> 

        </section>
    );
}

export default TextInput;