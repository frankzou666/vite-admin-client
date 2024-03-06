import React, { Component } from 'react'
import {Routes,Route,Navigate,BrowserRouter, useNavigate,redirect,useLocation} from 'react-router-dom'
import { createBrowserHistory,createMemoryHistory } from "history";
import {Space,Card,Table,Button, Pagination,Modal,notification,Select, Input,message} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons'


import {reqRoles} from '../../api'
import LinkButton from '../../components/link-button'
import {formatDate} from '../../utils/formatDate'
import { PAGE_SIZE } from '../../utils/constants'
import AddForm from './add-form'
import UpdateRoleForm from './updaterole-form'
import {reqUpdateRole,reqDeleteRole} from '../../api/index'

import './role.styl'

//创建角色

class RoleWapper extends Component {
/*
     默认路由是一层层match,所以这里需要精确match. 如果是默认的话一match到product就不会往下处理了，所以要加exact
 */

  constructor(props){
    super(props)
    this.state={
      role:'',
      roles:[],
      rolesTotal:0,
      isLoading:false,
      searchType:'1',
      searchKeyWords:'',
      selectedRowKeys:'',
      showStatus:false,
      showModalRole:false,  //显示修改角色的权限
    }
    
  }   

  //初始化table的列数据
  initalColumns=()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time'
      },

      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        width:'300px',
        render: (_, record) => (
          <Space size="middle">
             <LinkButton  style={{paddingLeft:0,paddingRight:5}}  onClick={this.modifyRole} >设置</LinkButton>
            <LinkButton  style={{paddingLeft:0,paddingRight:5,color:'#ff4d4f'}}  onClick={(e)=>{this.deleteRole(e,record)}}>删除</LinkButton>
          </Space>
        ),
      },
    ];

  }

  //删除角色
  deleteRole=(e,record) =>{
    const {_id,name} = record
    Modal.confirm({
      title:'删除角色',
      okText:'确定',
      cancelText:'取消',
      content:'是否确定要删除角色:'+name+' ?',
      onOk:async ()=>{
        if (record.parentId!=='0') {
           const roleId= record._id
           const result = await reqDeleteRole(roleId)
           if (result.status===0) {
            this.getRolesList()
            message.success('删除角色成功')
           } else{
             message.error('删除角色失败')
           }
        }
      },
      onClose:()=>{}
  }) 
  }


  //获取角色列表
  getRolesList=async ()=>{
     const result = await reqRoles()
     if (result.status===0) {
        const data = result.data
        const roles = data.map(item=>{
           return {_id:item._id,name:item.name,create_time:formatDate(item.create_time),
                   auth_name:item.auth_name,auth_time:item.auth_time?formatDate(item.auth_time):'',menus:item.menus}
        })
        this.setState({roles:roles})
     } else (
        message.error('获取角色列表失败!')
     )

  }
  componentWillMount(){
    this.initalColumns()
    this.getRolesList()
  }
 
   
  componentDidMount(){
    
  }

  //给每行绑定一个click事件,
  onRow=(role) => {
    return {
      onClick: (event) => {
        this.setState({selectedRowKeys:role._id})
        this.setState({role:role})
      }
    };
  }

  onChange=(selectedRowKeys, selectedRows)=>{
    this.setState({selectedRowKeys:selectedRowKeys})
  }

  onCancel=()=>{
    this.setState({showStatus:0})
  }

  addRole=()=>{
    
  }
  
  //修改角权权限
  modifyRole=()=>{
    const {role} = this.state;
    this.setState({showModalRole:1})
  }

  onModifyRoleCancel=()=>{
    this.setState({showModalRole:0})
  }

  
  render() {
    const Option = Select.Option
    const pageSize = PAGE_SIZE
    const columns= this.columns
    const {rolesTotal,current,isDeleteProduct,role,roles,isLoading,
           showModalRole,onModifyRoleCancel,
           selectedRowKeys,showStatus,onCancel} = this.state
    const title=(
      <div className='card-title'> 
         <Button type='primary'  style={{marginRight:"20px"}} icon={<AppstoreAddOutlined/>}  onClick={()=>{this.setState({showStatus:1})}}>创建角色</Button>
         {/* <Button type='primary' icon={<SearchOutlined />} disabled={!role._id?true:false} onClick={this.modifyRole}  >设置角色权限</Button>
          */}
      </div>
    )

    // const extra=(
    //   <Button type='primary'  icon={<AppstoreAddOutlined/>}  onClick={()=>{this.props.navigate('/product/addupdate')}}>添加商品</Button>
    // )

    const extra= (<></>)

    return (
          <Card title={title} extra={extra} className='P-Card-Role' >
            <Table rowKey='_id' loading={isLoading} dataSource={roles} columns={columns} bordered size='small'
            pagination = {{ defaultPageSize:pageSize,current:current,total:rolesTotal,onChange:(page)=>{ 
              if (this.state.searchKeyWords){
                this.getProductsBySearch(page)
                this.setState({pagingPage:page})
                this.setState({current:page})
              } else {
                this.getRolesList(page)
                this.setState({pagingPage:page})
                this.setState({current:page})
              }
              }}}  
              rowSelection={{type:"radio",selectedRowKeys:[selectedRowKeys],onChange:this.onChange}}
              
              onRow={this.onRow}
              >
               
            </Table>

            <Modal title="添加角色" footer='' open={showStatus===1?true:false}  onCancel={this.onCancel} onOk={this.addRole}>
                <AddForm  onCancel={this.onCancel}  getRolesList = {this.getRolesList}/>
           </Modal>

           <Modal title="设置角色权限" footer='' open={showModalRole===1?true:false}  onCancel={this.onModifyRoleCancel} >
               {/* 修改角色时需要把角色传到子组件中去s */}
               <UpdateRoleForm key={role._id} role={role} getRolesList = {this.getRolesList} onModifyRoleCancel={this.onModifyRoleCancel} />
           </Modal>
             
          </Card>
       
    )
  }
}

function Role(props){ 
    const navigate=useNavigate()
    const location = useLocation()
    return <RoleWapper navigate={navigate}  props></RoleWapper>

}

export default Role