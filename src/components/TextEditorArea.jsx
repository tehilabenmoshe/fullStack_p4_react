import React, { useState } from 'react';
import TextEditor from './TextEditor';
import TextDisplay from './TextDisplay';
import TextFormatControls from './TextFormatControls';
import { FaSave, FaUndo, FaTrash } from 'react-icons/fa';
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
  onRenameFile,
  onClose,
  onDelete
}) => {

  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // פונקציה לשמור מצבים קודמים
  const saveToHistory = () => {
    setHistory(prev => {
      const newHistory = [...prev, { text, textFormat }];

      if (newHistory.length > 3) {
        newHistory.shift(); // שומר רק 3 אחרונים
      }

      return newHistory;
    });
  };

  // עוטף שינוי טקסט
  const handleTextChange = (newText) => {
    saveToHistory();
    setText(newText);
  };

  // עוטף שינוי פורמט
  const handleFormatChangeWithHistory = (field, value) => {
    saveToHistory();
    handleFormatChange(field, value);
  };

  // Undo
  const handleUndo = () => {
    if (history.length === 0) return;
  
    const lastState = history[history.length - 1];
  
    setHistory(prev => prev.slice(0, -1)); // קודם חותכים היסטוריה
  
    // ✅ ואז נעדכן טקסט ופורמט
    setText(lastState.text);
    handleFormatChange('font', lastState.textFormat.font);
    handleFormatChange('size', lastState.textFormat.size);
    handleFormatChange('color', lastState.textFormat.color);
  };
  
  return (
    <div className="editor-card">

      {/* כפתור סגירה חיצוני */}
      <button className="close-button-outside" onClick={onClose}>x</button>

      {/* גוף עיקרי */}
      <div className="editor-body">
        <div className="editor-main-content">

          {/* תצוגת טקסט */}
          <TextDisplay 
            text={text}
            cursorPosition={cursorPosition}
            textFormat={textFormat}
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
          />

          {/* אזור עריכה מלא */}
          <div className="editor-with-controls">

            {/* שורה אחת - שם קובץ + כפתורים */}
            <div className="editor-top-buttons">
              <input
                type="text"
                value={fileName}
                onChange={(e) => onRenameFile(e.target.value)}
                placeholder="File name"
                className="file-name-input"
              />

              <button className="save-button" onClick={onSave}>
                <FaSave />
              </button>

              <button className="undo-button" onClick={handleUndo}>
                <FaUndo />
              </button>

              <button className="delete-button2" onClick={onDelete}>
                <FaTrash />
              </button>
            </div>

            {/* אזור טקסט */}
            <TextEditor 
              text={text}
              setText={handleTextChange} // ✅ שינוי
              cursorPosition={cursorPosition}
              setCursorPosition={setCursorPosition}
              textFormat={textFormat}
            />

            {/* אזור פורמט מתחת */}
            <TextFormatControls
              onFormatChange={handleFormatChangeWithHistory} // ✅ שינוי
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
