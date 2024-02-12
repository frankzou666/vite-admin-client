
import {Button,notification,Form,Select, Input,Divider} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowRightOutlined} from '@ant-design/icons'


import React, { Component } from 'react'


const Item=Form.Item
const Option=Select.Option
class AddForm extends Component {
  constructor(props){
    super(props)
    const {onCancel} = this.props

  }
  handelSubmit=(value)=>{
    console.log('addform')
    this.props.onCancel()
     
  }
  componentWillUnmount(){
    console.log('willunmount')
  }
  render() {
    return (
      <Form onFinish={this.handelSubmit} onSubmit={this.handelSubmit}>
        <Divider></Divider>
        <Item name='parentId'>
          <Select  defaultValue='a'>
             <Option value='a' def>一级分类</Option>
             <Option value='b'>b</Option>
             <Option value='c'>b</Option>
          </Select>

        </Item>
        <Item name='categoryName'> <Input placeholder='请输入分名类名称' ></Input> </Item>
        <Item style={{marginLeft:'65%'}}>   
                 <Button type="primary" style={{marginRight:'10px'}} onClick={this.props.onCancel}>取消</Button>
                 <Button type="primary" htmlType="submit" >确定</Button>
       </Item>
      </Form>
    )
  }
}

export default AddForm
