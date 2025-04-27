// src/components/TextEditorArea.jsx
import React from 'react';
import TextEditor from './TextEditor';
import TextDisplay from './TextDisplay';
import TextFormatControls from './TextFormatControls';

const TextEditorArea = ({
  text,
  setText,
  cursorPosition,
  setCursorPosition,
  textFormat,
  handleFormatChange
}) => {
  return (
    <div className="text-editors">
      {/* שליטה על פורמט */}
      <TextFormatControls
        onFormatChange={handleFormatChange}
        currentFont={textFormat.font}
        currentSize={textFormat.size}
        currentColor={textFormat.color}
      />

      {/* תצוגת טקסט */}
      <TextDisplay 
        text={text}
        cursorPosition={cursorPosition}
        textFormat={textFormat}
      />

      {/* עורך טקסט */}
      <TextEditor 
        text={text}
        setText={setText}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        textFormat={textFormat}
      />
    </div>
  );
};

export default TextEditorArea;
