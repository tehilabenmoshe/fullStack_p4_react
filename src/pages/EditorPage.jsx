import React, { useState } from 'react';
import TextDisplay from '../components/TextDisplay';
import TextEditor from '../components/TextEditor';
import VirtualKeyboard from '../components/VirtualKeyboard';

const EditorPage = () => {
  const [text, setText] = useState('');

  const handleAddChar = (char) => {
    setText((prev) => prev + char);
  };

  return (
    <div>
      <TextDisplay text={text} />
      <TextEditor text={text} setText={setText} />
      <VirtualKeyboard onCharClick={handleAddChar} />
    </div>
  );
};

export default EditorPage;