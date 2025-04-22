import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import EditorPage from './pages/EditTextPage';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage'



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className="App">
//         <EditorPage />
       
//       </div>
      
//     </>
//   )
// }

// export default App

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

  if (!localStorage.getItem('currentUser')) {
    return <LoginPage setUsername={setUsername} />;
  }

  return (
    <div className="App">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <EditorPage username={username} />
    </div>
  );
}

export default App;