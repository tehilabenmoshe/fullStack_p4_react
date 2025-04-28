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
  handleFormatChange,
  onSave,
  fileName,
  onRenameFile
}) => {
  return (
    <div className="editor-card">

            {/* כפתור סגירה חיצוני */}
      <button className="close-button-outside">❌</button>
      
      {/* גוף עיקרי */}
      <div className="editor-body">
        <div className="editor-main-content">

          {/* הצגת טקסט בצד אחד */}
          <TextDisplay 
            text={text}
            cursorPosition={cursorPosition}
            textFormat={textFormat}
          />

          {/* אזור עריכה מלא */}
          <div className="editor-with-controls">

            {/* ✅ שורה אחת - שם קובץ + כפתורים */}
            <div className="editor-top-buttons">
              <input
                type="text"
                value={fileName}
                onChange={(e) => onRenameFile(e.target.value)}
                placeholder="File name"
                className="file-name-input"
              />

              <button className="save-button" onClick={onSave}>Save</button>
              <button className="undo-button">↩️</button>
              <button className="delete-button2">🗑️</button>
            </div>

            {/* אזור טקסט */}
            <TextEditor 
              text={text}
              setText={setText}
              cursorPosition={cursorPosition}
              setCursorPosition={setCursorPosition}
              textFormat={textFormat}
            />

            {/* אזור פורמט מתחת */}
            <TextFormatControls
              onFormatChange={handleFormatChange}
              currentFont={textFormat.font}
              currentSize={textFormat.size}
              currentColor={textFormat.color}
            />
            
          </div>

        </div>
      </div>

    </div>
  );
};

export default TextEditorArea;
