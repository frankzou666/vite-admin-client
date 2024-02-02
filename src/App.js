
import React ,{Component} from 'react'
import {BrowserRouter, Route, Routes,useNavigate,Navigate,Switch} from 'react-router-dom'
import { Button ,Input,Card,notification,message,ConfigProvider} from 'antd';

import Admin from './pages/admin'
import Login from './pages/login'

import './App.css';


//路由器必须要包起来,路由是一个一个组件,新版而且<Route>一定要放到<Routes>下
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
           <Routes>
             <Route path='/login' element={<Login />}></Route>
             <Route path='/admin' element={<Admin />}></Route>
           </Routes>
      </BrowserRouter>
    )
  }
}

