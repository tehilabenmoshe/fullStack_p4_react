import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/textlogo.png'; // ✅ image import

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="navbar">
       <div className="navbar-left">
        <img src={logo} alt="Textify logo" className="logo-img" />
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
