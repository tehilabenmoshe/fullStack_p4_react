import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="logo">✈️ Textify</span>
      </div>
      {username && (
        <div className="navbar-right">
          <span className="username">Hi, {username}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
