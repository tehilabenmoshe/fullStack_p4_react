
import React, { useRef, useEffect } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
const splitter = new GraphemeSplitter();

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
      if (cursorPosition > 0) {
      // חשבי את המיקום ב־graphemes
      const leftPart = splitter.splitGraphemes(text.slice(0, cursorPosition));
      const rightPart = splitter.splitGraphemes(text.slice(cursorPosition));

      leftPart.pop(); // מוחק תו שלם (גם אימוג'י)

      updatedText = leftPart.join('') + rightPart.join('');
      newPos = leftPart.join('').length;
      } else {
        return;
      }
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
      {children}
    </div>
  );
};

export default TextEditor;