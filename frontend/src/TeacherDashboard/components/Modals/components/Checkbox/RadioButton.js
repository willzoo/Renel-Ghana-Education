import React, { useState } from 'react';
import './RadioButton.css';

function RadioButton(props) { // radio buttons, only one button can be selected

  return (
    <section className="modal-text-input"> {/* add container for buttons */}
      <p>{props.info.title}</p> {/* add question title */}
        <input
          type="radio"
          name={props.info.id}
          id={`${props.info.id}-true`}
          value={true}
        /> {/* add first value */}
        <label>Yes</label> {/* add first value label */}
        <input
          type="radio"
          name={props.info.id}
          id={`${props.info.id}-false`}
          value={false}
          defaultChecked
        /> {/* add second value */}
        <label>No</label> {/* add second value label */}
      </section>
  );
};

export default RadioButton;
