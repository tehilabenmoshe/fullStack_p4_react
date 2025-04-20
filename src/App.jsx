import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import {Text} from './pages/TextPage'
import React from 'react';
import './App.css';
import EditorPage from './pages/EditorPage'



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

  return (
    <div className="App">
      <EditorPage />
    </div>
  );
}

export default App;
