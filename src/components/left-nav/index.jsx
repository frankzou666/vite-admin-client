import React, { Component, useEffect } from 'react'
import { Link ,useNavigate,Navigate} from 'react-router-dom'
import {Menu} from 'antd';
import { HomeOutlined, UserOutlined,HolderOutlined,IdcardOutlined,MailOutlined} from '@ant-design/icons'

import {APP_NAME} from '../../config/globalConfig'
import getIcon from '../../utils/getIcon'
import logoImg from '../../assets/images/logo.png'
import './left-nav.styl'


function LeftNav(){
  


    const navigate=useNavigate();
    
    //菜单数据结构
    const data =[
      ["首页", 'homepage',[['User','user'],['Role','role']]],
      ["商品" ,'productpage',[['商品管理','product'],['品类管理','account']]],
    ]
    let datamenu=[]
    

    
    //演染菜单数据
    datamenu = data.map((item)=>{
        return {label:item[0],key:item[1],icon:getIcon(item[0]),children:item[2].map((itemchildren)=>{
          return {label:itemchildren[0],key:itemchildren[1],icon:getIcon(itemchildren[1]),onClick:()=>{return navigate(itemchildren[1].toLowerCase())}}
        })}
    })

    return (
      <div className='P-leftnav'>
        <Link className='M-leftnav-header'>
            <img src={logoImg}></img>
            <h2>{APP_NAME}</h2>
        </Link>
        <Menu theme='dark' mode='inline'  items={datamenu}>

        </Menu>
      </div>
    )
}  




export default LeftNav