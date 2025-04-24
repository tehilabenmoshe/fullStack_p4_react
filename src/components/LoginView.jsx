import React, { useState } from 'react';
import '../styles/LoginView.css';

const LoginView  = ({ setUsername }) => {
  const [inputName, setInputName] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (inputName.trim() && users[inputName]) {
      localStorage.setItem('currentUser', inputName);
      setUsername(inputName);
    } else {
      alert('User not found. Please register first.');
    }
  };

  const handleRegister = () => {
    if (inputName.trim()) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[inputName]) {
        alert('Username already exists.');
      } else {
        users[inputName] = { files: {} };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', inputName);
        setUsername(inputName);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="hero-section">
        <h3 className="main-title">
          The rich <span className="highlight">text editor </span> for <br />
          every use case
        </h3>

        <button className="register-btn1">Register now!</button>
      </div>

      <div className="login-box">
        <h2>{isRegistered ? 'Login' : 'Register'}</h2>
        <input
          type="text"
          placeholder="username"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        
        {isRegistered ? (
          <button className="login-btn"onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )}
        <p>
          {isRegistered ? "Don't have an account?" : 'Already registered?'}{' '}
          <button className="link-btn" onClick={() => setIsRegistered(!isRegistered)}>
            {isRegistered ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
  
};

export default LoginView ;
