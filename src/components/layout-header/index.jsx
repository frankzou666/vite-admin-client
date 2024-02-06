import React, { Component } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import {Modal} from 'antd';


import {reqWeather} from '../../api/index'
import {APP_NAME} from '../../config/globalConfig'
import {formatDate} from '../../utils/formatDate'
import storeUtils from '../../utils/storeUtils'
import './layout-header.styl'

class LayoutHeaderWapper extends Component {
  constructor(props){
    super(props)
    this.state={
      city:'beijing',
      weather:'',
      currentUser:'',
      titleName:'',
      currentDateTimeStr:formatDate(Date.now()),
    }

  }

  //每秒更新时间
  getCurrentDateTimeStrByInterval=()=>{
    this.intervalTimeId = setInterval( ()=>{
      this.setState({currentDateTimeStr:formatDate(Date.now())})
    },1000)
  }

  //更新天气信息
   getWeather=async ()=>{
    let weatherResponse= await reqWeather(this.state.city)
      if (weatherResponse.data.cod===200){
        this.setState({weather:weatherResponse.data.weather[0].main})
    }
    this.intervalWeatherId= setInterval(async ()=>{
      let weatherResponse= await reqWeather(this.state.city)
      if (weatherResponse.data.cod===200){
        this.setState({weather:weatherResponse.data.weather[0].main})
      }
    },60000)

  }
  //显示首页标题
  getTitle=()=>{
    console.log(this.props.location.pathname)
  }

  //组件挂载开始执行定时器
  async componentDidMount(){
    this.setState({currentUser:storeUtils.getUser().username})
    this.getCurrentDateTimeStrByInterval()
    this.getWeather()
    this.getTitle()
    
    
    
  }
   
  //退出登录 
  handleLogout=(e)=>{
    e.preventDefault()
    Modal.confirm({
            title:'注销',
            okText:'确定',
            cancelText:'取消',
            content:'是否确定要注销？',
            onOk:()=>{
              storeUtils.removeUser()  
              this.props.navigate('/login')
            },
            onClose:()=>{

            }

        })  

  }

  //unmount时，清除定时器
  componentWillUnmount(){
     clearInterval(this.intervalTimeId)
     clearInterval(this.intervalWeatherId)
  }
  render() {
    const {weather,currentDateTimeStr,currentUser,titleName} = this.state
    return (
      <div className='P-LayoutHeader'>
        <div className='header-top'>
          <h2>{APP_NAME}管理系统</h2>
          <div className='header-top-right'>
            <span>欢迎,{currentUser}</span>
            <a href='' onClick={(e)=>this.handleLogout(e)}>退出</a>
          </div>
        </div>

        <div className='header-bottom'>
          <div className='header-bottom-left'>{titleName}</div>
          <div className='header-bottom-right'>
            <span>{currentDateTimeStr}</span>
            <span>{weather}</span>
          </div>  
        </div>
        
      </div>
    )
  }
}

function LayoutHeader(){
  let location=useLocation()
  let navigate = useNavigate()
  return(<LayoutHeaderWapper location={location} navigate={navigate}/>)
}

export default LayoutHeader