import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Text} from './pages/TextPage'
import EditorPage from './pages/EditorPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <EditorPage />
       
      </div>
      
    </>
  )
}

export default App
