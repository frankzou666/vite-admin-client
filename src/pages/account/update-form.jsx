


import React, { Component } from 'react'
import {Button,notification,Form,Select, Input,Divider} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowRightOutlined} from '@ant-design/icons'



import {reqCategorys,reqUpdateCategorys} from '../../api/index'



const Item=Form.Item
const Option=Select.Option
class UpdateForm extends Component {
  constructor(props){
    super(props)
    this.state={
      categoryName:this.props.updateCategory.name
    }

  }
  handelSubmit=async (value)=>{
  
    const categoryId=this.props.updateCategory._id
    const categoryName = this.state.categoryName
    const responseData =  await reqUpdateCategorys({categoryId,categoryName})
    this.props.onCancel()
    if (responseData.status===0){
      this.props.getCategorys()
      notification.success({message:'成功',description:'更新分类名称成功',placement:'bottomRight',duration:2})  
    } else {
      notification.error({message:'失败',description:'更新分类名称失败！',placement:'bottomRight',duration:3})
    }
     
  }
  handleChange=(e)=>{
    
    this.setState({categoryName:e.target.value})
  }

  render() {
    return (
      <Form onFinish={this.handelSubmit}>
        <Divider></Divider>
        <Form.Item name='categoryName'> <Input id='categoryName' placeholder='请输入分名类名称' defaultValue={this.props.updateCategory.name} onChange={(e)=>{this.handleChange(e)}} ></Input> </Form.Item>
        <Item style={{marginLeft:'65%'}}>   
                 <Button style={{marginRight:'10px'}} onClick={this.props.onCancel} type='primary' ghost>取消</Button>
                 <Button type="primary" htmlType="submit" >确定</Button>
       </Item>
      </Form>
    )
  }
}

export default UpdateForm
