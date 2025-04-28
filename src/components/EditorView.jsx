import React, { useState, useEffect } from 'react';
import VirtualKeyboard from '../components/VirtualKeyboard';
import TextEditorArea from '../components/TextEditorArea';
import Sidebar from '../components/Sidebar';
import '../styles/EditorView.css';
import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();



const EditorView = ({ username }) => {
  const [openEditors, setOpenEditors] = useState([
    {
      id: 'new-text',
      name: 'New Text',
      text: '',
      cursorPosition: 0,
      selectionStart: 0,
      selectionEnd: 0,
      textFormat: {
        font: 'Arial',
        size: '16px',
        color: 'black',
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      }
    }
  ]);
  

  const [language, setLanguage] = useState('EN');
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [focusedEditorId, setFocusedEditorId] = useState('new-text'); // איפה להתמקד
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const files = loadUserFiles(username);
    setUserFiles(files);
  }, [username]);


  

  const insertCharToFocusedEditor = (char) => {
    let newCursorPos = 0; // ✨ תגדירי פה למעלה
  
    setOpenEditors(prevEditors =>
      prevEditors.map(editor => {
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
            cursorPosition: newCursorPos,
            selectionStart: newCursorPos,
            selectionEnd: newCursorPos
          };
        }
        return editor;
      })
    );
  
    // ✅ ועכשיו newCursorPos באמת קיים פה
    setTimeout(() => {
      handleCursorChange(focusedEditorId, newCursorPos, newCursorPos);
    }, 0);
  };
  
  
  

  const handleUpdateText = (fileId, newText) => {
    setOpenEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === fileId ? { ...editor, text: newText } : editor
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
  

  const handleEditFile = (fileId) => {
    // כאן את אמורה לטעון מקובץ, אני מניח שאת מסודרת עם localStorage.
    // מדמה טעינה:
    const file = {
      id: fileId,
      name: fileId,
      text: 'This is content of ' + fileId,
      cursorPosition: 0,
      textFormat: {
        font: 'Arial',
        size: '16px',
        color: 'black',
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      }
    };

    if (!openEditors.some(e => e.id === fileId)) {
      setOpenEditors(prev => [...prev, file]);
    }
  };


  const loadUserFiles = (username) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userFiles = users[username]?.files || {};
  
    return Object.keys(userFiles).map(fileName => ({
      id: fileName,
      name: fileName
    }));
  };
  

  return (
    <div className="editor-page">
      <div className="editor-container">
        
      <Sidebar
        username={username}
        openFiles={userFiles}
        onEditFile={handleEditFile}
      />


        <div className="editor-main">
          {openEditors.map(editor => (
            <TextEditorArea
            key={editor.id}
            id={editor.id}
            text={editor.text}
            setText={(newText) => handleUpdateText(editor.id, newText)}
            cursorPosition={[editor.selectionStart, editor.selectionEnd]} // 🛠️ מעבירה זוג!
            setCursorPosition={(pos) => handleCursorChange(editor.id, pos[0], pos[1])}
            textFormat={editor.textFormat}
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
