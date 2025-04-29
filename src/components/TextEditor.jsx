import React from 'react';

const TextEditor = ({ 
  text, 
  setText, 
  setCursorPosition, 
  textFormat
}) => {
  // Update the cursor position in text
  const handleCursorChange = (e) => {
    setCursorPosition([e.target.selectionStart, e.target.selectionEnd]);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setCursorPosition([e.target.selectionStart, e.target.selectionEnd]);
  };

  const textareaStyle = {
    fontFamily: textFormat.font,
    fontSize: textFormat.size,
    color: textFormat.color,
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box'
  };

  return (
    <div className="text-editor">
      <textarea
        value={text}
        onChange={handleInputChange}
        onClick={handleCursorChange}
        onKeyUp={handleCursorChange}
        placeholder="Type something here..."
        style={textareaStyle}
      ></textarea>
    </div>
  );
};

export default TextEditor;
