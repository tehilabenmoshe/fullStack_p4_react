import React from 'react';
import TextEditor from './TextEditor';
import TextDisplay from './TextDisplay';
import TextFormatControls from './TextFormatControls';
import '../styles/TextEditorArea.css';

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
      {/* תצוגת טקסט למעלה */}
      <TextDisplay 
        text={text}
        cursorPosition={cursorPosition}
        textFormat={textFormat}
      />

      {/* אזור עריכה + פורמט יחד בשורה */}
      <div className="editor-with-controls">
        <TextEditor 
          text={text}
          setText={setText}
          cursorPosition={cursorPosition}
          setCursorPosition={setCursorPosition}
          textFormat={textFormat}
        />

        <TextFormatControls
          onFormatChange={handleFormatChange}
          currentFont={textFormat.font}
          currentSize={textFormat.size}
          currentColor={textFormat.color}
        />
      </div>
    </div>
  );
};

export default TextEditorArea;
