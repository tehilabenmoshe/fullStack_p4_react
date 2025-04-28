import React ,{ useState, useEffect } from 'react';
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
  handleFormatChange,
  onSave,
  fileName,
  onRenameFile
}) => {
  return (
    <div className="text-editors">
      {/* הצגת שם הקובץ + כפתור שמירה */}
      <div className="editor-header">
        <input
          type="text"
          value={fileName}
          onChange={(e) => onRenameFile(e.target.value)}
          placeholder="File name"
          className="file-name-input"
        />
        <button className="save-button" onClick={onSave}>
          Save
        </button>
      </div>
      
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
          onSave={onSave}
          fileName={fileName}
          onRenameFile={onRenameFile}
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
