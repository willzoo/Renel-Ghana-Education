import React from 'react'
import './TextInput.css'

function Date(props) {
    let isRequired = props.info.required !== false; // sets isRequired as false ONLY when explicitly requested
    let editValue = props.editValue || "";

    return (
        <section className="modal-text-input">
            <p className="label">{props.info.title}</p>

            <input
                placeholder={props.info.placeholder}
                title={props.info.title}
                type="text"
                id={props.info.id}
                required={isRequired}
                defaultValue={editValue}
                maxLength={10} // Set the maximum length to 10 characters

                onKeyDown={e => {
                    const keyCode = e.which || e.keyCode;
                    let inputValue = e.target.value;
                    if (keyCode < 48 || keyCode > 57) {
                        e.preventDefault();
                    }
                    if (keyCode === 8) {
                        // e.preventDefault();
                        if (inputValue[inputValue.length - 1] === '/') {
                            inputValue = inputValue.slice(0, -2);
                        }
                        else {
                            inputValue = inputValue.slice(0, -1);
                        }
                    }
                    e.target.value = inputValue;
                }}

                onChange={e => {
                    let inputValue = e.target.value;

                    if (inputValue.length === 2 || inputValue.length === 5) {
                        if (inputValue[inputValue.length - 1] !== '/') {
                            inputValue += '/';
                          }
                      e.target.value = inputValue;
                    }
                }}
                />

        </section>
    );
}

export default Date;