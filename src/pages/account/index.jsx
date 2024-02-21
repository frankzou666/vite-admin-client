import React, { Component } from 'react'

import {Space,Card,Table,Button, Pagination,Modal,notification} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowRightOutlined} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {reqCategorys} from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'


export default class Account extends Component {
  constructor(props){
    super(props)
    this.state={
      categorys:[],
      subCategorys:[],
      isLoading:false,
      parentId:'0',
      parentName:'',
      showStatus:0,
      updateCategory:''
 
    }
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:'300px',
        render: (_, record) => (
          <Space size="middle">
            <LinkButton  onClick={(e)=>{this.showUpdateCategoryModal(e,record)}}>修改分类</LinkButton>
            {this.state.parentId==='0'?<LinkButton onClick={(e)=>this.getSubCategorys(e,record)}>查看子分类</LinkButton>:null}
            
          </Space>
        ),
      },
    ];
    
    
  }

  getSubCategorys=(e,record)=>{
    e.preventDefault()
    //setState可以提供回调，默认是异步执行，所以有时候state还没有执行完成，就执行以后，所以需要回调
    this.setState({parentId:record._id,parentName:record.name},()=>{this.getCategorys()})
    

  }
  getCategorys =async ()=>{
    
     const parentId = this.state.parentId
    
     this.setState({isLoading:true})
     const responseDate =  await reqCategorys(parentId)
     if (responseDate.data){
       if (parentId==0) {
           this.setState({categorys:responseDate.data})
       } else {
           this.setState({subCategorys:responseDate.data})
       }   
     }
     this.setState({isLoading:false})
  }

  showAddCategoryModal=()=>{
    this.setState({showStatus:1})

  }

  showUpdateCategoryModal=(e,record)=>{
    this.setState({updateCategory:record},()=>{this.setState({showStatus:2})})

  }

  onCancel=()=>{
    this.setState({showStatus:0})
  }

  addCategory=()=>{
     this.onCancel()

  }

  updateCategory=()=>{
    this.onCancel()
    

  }

  componentWillMount(){
  

  }

  componentDidMount(){
    this.getCategorys()

  }


  render() {
    
    const {categorys,isLoading,parentId,parentName,subCategorys,showStatus,updateCategory} = this.state
    const cardTitle=parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={()=>{this.setState({parentId:'0',parentName:''},()=>{this.getCategorys()})}}>一级分类列表</LinkButton>
        <ArrowRightOutlined />
        <span>{parentName}</span>

      </span>
    )
    const extra=(<Space>
                    <Button type='primary' icon={<SearchOutlined />} onClick={()=>{this.setState({parentId:'0',parentName:''},()=>{this.getCategorys()})}}>查询</Button> 
                    <Button type='primary' icon={<AppstoreAddOutlined />}  onClick={()=>{this.showAddCategoryModal()}} >添加</Button> 
                 </Space>
    )
    
    
    return (

      <Card
        title={cardTitle}
        extra={extra}
       
      >
        <Table rowKey="_id" bordered dataSource={parentId==='0'?categorys:subCategorys} columns={this.columns} pagination={{defaultPageSize:PAGE_SIZE}} loading={isLoading}>

        </Table>

        <Modal title="添加分类" footer='' open={showStatus===1?true:false}  onCancel={this.onCancel} onOk={this.addCategory}>
          <AddForm  onCancel={this.onCancel} />
  
       </Modal>

       <Modal title="修改分类" footer='' open={showStatus===2?true:false} onCancel={this.onCancel}> 
         <UpdateForm key={updateCategory._id+Math.random()} onCancel={this.onCancel} getCategorys={this.getCategorys} updateCategory={updateCategory} />
       </Modal>
      </Card>
    )
  }
}
