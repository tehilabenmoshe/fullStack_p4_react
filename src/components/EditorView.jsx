import React, { useState, useEffect, useRef } from 'react';
import VirtualKeyboard from '../components/VirtualKeyboard';
import TextEditorArea from '../components/TextEditorArea';
import Sidebar from '../components/Sidebar';
import FileManager from '../services/FileManager';
import '../styles/EditorView.css';
import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

const EditorView = ({ username }) => {
  const [openEditors, setOpenEditors] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  //const [language, setLanguage] = useState('EN');
  //const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [focusedEditorId, setFocusedEditorId] = useState(null);
  
  // טעינת הקבצים של המשתמש
  useEffect(() => {
    refreshUserFiles();
  }, [username]);

  const handleCreateNewFile = () => {
    const newFileId = `new-${Date.now()}`; // מזהה ייחודי
    const newEditor = {
      id: newFileId,
      name: '',  // השדה ריק, המשתמש יכניס שם
      text: '',
      textFormat: {
        font: 'Arial',
        size: '16px',
        color: 'black',
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      },
      selectionStart: 0,
      selectionEnd: 0
    };
  
    setOpenEditors(prev => [...prev, newEditor]);
    setFocusedEditorId(newFileId);
  };
  
  
//שולף קבצים קיימים מה-localStorage לפי משתמש
  const refreshUserFiles = () => {
    const files = FileManager.loadUserFiles(username);
    setUserFiles(files);
  };

  //פתיחת קובץ לעריכה
  const handleEditFile = (fileId) => {
    const existingEditor = openEditors.find(e => e.id === fileId);
    if (!existingEditor) {
      const file = FileManager.loadFileContent(username, fileId);
      if (file) {
        setOpenEditors(prev => [...prev, {
          id: file.id,
          name: file.name,
          text: file.text,
          textFormat: file.textFormat,
          selectionStart: 0,
          selectionEnd: 0
        }]);
      }
    }
    setFocusedEditorId(fileId);
  };


  //עדכון טקסט
  const handleUpdateText = (fileId, newText) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, text: newText } : editor
      )
    );
  };

  
  //עדכון טקסט או פורמט
  const handleUpdateFormat = (fileId, newFormat) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, textFormat: { ...editor.textFormat, ...newFormat } } : editor
      )
    );
  };
  
  //שינוי שם
  const handleRenameFile = (fileId, newName) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, name: newName } : editor
      )
    );
  };


  const handleCursorChange = (fileId, newSelectionStart, newSelectionEnd) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId
          ? { ...editor, selectionStart: newSelectionStart, selectionEnd: newSelectionEnd }
          : editor
      )
    );
    setFocusedEditorId(fileId);
  };


//שמירה לקובץ
  const handleSaveFile = (fileId) => {
    const editor = openEditors.find(e => e.id === fileId);
    if (editor) {
      FileManager.saveFileContent(username, fileId, {
        name: editor.name,
        text: editor.text,
        textFormat: editor.textFormat
      });
      refreshUserFiles();
      alert('File saved successfully!');
    }
  };



  const insertCharToFocusedEditor = (char) => {
    setOpenEditors(prevEditors => {
      let newCursorPos = 0;

      const newEditors = prevEditors.map(editor => {
        if (editor.id === focusedEditorId) {
          let updatedText;
          const { selectionStart, selectionEnd, text } = editor;

          if (char === 'BACKSPACE') {
            if (selectionStart !== selectionEnd) {
              updatedText = text.slice(0, selectionStart) + text.slice(selectionEnd);
              newCursorPos = selectionStart;
            } else if (selectionStart > 0) {
              const left = splitter.splitGraphemes(text.slice(0, selectionStart));
              const right = splitter.splitGraphemes(text.slice(selectionStart));
              left.pop();
              updatedText = left.join('') + right.join('');
              newCursorPos = left.join('').length;
            } else {
              updatedText = text;
              newCursorPos = 0;
            }
          } else {
            updatedText = text.slice(0, selectionStart) + char + text.slice(selectionEnd);
            newCursorPos = selectionStart + char.length;
          }

          return {
            ...editor,
            text: updatedText,
            selectionStart: newCursorPos,
            selectionEnd: newCursorPos
          };
        }
        return editor;
      });


      // עידכון קורסור אחרי שמירה
      setTimeout(() => {
        handleCursorChange(focusedEditorId, newCursorPos, newCursorPos);
      }, 0);

      return newEditors;
    });
  };


  //סגירה ומחיקה של עורך
  const handleCloseEditor = (editorId) => {
    setOpenEditors(prevEditors => prevEditors.filter(editor => editor.id !== editorId));
  };
  
  const handleDeleteFile = (fileId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
      // מוחק מהזיכרון (localStorage) דרך FileManager
      FileManager.deleteFile(username, fileId);
  
      setOpenEditors(prevEditors => prevEditors.filter(editor => editor.id !== fileId));

      refreshUserFiles();
    }
  };
  

  

  return (
    <div className="editor-page">
      <div className="editor-container">
        
      <Sidebar
        username={username}
        openFiles={userFiles}
        onEditFile={handleEditFile}
        onCreateFile={handleCreateNewFile}
      />
        <div className="editor-main">
          {openEditors.map(editor => (
            <TextEditorArea
                key={editor.id}
                id={editor.id}
                text={editor.text}
                setText={(newText) => handleUpdateText(editor.id, newText)}
                  cursorPosition={[editor.selectionStart, editor.selectionEnd]}
                  setCursorPosition={(pos) => handleCursorChange(editor.id, pos[0], pos[1])}
                  textFormat={editor.textFormat}
                  handleFormatChange={(field, value) => handleUpdateFormat(editor.id, { [field]: value })}
                  fileName={editor.name}
                  onRenameFile={(newName) => handleRenameFile(editor.id, newName)}
                  onSave={() => handleSaveFile(editor.id)}
                  onClose={() => handleCloseEditor(editor.id)}
                  onDelete={() => handleDeleteFile(editor.id)}
            />
          ))}

          <div className="keyboard-area">
            <VirtualKeyboard
              onCharClick={(char) => insertCharToFocusedEditor(char)}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorView;
