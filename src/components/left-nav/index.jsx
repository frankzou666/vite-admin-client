import React, { Component, useEffect } from 'react'
import { Link ,useNavigate,Navigate} from 'react-router-dom'
import {Menu} from 'antd';
import { HomeOutlined, UserOutlined,HolderOutlined,IdcardOutlined,MailOutlined} from '@ant-design/icons'

import {APP_NAME} from '../../config/globalConfig'
import {MenuData} from '../../config/menuConfig'
import getIcon from '../../utils/getIcon'
import storeUtils from '../../utils/storeUtils'

import logoImg from '../../assets/images/logo.png'
import './left-nav.styl'


function LeftNav(){
  


    const navigate=useNavigate();
    
    //菜单数据结构
    // const data =[
    //   ["首页", 'homepage',[['用户管理','user'],['角色管理','role']]],
    //   ["商品" ,'productpage',[['商品管理','product'],['品类管理','account']]],
    // ]

    
    let datamenu=[]
    //读取localStorage中的user数据
    const user = storeUtils.getUser()
    //演染菜单数据
    // datamenu = MenuData.map((item)=>{
    //     return {label:item[0],key:item[1],icon:getIcon(item[0]),children:item[2].map((itemchildren)=>{
    //       return {label:itemchildren[0],key:itemchildren[1],icon:getIcon(itemchildren[1]),onClick:()=>{return navigate(itemchildren[1].toLowerCase())}}
    //     })}
    // })

    if ( user.username!=='admin') {
      //普通用户只显示后端返回的
      datamenu = MenuData.map((item)=>{
        return {label:item[0],key:item[1],icon:getIcon(item[0]),children:item[2].map((itemchildren)=>{
          return user.role.menus.includes(itemchildren[1])?{label:itemchildren[0],key:itemchildren[1],icon:getIcon(itemchildren[1]),onClick:()=>{return navigate(itemchildren[1].toLowerCase())}}:null
        })}
      })
    } else {
      //admin显示所有菜单
      datamenu = MenuData.map((item)=>{
        return {label:item[0],key:item[1],icon:getIcon(item[0]),children:item[2].map((itemchildren)=>{
          return {label:itemchildren[0],key:itemchildren[1],icon:getIcon(itemchildren[1]),onClick:()=>{return navigate(itemchildren[1].toLowerCase())}}
        })}
      })
    }
    // 如果用户的子单菜全部为空，那么父菜单也不显示了
    datamenu = datamenu.filter(item=>{ return item.children.reduce((prev,cur)=>{ return prev + (cur===null?0:1) },0)})
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