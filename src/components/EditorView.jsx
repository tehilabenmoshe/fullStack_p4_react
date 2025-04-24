import React, { useState } from 'react';
import TextDisplay from '../components/TextDisplay';
import TextEditor from '../components/TextEditor';
import VirtualKeyboard from '../components/VirtualKeyboard';
import '../styles/EditorView.css';


const EditorView = ({ username }) => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('EN'); // EN or HE
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [prevLanguageBeforeEmoji, setPrevLanguageBeforeEmoji] = useState('EN');

  const handleSave = () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users[username].files) {
      users[username].files = {};
    }
  
    users[username].files[fileName] = text;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Saved!');
  };
  

  const handleLoad = () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users'));
    const saved = users[username]?.files?.[fileName];
    if (saved !== undefined) {
      setText(saved);
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
  
  
  return (
    <div className="edit-text-page">
  
      {/* Text display and text area in one section */}
      <div className="text-area-container">
        <TextDisplay 
          text={text} 
          cursorPosition={cursorPosition}
        />
  
        <TextEditor
          text={text}
          setText={setText}
          cursorPosition={cursorPosition}
          setCursorPosition={setCursorPosition}
        />
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
  
        <VirtualKeyboard
          onCharClick={(char) => {
            const updatedText = text.slice(0, cursorPosition) + char + text.slice(cursorPosition);
            setText(updatedText);
            setCursorPosition(cursorPosition + char.length);
          }}
          language={language}
          showEmojis={showEmojiKeyboard}
        />
  
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