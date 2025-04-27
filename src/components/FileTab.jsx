// // src/components/FileTab.jsx
// import React, { useState } from 'react';

// const FileTab = ({ fileName, isActive, onClick, onClose, onRename }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState(fileName);

//   const handleDoubleClick = () => {
//     setIsEditing(true);
//     setEditName(fileName);
//   };

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (editName.trim()) {
//       onRename(editName.trim());
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div 
//       className={`file-tab ${isActive ? 'active' : ''}`}
//       onClick={onClick}
//     >
//       {isEditing ? (
//         <form onSubmit={handleNameSubmit} className="rename-form">
//           <input
//             type="text"
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//             onBlur={handleNameSubmit}
//             autoFocus
//             onClick={(e) => e.stopPropagation()}
//           />
//         </form>
//       ) : (
//         <div className="tab-name" onDoubleClick={handleDoubleClick}>
//           {fileName || 'Untitled'}
//         </div>
//       )}
//       <button 
//         className="close-tab" 
//         onClick={(e) => {
//           e.stopPropagation();
//           onClose();
//         }}
//       >
//         ✕
//       </button>
//     </div>
//   );
// };

// export default FileTab;