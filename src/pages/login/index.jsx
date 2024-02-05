

import React, { Component } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,message } from 'antd';

import { reqLogin } from '../../api'
import storeUtils from '../../utils/storeUtils'
import memoryUtils from '../../utils/memoryUtils'
import logoImg from '../../assets/images/logo.png'
import './login.styl'


//登录的路由组件
export default class Login extends Component {
  constructor(props){    
    super(props);
    this.state={
      user:memoryUtils.user
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    

  }  
  
  //async需要放在定义函数的左则
  async handleSubmit(value){
    const {username,password} = value
    const result = await reqLogin(username,password)
    if (result.status===0){
      message.success('登录成功')
      storeUtils.saveUser(result.data)
      //所有路由组件三个特性
      window.location.href= '/'
    }
    

  }
  render() {
    if (this.state.user._id) {
      window.location.href= '/'
    }
    return (
      <div className='P-login'>
        <header className='P-login-header'>
            <img src={logoImg}></img>
            <h1>React后台管理系统</h1>
        </header>
        <section className='P-login-content'> 
            <h2>用户登录</h2>
            <Form
               name="normal_login"
               className="login-form"
               //onFinish在表单submit 的时候调用，并且把所有参数做为一个对像传过去了
               onFinish={this.handleSubmit}
            //    onFinish={onFinish}
            >
                <Form.Item
                 name="username"
                 rules={[
                    {required: true,message: '请输入用户名',},
                    {min: 4,message: '用户名最小度为4位',},
                    
                  ]}
                 
                >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
               </Form.Item>
              <Form.Item
                name="password"
                rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
               <Button type="primary" htmlType="submit"  className="login-form-button">
                 登录
               </Button>
              </Form.Item>
    </Form>
        </section>
      </div>
    )
  }
}
