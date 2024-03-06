import React, { Component } from 'react'
import {Routes,Route,Navigate,BrowserRouter, useNavigate,useLocation} from 'react-router-dom'
import {Space,Card,Table,Button, Upload,Modal,notification,Select, Input,message,Cascader,Form} from 'antd';

import { reqAddUser,reqUpdateUser} from '../../api'
import LinkButton from '../../components/link-button'


class UserAddUpdateFormWrapper extends Component {
  constructor(props) {
    super(props)
    this.state={
      user:this.props.user?this.props.user:'',
      username:this.props.user?this.props.user.username:'',
      email:this.props.user?this.props.user.email:'',
      phone:this.props.user?this.props.user.phone:'',
      password:this.props.user?this.props.user.password:'',
      roles :[],
      //当更新用户的时候，要取得用户原来的role_id
      defaultRole:this.props.user?this.props.user.role_id:'',
    }  

  }
  async componentWillMount() {

  
  }

  
  async componentDidMount(){
    //初始化角色下拉列表
    const roles = this.props.roles.map(item=>{
        return {value:item._id,label:item.name,isLeaf:true}
    })
    this.setState({roles:roles})
    
  }

 
  handleSubmit= async (values)=>{
     //1是新增用户
     if (this.props.isAddorUpdate===1){
        const user = {}
        user.username = values.username
        user.password = values.password
        user.email = values.email
        user.phone = values.phone
        user.role_id = this.state.defaultRole
        const result = await reqAddUser(user);
        if(result.status===0) {
          message.success('新增用户成功')
        } else {
          message.error('新增用户失败')
        }
     } else {
        //如果是2，说明是修改用户，如果value.password是空，说明用户没有修改密码，所以不要提交
        const user = {}
        console.log(values)
        user._id=this.state.user._id
        user.username = values.username
        if (values.password) {
            user.password = values.password
        }
        user.email = values.email
        user.phone = values.phone
        user.role_id = this.state.defaultRole
        const result = await reqUpdateUser(user);
        if(result.status===0) {
          message.success('修改用户成功')
        } else {
          message.error('修改用户失败')
        }
     }

     this.props.onModalAddUpdateCancel();
     

  }

  onChange=(roles)=>{
    this.setState({defaultRole:roles[0]})

  }
  
  render() {

  
    const {username,email,phone,password,options,defaultRole} = this.state;
    return (
      <Card > 
        <Form  labelCol={{ span: 3 }}
               wrapperCol={{ span: 12 }}
               onFinish={this.handleSubmit}
        >
          <Form.Item name='username'  label='用户名'  initialValue={username} ><Input  /></Form.Item> 
          <Form.Item name='password'  label='密码'  initialValue={password} ><Input  /></Form.Item>       
          <Form.Item name='email'     label='邮箱'    initialValue={email} ><Input  /></Form.Item>  
          <Form.Item name='phone'     label='电话'  initialValue={phone} ><Input  /></Form.Item> 
          <Form.Item name='role_id'   label='角色名称'   ><Cascader  defaultValue={defaultRole}  options={this.state.roles}  onChange={this.onChange} /> 
          </Form.Item> 
          
          <Form.Item style={{marginLeft:'10%'}}>   
                 <Button  style ={{marginRight:'50px'}} onClick={this.props.onModalAddUpdateCancel}>取消</Button>
                 <Button type="primary" htmlType="submit"  onClick={this.handelSubmit}>确定</Button>
         </Form.Item>
        </Form>
      </Card>
    )
  }
}


function UserAddUpdateForm(props){ 
  const navigate=useNavigate()
  const location = useLocation()
  const {user,isAddorUpdate,onModalAddUpdateCancel,roles} = props
  return <UserAddUpdateFormWrapper 
             navigate={navigate} l
             ocation={location} 
             user={user} 
             roles={roles}
             isAddorUpdate={isAddorUpdate}
             onModalAddUpdateCancel={onModalAddUpdateCancel}></UserAddUpdateFormWrapper>

}

export default UserAddUpdateForm