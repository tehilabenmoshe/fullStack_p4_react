// src/components/Sidebar.jsx
import React from 'react';
import '../styles/Sidebar.css'; // נוסיף סטיילים

const Sidebar = ({ username, openFiles, onEditFile }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">{username.charAt(0)}</div> 
          <div className="user-name">{username}</div>
        </div>
      </div>

      <div className="sidebar-files">
        <span className="header">My texts list</span>  
        
        {openFiles.map(file => (
            <div key={file.id} className="file-item">
                <span className="file-name">{file.name}</span>
                <button className="edit-button" onClick={() => onEditFile(file.id)}>
                    Edit
                </button>
            </div>
        ))}

        <div className="add-file-button-container">
            <button className="add-file-button" onClick={() => onEditFile()}>
              + 
            </button>
        </div>


      </div>

    </div>
  );
};

export default Sidebar;
