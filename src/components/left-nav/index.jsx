import React, { Component } from 'react'
import { Link ,useNavigate,Navigate} from 'react-router-dom'
import {Menu} from 'antd';
import { HomeOutlined, UserOutlined,HolderOutlined,IdcardOutlined,MailOutlined} from '@ant-design/icons'
import logoImg from '../../assets/images/logo.png'
import './left-nav.styl'


class LeftNavWrapper extends Component {
  constructor(props){
    super(props)

  }  
  render() {
    const navigate = this.props.navigate
    const homeMenuItems =[
        { label:"Home",icon:<HomeOutlined />, key:'home1',onClick:()=>{navigate('/home')}},
        { label:"Account" ,icon:<UserOutlined /> , key:'account1', onClick:()=>{navigate('/account')}},
    ]
    const goodMenuItems =[
        { label:"Home",icon:<HomeOutlined />, key:'home2',onClick:()=>{navigate('/home')}},
        { label:"Account" ,icon:<UserOutlined /> , key:'account2', onClick:()=>{navigate('/account')}},
    ]
    const mneuItems =[
        { label:"首页",icon:<HomeOutlined />, key:'home',children:homeMenuItems},
        { label:"商品" ,icon:<MailOutlined /> , key:'account',children:goodMenuItems},
    ]
    return (
      <div className='P-leftnav'>
        <Link className='M-leftnav-header'>
            <img src={logoImg}></img>
            <h2>硅谷后台</h2>
        </Link>
        <Menu theme='dark' mode='inline' items={mneuItems}>

        </Menu>
      </div>
    )
  }
}


function LeftNav(props) {
    let navigate = useNavigate();
    return <LeftNavWrapper {...props}  navigate={navigate} />;
  }

  export default LeftNav