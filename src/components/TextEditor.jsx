
import React, { useRef, useEffect } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
const splitter = new GraphemeSplitter();

const TextEditor = ({ 
  text, 
  setText, 
  cursorPosition, 
  setCursorPosition, 
  textFormat,
  children 
}) => {
  const textareaRef = useRef(null);

  const handleCursorChange = (e) => {
    const newPos = e.target.selectionStart;
    setCursorPosition(newPos);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };
  

  // אחרי כל שינוי – למקם את הסמן
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = cursorPosition;
      textareaRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, text]);

  const textareaStyle = {
    fontFamily: textFormat.font,
    fontSize: textFormat.size,
    color: textFormat.color
  };


  return (
    <div className="text-editor">
      <textarea
        ref={textareaRef}
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