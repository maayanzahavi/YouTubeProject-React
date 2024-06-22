// Option is a option in the navbar
import React from 'react';
import './Option.css';

const Option = ({ icon, text, action }) => {
  return (
    <div className="option" onClick={action}>
      <span className="option-icon">{icon}</span>
      <span className="option-text">{text}</span>
    </div>
  );
};

export default Option;
