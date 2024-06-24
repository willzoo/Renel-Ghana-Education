import React from 'react'
import './Dropdown.css'

function Dropdown(props) {
    let name = props.info[0][0];
    let id = props.info[0][1];

    let editValue = props.editValue || "";

    return (
        <section className="modal-text-input">
            <select title={name} id={id} name={id} defaultValue={editValue} required>
                <option className="modal-dropdown-default" value="" disabled selected> {name} </option>
                {props.info.slice(1).map((group, index) => (
                    <optgroup key={index} label={group[0]}>
                        {group.slice(1).map((option, optionIndex) => (
                            <option key={optionIndex}>{option}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </section>
    );
}

export default Dropdown;