import React, { useState } from 'react';
import TextDisplay from '../components/TextDisplay';
import TextEditor from '../components/TextEditor';
import VirtualKeyboard from '../components/VirtualKeyboard';
import '../styles/main.css';

const EditorPage = () => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  
    return (
      <div>
        <TextDisplay text={text} cursorPosition={cursorPosition}/>
        
        <TextEditor text={text} 
        setText={setText}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        >
          {(handleCharClick) => (
            <VirtualKeyboard onCharClick={handleCharClick} />
          )}
        </TextEditor>
      </div>
    );
  };


export default EditorPage;