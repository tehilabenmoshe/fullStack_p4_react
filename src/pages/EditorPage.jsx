import React, { useState } from 'react';
import TextDisplay from '../components/TextDisplay';
import TextEditor from '../components/TextEditor';
import VirtualKeyboard from '../components/VirtualKeyboard';

import '../styles/main.css';


const EditorPage = () => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleSave = () => {
    if (fileName) {
      localStorage.setItem(fileName, text);
      alert('Saved!');
    } else {
      alert('Please enter a file name.');
    }
  };

  const handleLoad = () => {
    if (fileName) {
      const saved = localStorage.getItem(fileName);
      if (saved !== null) {
        setText(saved);
      } else {
        alert('File not found.');
      }
    } else {
      alert('Please enter a file name.');
    }
  };
  
    return (
      <div>
        <TextDisplay text={text} cursorPosition={cursorPosition}/>
        
        <TextEditor
        text={text}
        setText={setText}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
      >
        {(insertCharAtCursor) => (
          <>
            <VirtualKeyboard onCharClick={insertCharAtCursor} />
            <div className="file-actions">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
              <button onClick={() => handleSave()}>Save</button>
              <button onClick={() => handleLoad()}>Open</button>
            </div>
          </>
        )}
      </TextEditor>
      </div>
    );
  };


export default EditorPage;