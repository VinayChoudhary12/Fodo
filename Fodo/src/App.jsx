import React from 'react'
import Home from './pages/Home'
import './App.css'
import { ToastContainer,toast} from 'react-toastify';
const App = () => {
  return (
    <div>
      <Home></Home>
      <ToastContainer
        position="top-right"
           />
    </div>
  )
}

export default App
