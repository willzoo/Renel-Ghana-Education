import React, { useState } from 'react';
import './Radio_Button.css';

const Radio_Button = ({ info }) => {
  const [selectedValue, setSelectedValue] = useState(info);

  const handleChange = (event) => {
    const value = event.target.value === 'yes';
    setSelectedValue(value);

    // Send the updated status to the backend
    sendDisabilityStatusToBackend(value);
  };

  const sendDisabilityStatusToBackend = (isDisabled) => {
    // Implement the function to send data to the backend
    fetch('/api/update-disability-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ disabilityStatus: isDisabled }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="modal-text-input">
      <p>Does the student have a disability?</p>
      <label>
        <input
          type="radio"
          name="disability"
          value="yes"
          checked={selectedValue === true}
          onChange={handleChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="disability"
          value="no"
          checked={selectedValue === false}
          onChange={handleChange}
        />
        No
      </label>
    </div>
  );
};

export default Radio_Button;
