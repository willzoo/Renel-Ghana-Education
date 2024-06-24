import React, { useState } from 'react';
import './RadioButton.css';

function RadioButton(props) {
  // const [selectedValue, setSelectedValue] = useState(info);

  // const handleChange = (event) => {
  //   const value = event.target.value === 'yes';
  //   setSelectedValue(value);

  //   // Send the updated status to the backend
  //   sendDisabilityStatusToBackend(value);
  // };

  // const sendDisabilityStatusToBackend = (isDisabled) => {
  //   // Implement the function to send data to the backend
  //   fetch('/api/update-disability-status', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ disabilityStatus: isDisabled }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <section className="modal-text-input">
      <p>{props.info.title}</p>
        <input
          type="radio"
          name={props.info.id}
          id={`${props.info.id}-true`}
          value={true}
          // checked={selectedValue === true}
          // onChange={handleChange}
        />
        <label>Yes</label>
        <input
          type="radio"
          name={props.info.id}
          id={`${props.info.id}-false`}
          value={false}
          defaultChecked
          // checked={selectedValue === false}
          // onChange={handleChange}
        />
        <label>No</label>
      </section>
  );
};

export default RadioButton;
