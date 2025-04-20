
import React, { useRef, useEffect } from 'react';
import '../styles/main.css';

const TextEditor = ({ text, setText, cursorPosition, setCursorPosition, children }) => {
  const textareaRef = useRef(null);

  const handleCursorChange = (e) => {
    const newPos = e.target.selectionStart;
    setCursorPosition(newPos);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };
  
  const insertCharAtCursor = (char) => {
    let updatedText;
    let newPos = cursorPosition;

    if (char === 'BACKSPACE') {
      // מחיקה של תו לפני הסמן
      if (cursorPosition > 0) {
        updatedText = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
        newPos = cursorPosition - 1;
      } else {
        return;
      }
    // הוספת תו במיקום הסמן
    } else {
      updatedText = text.slice(0, cursorPosition) + char + text.slice(cursorPosition);
      newPos = cursorPosition + char.length;
    }

    setText(updatedText);
    setCursorPosition(newPos);

    // עדכון ממשק המשתמש
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newPos;
        textareaRef.current.selectionEnd = newPos;
      }
    }, 0);
  };

  // אחרי כל שינוי – למקם את הסמן
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = cursorPosition;
      textareaRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, text]);

  return (
    <div className="text-editor">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInputChange}
        onClick={handleCursorChange}
        onKeyUp={handleCursorChange}
        placeholder="Type something here..."
      ></textarea>

      {/* העברת הפונקציה למקלדת */}
      {children(insertCharAtCursor)}
    </div>
  );
};

export default TextEditor;