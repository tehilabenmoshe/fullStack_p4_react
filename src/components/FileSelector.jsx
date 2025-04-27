// // src/components/FileSelector.jsx
// import React, { useState } from 'react';

// const FileSelector = ({ 
//   availableFiles, 
//   onFileSelect, 
//   onClose, 
//   newFileName, 
//   setNewFileName,
//   onCreateNewFile 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredFiles = availableFiles.filter(file => 
//     file.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCreateNewFile = (e) => {
//     e.preventDefault();
//     onCreateNewFile();
//   };

//   return (
//     <div className="file-selector-modal">
//       <div className="file-selector-content">
//         <div className="file-selector-header">
//           <h3>Open File</h3>
//           <button onClick={onClose} className="close-selector">✕</button>
//         </div>

//         <div className="file-search">
//           <input
//             type="text"
//             placeholder="Search files..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="file-list">
//           {filteredFiles.length > 0 ? (
//             filteredFiles.map((file, index) => (
//               <div 
//                 key={index} 
//                 className="file-item"
//                 onClick={() => onFileSelect(file.name)}
//               >
//                 {file.name}
//               </div>
//             ))
//           ) : (
//             <div className="no-files-found">
//               {searchTerm ? "No files match your search." : "No files available."}
//             </div>
//           )}
//         </div>

//         <div className="create-new-file">
//           <h4>Create New File</h4>
//           <form onSubmit={handleCreateNewFile}>
//             <input
//               type="text"
//               placeholder="Enter new file name"
//               value={newFileName}
//               onChange={(e) => setNewFileName(e.target.value)}
//             />
//             <button type="submit">Create</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileSelector;