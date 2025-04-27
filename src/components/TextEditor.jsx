
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

  // const insertCharAtCursor = (char) => {
  //   if (char === '←') {
  //     if (cursorPosition > 0) {
  //       setCursorPosition(cursorPosition - 1);
  //     }
  //   } else if (char === '→') {
  //     if (cursorPosition < text.length) {
  //       setCursorPosition(cursorPosition + 1);
  //     }
  //   } else if (char === '⌫') {
  //     if (cursorPosition > 0) {
  //       const updatedText = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
  //       setText(updatedText);
  //       setCursorPosition(cursorPosition - 1);
  //     }
  //   } else if (char === '⏎') {
  //     const updatedText = text.slice(0, cursorPosition) + '\n' + text.slice(cursorPosition);
  //     setText(updatedText);
  //     setCursorPosition(cursorPosition + 1);
  //   } else {
  //     const updatedText = text.slice(0, cursorPosition) + char + text.slice(cursorPosition);
  //     setText(updatedText);
  //     setCursorPosition(cursorPosition + char.length);
  //   }
  // };
  

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