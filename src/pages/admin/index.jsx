import React, { Component ,useEffect} from 'react'
import { useNavigate,Navigate ,Outlet,Routes,Route,redirect } from 'react-router-dom'

import { Layout } from 'antd'

import LayoutHeader  from '../../components/layout-header'
import LeftNav  from '../../components/left-nav'
import storeUtils from '../../utils/storeUtils'
import memoryUtils from '../../utils/memoryUtils'

import Home from '../home'
import Account from '../account'
import User from '../user'
import Role from '../role'
import {APP_NAME} from '../../config/globalConfig'

import './admin.styl'

//后台管理的路由组件

const { Sider,Header,Content,Footer} = Layout

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.state={
      user:storeUtils.getUser()
    }
  }
  componentDidMount(){
    window.document.title=APP_NAME
    
  }
  
  render() {
    if (!this.state.user._id||!this.state.user) {
       return <Navigate to='/login'></Navigate>
    }
    return (
         <Layout className='P-Admin-Layout1'>
          <Sider><LeftNav></LeftNav></Sider>
          <Layout>
            <LayoutHeader></LayoutHeader>
            <Content className='M-content'>content
            <Routes>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/account' element={<Account />}></Route>
              <Route path='/user' element={<User />}></Route>
              <Route path='/role' element={<Role />}></Route>
               {/*以前版本使用<Ridirect> 现只使用Navigte来处理了，定义一个默认路由*/} 
               <Route path='/*' element={<Navigate to='/home'></Navigate>}></Route>
              
            </Routes>
            </Content>
            <Footer style={{textAlign:'center',color:'#cccccc',padding:' 4px 0px'}}>使用推荐GOOGLE浏览器</Footer>
          </Layout>
         </Layout>
    )
  }
}
