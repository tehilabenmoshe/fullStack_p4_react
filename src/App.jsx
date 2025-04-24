// src/App.jsx
import './App.css';
import React, { useState, useEffect } from 'react';
import LoginView from './components/LoginView';
import EditorView from './components/EditorView';
import Navbar from './components/Navbar';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) setUsername(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUsername('');
  };

  return (
    <div className="App">
      <Navbar username={username} onLogout={handleLogout} />
      {username ? (
        <EditorView username={username} /> //if the user already log in-> show the editor comp
      ) : (
        <LoginView setUsername={setUsername} />//if not-> show the login comp
      )}
    </div>
  );
}

export default App;
