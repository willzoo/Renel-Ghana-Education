import React from 'react'
import './Dropdown.css'

function Dropdown(props) { // construct dropdown menu from input data
    // get name and id from props
    let name = props.info[0][0]; 
    let id = props.info[0][1];

    let editValue = props.editValue || ""; // add editValue if it exists, otherwise do empty string

    return (
        <section className="modal-text-input"> {/* container for input */}
            <select title={name} id={id} name={id} defaultValue={editValue} required> {/* add dropdown itself with all values */}
                <option className="modal-dropdown-default" value="" disabled selected> {name} </option> {/* add dropdown title */}
                {props.info.slice(1).map((group, index) => ( // break remaining data into sections
                    <optgroup key={index} label={group[0]}> {/* create group for following options */}
                        {group.slice(1).map((option, optionIndex) => ( // add options for each grade within group
                            <option key={optionIndex}>{option}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </section>
    );
}

export default Dropdown;