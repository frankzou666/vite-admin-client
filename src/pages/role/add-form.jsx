
import {Button,notification,Form,Select, Input,Divider,message} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowRightOutlined} from '@ant-design/icons'


import React, { Component } from 'react'

import {reqCategorys,reqAddRole} from '../../api/index'

const Item=Form.Item
const Option=Select.Option
class AddForm extends Component {
  constructor(props){
    super(props)
    const {onCancel,getRolesList} = this.props
    this.state ={
      roleName:'',
    }

  }
  handelSubmit=async ()=>{
    const {roleName} = this.state
    const result = await reqAddRole(roleName)
    if (result.status===0) {
      message.success('创建角色成功')
      this.props.getRolesList()
      this.props.onCancel()
      
    } else {
      message.error('创建角色失败')
      this.props.onCancel()
    }
 
     
  }

  render() {
    return (
      <Form onSubmit={this.handelSubmit}>
        <Divider></Divider>
        <Form.Item name='roleName'    rules={[{required: true, message: '请输入商品名称'}]} > <Input onChange={(e)=>{this.setState({roleName:e.target.value})}}  placeholder='请输入角色名称'></Input> </Form.Item>
        <Item style={{marginLeft:'65%'}}>   
                 <Button type="primary" style={{marginRight:'10px'}} onClick={this.props.onCancel}>取消</Button>
                 <Button type="primary" htmlType="submit"  onClick={this.handelSubmit}>确定</Button>
       </Item>
      </Form>
    )
  }
}

export default AddForm
