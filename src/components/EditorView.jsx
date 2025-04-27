import React, { useState } from 'react';
import VirtualKeyboard from '../components/VirtualKeyboard';
import TextFormatControls from '../components/TextFormatControls';//should be in erea
import TextEditorArea from '../components/TextEditorArea';
import FileManager from '../components/FileManager';
import '../styles/EditorView.css';

const EditorView = ({ username }) => {
  const fileManager = FileManager({ username });

  const [openFiles, setOpenFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const [language, setLanguage] = useState('EN');
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [prevLanguageBeforeEmoji, setPrevLanguageBeforeEmoji] = useState('EN');


  // const [text, setText] = useState('');
  // const [cursorPosition, setCursorPosition] = useState(0);
  // const [fileName, setFileName] = useState('');
  // const [language, setLanguage] = useState('EN'); // EN or HE
  // const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  // const [prevLanguageBeforeEmoji, setPrevLanguageBeforeEmoji] = useState('EN');
  
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'HE' : 'EN'));
  };

  const toggleEmojiKeyboard = () => {
    if (showEmojiKeyboard) {
      setShowEmojiKeyboard(false);
      setLanguage(prevLanguageBeforeEmoji);
    } else {
      setPrevLanguageBeforeEmoji(language);
      setShowEmojiKeyboard(true);
    }
  };

  const renderVirtualKeyboard = (insertCharAtCursor) => (
    <VirtualKeyboard
      onCharClick={(char) => insertCharAtCursor(char)}
      language={language}
      showEmojis={showEmojiKeyboard}
    />
  );

  const handleOpenFile = (fileName) => {
    const loaded = fileManager.loadFile(fileName);
    if (loaded) {
      const fileId = Date.now().toString();
      setOpenFiles(prev => [...prev, {
        id: fileId,
        name: fileName,
        text: loaded.text,
        textFormat: loaded.format
      }]);
      setActiveFileId(fileId);
    }
  };

  const handleSaveFile = (fileId) => {
    const file = openFiles.find(f => f.id === fileId);
    if (file) {
      fileManager.saveFile(file.name, file.text, file.textFormat);
    }
  };

  const handleCloseFile = (fileId) => {
    setOpenFiles(prev => prev.filter(file => file.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(openFiles.length ? openFiles[0]?.id : null);
    }
  };

  const handleUpdateFileContent = (fileId, newText) => {
    setOpenFiles(prev =>
      prev.map(file =>
        file.id === fileId ? { ...file, text: newText } : file
      )
    );
  };

  const handleUpdateFileFormat = (fileId, newFormat) => {
    setOpenFiles(prev =>
      prev.map(file =>
        file.id === fileId ? { ...file, textFormat: newFormat } : file
      )
    );
  };

  const activeFile = openFiles.find(file => file.id === activeFileId);

  // // Text formatting states
  // const [textFormat, setTextFormat] = useState({
  //   font: 'Arial',
  //   size: '16px',
  //   color: 'black'
  // });

  // const handleFormatChange = (formatType, value) => {
  //   setTextFormat(prev => ({
  //     ...prev,
  //     [formatType]: value
  //   }));
  // };

  // const handleSave = () => {
  //   if (!fileName) {
  //     alert('Please enter a file name.');
  //     return;
  //   }
  
  //   const users = JSON.parse(localStorage.getItem('users')) || {};
  //   if (!users[username]) {
  //     users[username] = { files: {} };
  //   }
  //   if (!users[username].files) {
  //     users[username].files = {};
  //   }

  //   users[username].files[fileName] = {
  //     content: text,
  //     format: textFormat
  //   };

  //   localStorage.setItem('users', JSON.stringify(users));
  //   alert('Saved!');
  // };
  

  // const handleLoad = () => {
  //   if (!fileName) {
  //     alert('Please enter a file name.');
  //     return;
  //   }
  
  //   const users = JSON.parse(localStorage.getItem('users')) || {};
  //   const saved = users[username]?.files?.[fileName];
    
  //   if (saved !== undefined) {
  //     // Old format - just text content
  //     if (typeof saved !== 'object' || saved === null || !saved.content) { 
  //       alert('File is in an unsupported format.');
  //       return;
  //     }
 
  //     setText(saved.content);

  //     if (saved.format) {
  //       setTextFormat(saved.format);
  //    }
  //   } else {
  //     alert('File not found.');
  //   }
  // };

  return (
    <div className="edit-text-page">
    //   {/* אזור שליטה בפורמט */}
    //   <div className="format-controls-container">
    //     <TextFormatControls />
    //   </div>

    //   {/* מנהל קבצים */}
    //   {/* <div className="file-manager-container">
    //     <FileManager username={username} />
    //   </div> */}

    //   {/* אזור עריכת טקסטים */}
    //   <div className="text-area-container">
    //     <TextEditorArea renderVirtualKeyboard={renderVirtualKeyboard} />
    //   </div>

      {/* מקלדת וירטואלית וכפתורי שפה */}
      <div className="keyboard-area">
        <div className="toolbar">
          <button onClick={toggleEmojiKeyboard}>
            {showEmojiKeyboard ? '⌨️ חזרה' : '😊 אימוג׳ים'}
          </button>

          <button
            onClick={toggleLanguage}
            disabled={showEmojiKeyboard}
            className={`language-toggle ${showEmojiKeyboard ? 'disabled' : ''}`}
          >
            {language === 'EN' ? 'עברית' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorView;

