
import React from 'react';
import '../styles/main.css';

const TextEditor = ({ text, setText }) => {
  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="text-editor">
      <textarea
        value={text}
        onChange={handleInput}
        placeholder="Type something..."
      ></textarea>
    </div>
  );
};

export default TextEditor;