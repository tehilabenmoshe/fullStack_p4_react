// src/components/FileManager.jsx
const FileManager = ({ username }) => {
  
    const saveFile = (fileName, text, textFormat) => {
      if (!fileName) {
        alert('Please enter a file name.');
        return;
      }
  
      const users = JSON.parse(localStorage.getItem('users')) || {};
  
      if (!users[username]) {
        users[username] = { files: {} };
      }
      if (!users[username].files) {
        users[username].files = {};
      }
  
      users[username].files[fileName] = {
        content: text,
        format: textFormat
      };
  
      localStorage.setItem('users', JSON.stringify(users));
      alert('File saved successfully!');
    };
  
    const loadFile = (fileName) => {
      if (!fileName) {
        alert('Please enter a file name.');
        return null;
      }
  
      const users = JSON.parse(localStorage.getItem('users')) || {};
      const saved = users[username]?.files?.[fileName];
  
      if (saved !== undefined) {
        if (typeof saved !== 'object' || saved === null || !saved.content) {
          alert('File is in an unsupported format.');
          return null;
        }
        
        return {
          text: saved.content,
          format: saved.format || {
            font: 'Arial',
            size: '16px',
            color: 'black'
          }
        };
      } else {
        alert('File not found.');
        return null;
      }
    };
  
    const listFiles = () => {
      const users = JSON.parse(localStorage.getItem('users')) || {};
      const userFiles = users[username]?.files || {};
      return Object.keys(userFiles);
    };
  
    return {
      saveFile,
      loadFile,
      listFiles
    };
  };
  
  export default FileManager;
  

// // src/components/FileManager.jsx
// import React, { useState } from 'react';
// import FileTab from './FileTab';
// import FileSelector from './FileSelector'; // נטפל בו בהמשך

// const FileManager = ({ username }) => {
//   const [openFiles, setOpenFiles] = useState([]);
//   const [activeFileId, setActiveFileId] = useState(null);

//   const handleOpenFile = (fileData) => {
//     const fileId = fileData.id || Date.now().toString();
//     if (!openFiles.some(file => file.id === fileId)) {
//       setOpenFiles(prev => [...prev, { ...fileData, id: fileId }]);
//     }
//     setActiveFileId(fileId);
//   };

//   const handleCloseFile = (fileId) => {
//     setOpenFiles(prev => prev.filter(file => file.id !== fileId));
//     if (activeFileId === fileId) {
//       setActiveFileId(openFiles.length ? openFiles[0]?.id : null);
//     }
//   };

//   const handleRenameFile = (fileId, newName) => {
//     setOpenFiles(prev => prev.map(file =>
//       file.id === fileId ? { ...file, name: newName } : file
//     ));
//   };

//   return (
//     <div className="file-manager">
//       <div className="file-tabs">
//         {openFiles.map(file => (
//           <FileTab
//             key={file.id}
//             fileName={file.name}
//             isActive={file.id === activeFileId}
//             onClick={() => setActiveFileId(file.id)}
//             onClose={() => handleCloseFile(file.id)}
//             onRename={(newName) => handleRenameFile(file.id, newName)}
//           />
//         ))}
//       </div>

//       <div className="file-selector">
//         <FileSelector username={username} onFileSelect={handleOpenFile} />
//       </div>
//     </div>
//   );
// };

// export default FileManager;
