import React, { useRef, useEffect } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
const splitter = new GraphemeSplitter();

const TextEditor = ({ 
  text, 
  setText, 
  cursorPosition, 
  setCursorPosition, 
  textFormat
}) => {
  const textareaRef = useRef(null);

  const handleCursorChange = (e) => {
    setCursorPosition([e.target.selectionStart, e.target.selectionEnd]);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setCursorPosition([e.target.selectionStart, e.target.selectionEnd]);
  };

  // כל פעם שהטקסט או המיקום משתנה -> לסדר את הסמן
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = text; // הוספת עדכון ערך הטקסט ישירות
      textareaRef.current.selectionStart = cursorPosition[0];
      textareaRef.current.selectionEnd = cursorPosition[1];
    }
  }, [text, cursorPosition]);

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
