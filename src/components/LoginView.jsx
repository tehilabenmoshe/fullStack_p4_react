import React, { useState } from 'react';
import '../styles/LoginView.css';

const LoginView  = ({ setUsername }) => {
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (inputName.trim() && users[inputName] && users[inputName].password === inputPassword) {
      localStorage.setItem('currentUser', inputName);
      setUsername(inputName);
    } else {
      alert('User not found. Please register first.');
    }
  };

  const handleRegister = () => {
    if (inputName.trim()&& inputPassword.trim()) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[inputName]) {
        alert('Username already exists.');
      } else {
        users[inputName] = { password: inputPassword, files: {} };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', inputName);
        setUsername(inputName);
      }
    } else {
      alert('Please fill in both username and password.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="hero-section">
        <h3 className="main-title">
          The rich <span className="highlight">text editor </span> for <br />
          every use case
        </h3>

        <button className="register-btn1" onClick={() => setIsRegistered(false)}>Register now!</button>
      </div>

      <div className="login-box">
        <h2>{isRegistered ? 'Login' : 'Register'}</h2>
        <input
          type="text"
          placeholder="username"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
         <input
          type="password"
          placeholder="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        
        {isRegistered ? (
          <button className="login-btn"onClick={handleLogin}>Login</button>
        ) : (
          <button className="login-btn" onClick={handleRegister}>Register</button>
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
