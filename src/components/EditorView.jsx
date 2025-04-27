import React, { useState } from 'react';
import TextDisplay from '../components/TextDisplay';
import TextEditor from '../components/TextEditor';
import VirtualKeyboard from '../components/VirtualKeyboard';
import TextFormatControls from '../components/TextFormatControls';
import '../styles/EditorView.css';

const EditorView = ({ username }) => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('EN'); // EN or HE
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [prevLanguageBeforeEmoji, setPrevLanguageBeforeEmoji] = useState('EN');

  // Text formatting states
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

  const handleSave = () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
      users[username] = { files: {} };
    }
    if (!users[username].files) {
      users[username].files = {};
    }

    users[username].files[fileName] = {
      content: text,
      format: textFormat
    };

    localStorage.setItem('users', JSON.stringify(users));
    alert('Saved!');
  };
  

  const handleLoad = () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const saved = users[username]?.files?.[fileName];
    
    if (saved !== undefined) {
      // Old format - just text content
      if (typeof saved !== 'object' || saved === null || !saved.content) { 
        alert('File is in an unsupported format.');
        return;
      }
 
      setText(saved.content);

      if (saved.format) {
        setTextFormat(saved.format);
     }
    } else {
      alert('File not found.');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'HE' : 'EN'));
  };

  const toggleEmojiKeyboard = () => {
    if (showEmojiKeyboard) {
      setShowEmojiKeyboard(false);
      setLanguage(prevLanguageBeforeEmoji);
    } else {
      setPrevLanguageBeforeEmoji(language);
      setShowEmojiKeyboard(true);
    }
  };

  // const handleCharClick = (char) => {
  //   const updatedText = text.slice(0, cursorPosition) + char + text.slice(cursorPosition);
  //   setText(updatedText);
  //   setCursorPosition(cursorPosition + char.length);
  // };
  const renderVirtualKeyboard = (insertCharAtCursor) => (
    <VirtualKeyboard
      onCharClick={(char) => insertCharAtCursor(char)}
      language={language}
      showEmojis={showEmojiKeyboard}
    />
  );
  // const renderVirtualKeyboard = () => (
  //   <VirtualKeyboard
  //     onCharClick={insertCharAtCursor}
  //     language={language}
  //     showEmojis={showEmojiKeyboard}
  //   />
  // );
  
  return (
    <div className="edit-text-page">
      {/* Format controls area */}
      <div className="format-controls-container">
        <TextFormatControls 
          onFormatChange={handleFormatChange}
          currentFont={textFormat.font}
          currentSize={textFormat.size}
          currentColor={textFormat.color}
        />
      </div>

      {/* Text display and text area in one section */}
      <div className="text-area-container">
        <TextDisplay 
          text={text} 
          cursorPosition={cursorPosition}
          textFormat={textFormat}
        />
  
        <TextEditor
          text={text}
          setText={setText}
          cursorPosition={cursorPosition}
          setCursorPosition={setCursorPosition}
         textFormat={textFormat}
        >
         {renderVirtualKeyboard}
        </TextEditor>
      </div>
  
      {/* Controls and virtual keyboard section */}
      <div className="keyboard-area">
        <div className="toolbar">
          <button onClick={toggleEmojiKeyboard}>
            {showEmojiKeyboard ? '⌨️ חזרה' : '😊 אימוג׳ים'}
          </button>
  
          <button
            onClick={toggleLanguage}
            disabled={showEmojiKeyboard}
            className={`language-toggle ${showEmojiKeyboard ? 'disabled' : ''}`}
          >
            {language === 'EN' ? 'עברית' : 'English'}
          </button>
        </div>
  
        <div className="file-actions">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Open</button>
        </div>
      </div>
    </div>
  );
  
  
};

export default EditorView;