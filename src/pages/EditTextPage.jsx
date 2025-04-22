import React, { useState } from 'react';
import TextDisplay from '../components/TextDisplay';
import TextEditor from '../components/TextEditor';
import VirtualKeyboard from '../components/VirtualKeyboard';
import '../styles/EditTextPage.css';


const EditTextPage = ({ username }) => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [fileName, setFileName] = useState('');

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


export default EditTextPage;