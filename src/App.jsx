import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './pages/Home/Homepage.jsx'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebse.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user)
      {
        console.log("Logged In");
        navigate('/');
      }
      else{
        console.log("Logged out");
        navigate('/login');
      }
    })
  },[])
  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player/:id' element={<Player/>} />
      </Routes>
      
    </div>
  )
}

export default App