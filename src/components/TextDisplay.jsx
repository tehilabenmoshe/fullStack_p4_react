import React from 'react';

const TextDisplay = ({ text, textFormat }) => {
  const displayStyle = {
    fontFamily: textFormat.font,
    fontSize: textFormat.size,
    color: textFormat.color
  };

  return (
    <div className="text-display">
      <h2 className="text-title">Text Preview:</h2>
      <div className="text-output" style={displayStyle}>
        {text}
      </div>
    </div>
  );
};

export default TextDisplay;