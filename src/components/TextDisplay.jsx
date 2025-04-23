import React from 'react';


const TextDisplay = ({ text }) => {
  return (
    <div className="text-display">
      <h2 className="text-title">Text Preview:</h2>
      <div className="text-output">{text}</div>
    </div>
  );
};

export default TextDisplay;