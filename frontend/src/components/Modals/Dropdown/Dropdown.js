import React from 'react'

function Dropdown (props) {
    let name = props.data[0][0];
    let id = props.data[0][1];

    return (
        <section className="modal-text-input">
            <select title={name} id={id} name={id} required>
                <option className="modal-dropdown-default" value="" disabled selected> {name} </option>
                {props.data.slice(1).map((group, index) => (
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