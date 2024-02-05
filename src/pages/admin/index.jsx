import React, { Component ,useEffect} from 'react'
import { useNavigate,Navigate  } from 'react-router-dom'

import { Layout } from 'antd'

import LayoutHeader  from '../../components/layout-header'
import LeftNav  from '../../components/left-nav'
import storeUtils from '../../utils/storeUtils'
import memoryUtils from '../../utils/memoryUtils'

import './admin.styl'

//后台管理的路由组件

const { Sider,Header,Content,Footer} = Layout

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.state={
      user:memoryUtils.user
    }
  }
  componentDidMount(){
    
  }
  render() {
    if (!this.state.user._id||!this.state.user) {
       return <Navigate path='/login'></Navigate>
    }
    return (
         <Layout className='P-Admin-Layout1'>
          <Sider><LeftNav></LeftNav></Sider>
          <Layout>
            <LayoutHeader></LayoutHeader>
            <Content className='M-content'>content</Content>
            <Footer style={{textAlign:'center',color:'#cccccc',padding:' 4px 0px'}}>使用推荐GOOGLE浏览器</Footer>
          </Layout>
         </Layout>
    )
  }
}
