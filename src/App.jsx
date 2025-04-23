import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import EditorTextPage from './pages/EditTextPage';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'


function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUsername('');
  };

 

  return (
    <div className="App">
      <Navbar username={username} onLogout={handleLogout} />
      {!username ? (
        <LoginPage setUsername={setUsername} />
      ) : (
        <EditorTextPage username={username} />
      )}
    </div>
  );
  
}

export default App;