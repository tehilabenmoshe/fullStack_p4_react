import React from 'react';
import '../styles/main.css';

const TextDisplay = ({ text }) => {
  return (
    <div className="text-display">
      <h2>Text Preview:</h2>
      <div className="text-output">{text}</div>
    </div>
  );
};

export default TextDisplay;