import { useState } from 'react'
import React ,{Component} from 'react'
import {BrowserRouter, Route, Routes,useNavigate,Navigate} from 'react-router-dom'
import { Button ,Input,Card,notification,message,ConfigProvider} from 'antd';

import Admin from './pages/admin'
import Login from './pages/login'


import './App.css'
import './assets/css/minireset.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
         <Routes>
           <Route path='/login' element={<Login />}></Route>
           <Route path='/admin' element={<Admin />}></Route>
         </Routes>
    </BrowserRouter>
  )
  
}

export default App
