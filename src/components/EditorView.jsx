import React, { useState } from 'react';
import VirtualKeyboard from '../components/VirtualKeyboard';
import TextEditorArea from '../components/TextEditorArea';
import '../styles/EditorView.css';

const EditorView = ({ username }) => {

  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [language, setLanguage] = useState('EN');
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  
  const [textFormat, setTextFormat] = useState({
    font: 'Arial',
    size: '16px',
    color: 'black'
  });

  const handleFormatChange = (formatType, value) => {
    setTextFormat(prev => ({
      ...prev,
      [formatType]: value
    }));
  };

  const insertCharAtCursor = (char) => {
    if (char === 'BACKSPACE') {
      if (cursorPosition === 0) return;
      const before = text.slice(0, cursorPosition - 1);
      const after = text.slice(cursorPosition);
      setText(before + after);
      setCursorPosition(prev => prev - 1);
    } else {
      const before = text.slice(0, cursorPosition);
      const after = text.slice(cursorPosition);
      setText(before + char + after);
      setCursorPosition(prev => prev + 1);
    }
  };

  return (
    <div className="edit-text-page">
      
      <div className="text-area-container">
        <TextEditorArea
          text={text}
          setText={setText}
          cursorPosition={cursorPosition}
          setCursorPosition={setCursorPosition}
          textFormat={textFormat}
          handleFormatChange={handleFormatChange}
        />
      </div>

      <div className="keyboard-area">
        <VirtualKeyboard
          onCharClick={insertCharAtCursor}
          language={language}
          showEmojis={showEmojiKeyboard}
        />
      </div>
      
    </div>
  );
};

export default EditorView;
