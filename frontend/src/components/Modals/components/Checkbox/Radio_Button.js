import React from 'react';

const Radio_Button = ({ info }) => {
  return (
    <div className="modal-text-input">
      <input type="radio" checked={info} />
    </div>
  );
};

export default Radio_Button;
