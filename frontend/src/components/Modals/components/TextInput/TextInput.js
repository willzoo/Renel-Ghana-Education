import React from 'react'
import './TextInput.css'

function TextInput(props) {
    return (
        <section className="modal-text-input">
            <p className="label">{props.info.title}</p>

            <input
                placeholder={props.info.placeholder}
                title={props.info.title}
                type="text"
                id={props.info.id}
                required
                defaultValue={props.info.defaultValue} />

        </section>
    );
}

export default TextInput;