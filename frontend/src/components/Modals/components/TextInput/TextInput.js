import React from 'react'
import './TextInput.css'

function TextInput(props) {
    return (
        <section className="modal-text-input">
            <p className="label">{props.title}</p>

            <input 
            placeholder={props.placeholder} 
            title={props.title} 
            type="text" 
            id={props.id} 
            required 
            defaultValue={props.defaultValue} />

        </section>
    );
}

export default TextInput;