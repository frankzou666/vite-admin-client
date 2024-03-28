import React, { Component } from 'react'
import {Routes,Route,Navigate,BrowserRouter, useNavigate,redirect,useLocation} from 'react-router-dom'
import { createBrowserHistory,createMemoryHistory } from "history";
import {Space,Card,Table,Button, Pagination,Modal,notification,Select, Input,message} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons'

import { useSelector,useDispatch } from 'react-redux'
import {reqUser,reqDeleteUser} from '../../api'
import {formatDate} from '../../utils/formatDate'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import UserAddUpdateForm from './useraddupdateform'
import './user.styl'
import stylus from 'stylus';


class UserWapper extends Component {
/*
     默认路由是一层层match,所以这里需要精确match. 如果是默认的话一match到product就不会往下处理了，所以要加exact
 */

  constructor(props){
    super(props)
    this.state={
      users:[],
      roles:[],
      user:'',
      showModalAddUpdate:0,
      productsTotal:0,
      isLoading:false,
      searchType:'1',
      searchKeyWords:'',
      modalTitle:'aa',
      isAddorUpdate:1, //如果是1 表示新增，2表示修改
    }
    
  }   

  //初始化table的列数据
  initalColumns=()=>{
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },

      {
        title: '注册时间',
        dataIndex: 'create_time'
      },

      {
        title: '所属角色',
        dataIndex: 'role_name'
      },
      {
        width:150,
        title: '操作',
        render:(_,record)=>{
          return <span>
                    <LinkButton style={{paddingLeft:0,paddingRight:15}} onClick={()=>{this.setState({user:record},()=>this.handleClickUser(2))}} >修改</LinkButton>
                    <LinkButton  style={{paddingLeft:0,paddingRight:5,color:'#ff4d4f'}}  onClick={(e)=>{this.handelDeleteUser(e,record)}} >删除</LinkButton>
                 </span>
        }
      },
    ];

  }
  componentWillMount(){
    this.initalColumns()
    

  }
  
  //所取所有用户
  getUser =async ()=>{
    const result = await reqUser();
    if (result.status===0) {
      //先把角色id和name找出来
      const roles = result.data.roles.map(role=>{
        return {_id:role._id,name:role.name}
      })
      const users = result.data.users.map(user=>{
        return {_id:user._id,
                username:user.username,
                email: user.email,
                phone: user.phone,
                role_id:user.role_id?user.role_id:'',
                role_name:user.role_id?roles.filter(role=>{return role._id===user.role_id?role.name:''})[0].name:'',create_time:formatDate(user.create_time)}
      })
      this.setState({users:users})
      this.setState({roles:roles})
    } else {
      message.error('获取用户失败')
    }
    

  }

  componentDidMount(){
    this.getUser()
    
  }

  //显示增加或修改用户对话框
  handleClickUser=(isAddorUpdate)=>{
    //表示当前是修改用户
    setTimeout(()=>{this.props.dispatch({type:'set',data:{username:'hello'}})},500);
    this.setState({isAddorUpdate:isAddorUpdate},()=>{ this.setState({showModalAddUpdate:1})})
    
   
  }

  //显示增加或修改用户对话框
  onModalAddUpdateCancel=()=>{
    this.setState({showModalAddUpdate:0})
    this.setState({modalTitle:''})
    this.setState({user:''})
  }

  //删除用户
  handelDeleteUser=(e,record) =>{
    const {_id,username} = record
    Modal.confirm({
      title:'删除用户',
      okText:'确定',
      cancelText:'取消',
      content:'是否确定要删除用户:'+username+' ?',
      onOk:async ()=>{
           const userId= record._id
           const result = await reqDeleteUser(userId)
           if (result.status===0) {
            this.getUser()
            message.success('删除用户成功')
           } else{
             message.error('删除用户失败')
           }
      },
      onClose:()=>{}
  }) 
  }
  

  
  render() {
    const Option = Select.Option
    const pageSize = PAGE_SIZE
    const columns= this.columns
    const {productsTotal,current,isDeleteProduct,users,isLoading,modalTitle,showModalAddUpdate,user,roles,isAddorUpdate} = this.state
    const title=(
      <div className='card-title'> 
         <Button type='primary'  icon={<AppstoreAddOutlined/>}   onClick={()=>this.handleClickUser(1)}>创建用户</Button>
      </div>
    )

    return (
          <Card title={title}  className='P-Card' >
            <Table rowKey='_id' loading={isLoading} dataSource={users} columns={columns} bordered size='small'
            pagination = {{ defaultPageSize:pageSize,current:current,total:productsTotal,onChange:(page)=>{ 
              if (this.state.searchKeyWords){
                // this.getProductsBySearch(page)
                this.setState({pagingPage:page})
                this.setState({current:page})
              } else {
                this.getUser(page)
                this.setState({pagingPage:page})
                this.setState({current:page})
              }
              }}}  >
            </Table>

            <Modal title={isAddorUpdate===1?"新增用户":"修改用户"} footer='' open={showModalAddUpdate===1?true:false}  onCancel={this.onModalAddUpdateCancel} >
               {/* 如果是修改就要把user对像传过去 */}
                <UserAddUpdateForm key={Math.random()} user={isAddorUpdate===2?user:''} 
                                  isAddorUpdate={isAddorUpdate} 
                                  roles = {roles}
                                  onModalAddUpdateCancel={this.onModalAddUpdateCancel}
                                  /> 
            </Modal> 
          </Card>
       
    )
  }
}

function User(props){ 
    const navigate=useNavigate()
    const location = useLocation()
    const  dispatch = useDispatch();
    const  selector = useSelector((state)=>state.count);
    return <UserWapper navigate={navigate} selector={selector} dispatch={dispatch} props></UserWapper>

}

export default User