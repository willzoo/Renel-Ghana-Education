import React from 'react'
import './TextInput.css'

function TextInput(props) {
    let isRequired = props.info.required !== false; // sets isRequired as false ONLY when explicitly requested

    return (
        <section className="modal-text-input">
            <p className="label">{props.info.title}</p>

            <input
                placeholder={props.info.placeholder}
                title={props.info.title}
                type="text"
                id={props.info.id}
                required={isRequired}
                defaultValue={props.info.defaultValue} />

        </section>
    );
}

export default TextInput;