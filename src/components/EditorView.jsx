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
  const [language, setLanguage] = useState('EN');
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [focusedEditorId, setFocusedEditorId] = useState(null);
  
  // טעינת הקבצים של המשתמש
  useEffect(() => {
    refreshUserFiles();
  }, [username]);

  const handleCreateNewFile = () => {
    const fileName = prompt('Enter new file name:');
    if (fileName) {
      try {
        FileManager.createNewFile(username, fileName);
        refreshUserFiles();
        handleEditFile(fileName); // פותח לפי השם
      } catch (error) {
        alert(error.message);
      }
    }
  };
  

  const refreshUserFiles = () => {
    const files = FileManager.loadUserFiles(username);
    setUserFiles(files);
  };

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

  const handleUpdateText = (fileId, newText) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, text: newText } : editor
      )
    );
  };

  const handleUpdateFormat = (fileId, newFormat) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, textFormat: { ...editor.textFormat, ...newFormat } } : editor
      )
    );
  };

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

  const handleUpdateEditor = (fileId, updates) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, ...updates } : editor
      )
    );
  };

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
              handleFormatChange={(newFormat) => handleUpdateFormat(editor.id, newFormat)}
              fileName={editor.name}
              onRenameFile={(newName) => handleRenameFile(editor.id, newName)}
              onSave={() => handleSaveFile(editor.id)}
            />
          ))}

          <div className="keyboard-area">
            <VirtualKeyboard
              onCharClick={(char) => insertCharToFocusedEditor(char)}
              language={language}
              showEmojis={showEmojiKeyboard}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorView;
