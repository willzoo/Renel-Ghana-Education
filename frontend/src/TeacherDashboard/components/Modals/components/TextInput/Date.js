import React from 'react'
import './TextInput.css'

function Date(props) { // custom text input for date value, autoformat date
    let isRequired = props.info.required !== false; // sets isRequired as false ONLY when explicitly requested
    let editValue = props.editValue || "";

    return (
        <section className="modal-text-input">
            <p className="label">{props.info.title}</p> {/* add label for text input */}

            <input
                placeholder={props.info.placeholder} // add placeholder text
                title={props.info.title}
                type="text"
                id={props.info.id}
                required={isRequired}
                defaultValue={editValue}
                maxLength={10} // Set the maximum length to 10 characters

                onKeyDown={e => { // when key is pressed
                    const keyCode = e.which || e.keyCode; // get keycode
                    let inputValue = e.target.value; // get input value
                    if (keyCode < 48 || keyCode > 57) { // if key is not a digit
                        e.preventDefault();
                    }
                    if (keyCode === 8) { // if keycode is backspace
                        // e.preventDefault();
                        if (inputValue[inputValue.length - 1] === '/') {
                            inputValue = inputValue.slice(0, -2); // if last digit is a slash, remove last two characters
                        }
                        else {
                            inputValue = inputValue.slice(0, -1); // if last digit is not a slash, only remove last character
                        }
                    }
                    e.target.value = inputValue; // update text value
                }}

                onChange={e => { // used for adding text
                    let inputValue = e.target.value;

                    if (inputValue.length === 2 || inputValue.length === 5) { // if input is at certain lengths for date format
                        if (inputValue[inputValue.length - 1] !== '/') { // if last character is not a slash
                            inputValue += '/'; // add a slash
                          }
                      e.target.value = inputValue;
                    }
                }}
                />

        </section>
    );
}

export default Date;