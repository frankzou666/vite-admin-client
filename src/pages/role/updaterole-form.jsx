
import {Button,notification,Form,Select, Input,Divider,message,Tree} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowRightOutlined} from '@ant-design/icons'


import React, { Component } from 'react'

import {reqUpdateRole,reqDeleteRole} from '../../api/index'
import {MenuData} from '../../config/menuConfig'

const Item=Form.Item
const Option=Select.Option
class UpdateRoleForm extends Component {
  constructor(props){
    super(props)
    const {onModifyRoleCancel,getRolesList,role} = this.props
    this.state ={
      roleName:'',
      treeData:[
       ] ,
      rolePrivs:[]    //角色拥有的总权限     
    }

  }
 componentWillMount=()=>{
    const treeData = MenuData.map((item)=>{
      return {title:item[0],key:item[1],children:item[2].map((itemchildren)=>{
        return {title:itemchildren[0],key:itemchildren[1]}
      })}
    })
    this.setState({treeData:treeData})

    //初始化的时候，每个角色有哪些权限是决定了
    this.setState({rolePrivs:this.props.role.menus})
     
  }
  //点中复选框时触发
  onCheck=(checkedKeys)=>{
    //摸拟过滤掉父节点的数据
    const parentData = MenuData.map((item)=>{return item[1]})
    //过滤掉父节点，就是子节点了
    const rolePrivs =checkedKeys.filter(item=>{return !parentData.includes(item)})
    this.setState({rolePrivs:rolePrivs})

  }
  //修改角色权限
  handelSubmit=async ()=>{
    const {role} = this.props
    const menus = this.state.rolePrivs
    const name = role.name
    const result = await reqUpdateRole(role._id,name,menus)
    if (result.status===0) {
      message.success('修改角色权限成功')
      this.setState({rolePrivs:[]})
      this.props.onModifyRoleCancel()
      this.props.getRolesList()
      
      
    } else {
      message.error('修改角色权限失败')
      this.props.onModifyRoleCancel()
    }
 
     
  }

  render() {
    const {treeData,rolePrivs} = this.state;
    const {role} = this.props
    let expandedKeys = treeData.map((item)=>{return item[1]});
    expandedKeys =['productpage']
    return (
      <Form onSubmit={this.handelSubmit}>
        <Divider></Divider>
        <span className='productdetail-list-span-title'>角色名称: {role.name}</span>
        <Divider></Divider>
        <Tree
          checkable
          defaultExpandAll
          defaultCheckedKeys={rolePrivs}
          treeData={treeData}
          onCheck={this.onCheck}
        />
        <Item style={{marginLeft:'65%'}}>   
                 <Button type="primary" style={{marginRight:'10px'}} onClick={this.props.onModifyRoleCancel}>取消</Button>
                 <Button type="primary" htmlType="submit"  onClick={this.handelSubmit}>确定</Button>
       </Item>
      </Form>
    )
  }
}

export default UpdateRoleForm
