import React, { Component } from 'react'
import {Routes,Route,Navigate,BrowserRouter, useNavigate,useLocation} from 'react-router-dom'
import {Space,Card,Table,Button, Upload,Modal,notification,Select, Input,message,Cascader,Form} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons'

import { reqCategorys,reqCategoryInfo,reqProductAdd,reqProductUpdate} from '../../api'
import LinkButton from '../../components/link-button';
import RichTextEditor from '../../components/rich-text-editor'
import PicturesWall from './pictureswall'



class ProductAddUpdateWrapper extends Component {
  constructor(props) {
    super(props)
    let imgs;
    if (this.props.location.state) {
      imgs= this.props.location.state.record.imgs
    }
    this.state={
      //通过转过来的路由，得到record
      record:this.props.location.state?this.props.location.state.record:'',
      //是新增加还是修改，1新增，2修改
      isAddOrUpdatFlag:1,
      parentId:'0',
      categorys2:[],
      options:[],
      defaultCategory:'',
      categoryId:'',
      pCategoryId:'',
      imgs:imgs,
      editorText:'',  //得到文件编辑的文本

    }  

  }
  async componentWillMount() {
    //当前是修改
    if (this.state.record ) {
      this.setState({isAddOrUpdatFlag:2})

      }
    
    //当前是新增
    else   {
      this.setState({isAddOrUpdatFlag:1})
    }  
  
  }

  async componentDidMount(){
    
    await this.getCategorys()
    if (this.state.record ) {
       if (this.state.isAddOrUpdatFlag===2) {
          const {pCategoryId} = this.state.record
          const options = this.state.options
          const categorys2 = await this.getCategorys(pCategoryId) 
          const targetOption = options.find(option => option.value===pCategoryId)
          if (targetOption) {
            targetOption.children = categorys2
            this.setState({options:options})
          }
          
       }
    }
    
  }
  getCategorys =async (parentId='0')=>{
    const responseDate =  await reqCategorys(parentId)
    let options =  this.state.options
    if (responseDate.data){
      if (parentId=='0') {
          const categorys1 = responseDate.data.map(item=>{
            return {value:item._id,label:item.name, isLeaf:false}
          })
          this.setState({options:categorys1})
      } else {
        const categorys2 = responseDate.data.map(item=>{
          return {value:item._id,label:item.name,isLeaf:true}
        })
        return categorys2
      }   
    }
    
  }
  
  //加载二级分类数据
  loadData=async (selectedOptions)=>{
    const targetOption = selectedOptions[0]
    targetOption.loading=true
    const categorys2 = await this.getCategorys(targetOption.value)
    if (categorys2.length<1) {
      targetOption.isLeaf=true
    }
    targetOption.children=categorys2
    targetOption.loading=false
    this.setState({options:[...this.state.options]})
    
  }

  onChange=(value, selectedOptions)=>{
      if (value.length===1) {
        this.setState({pCategoryId:0})
        this.setState({categoryId:value[0]})
      } else if (value.length===2) {
        this.setState({pCategoryId:value[0]})
        this.setState({categoryId:value[1]})
      }
  }

  getImages=(fileList)=>{
    this.setState({imgs:fileList.map(file=>file.name)})
  }

  //文本编辑器数据回调
  getEditorText=(text)=>{
    this.setState({detail:text})

  }
  handleSubmit= async (values)=>{
    const {name,desc,price} =values
    //当前是新增商品
    if (this.state.isAddOrUpdatFlag==1 ) {
       const {pCategoryId,categoryId,imgs,detail} = this.state
       const status =1
       const result  = await reqProductAdd(categoryId,pCategoryId,name,price,desc,status,imgs,detail)
       if (result.status===0) {
          message.success('商品上架成功')
          this.props.navigate(-1)
       } else {
          message.error('商品上架失败')
       }
    //表示当前是修改商品   
    } else if (this.state.isAddOrUpdatFlag==2) {
      //如果能取到分类的值，说明改过，否则就取原来的值
      let pCategoryId
      let categoryId
      let status
      const {imgs,detail} = this.state
      if (this.state.categoryId) {
        categoryId = this.state.categoryId
        pCategoryId = this.state.pCategoryId
      } else {
        pCategoryId = this.state.record.pCategoryId
        categoryId  = this.state.record.categoryId
        status = this.state.record.status
      }
      const _id = this.state.record._id
      const result  = await reqProductUpdate(_id,categoryId,pCategoryId,name,price,desc,status,imgs,detail)
      if (result.status===0) {
         message.success('商品修改成功')
         this.props.navigate(-1)
      } else {
         message.error('商品修改失败')
      }

    }

  }
  
  render() {
    const {Item} = Form;
    const {TextArea} = Input 
    const defaultValue=[]
    const title=(
      <div className='card-title'> 
         <LinkButton onClick={()=>this.props.navigate('/product')}><ArrowLeftOutlined /></LinkButton>
         <span>{this.state.isAddOrUpdatFlag==2 ?'修改商品':'添加商品'}</span>
      </div>
    ) 

    const {imgs} = this.state
    const {name,desc,price,detail,pCategoryId,categoryId} = this.state.record?this.state.record:''
    //如果是修改，则要取传过来的值
    if (this.state.isAddOrUpdatFlag==2){
      if(pCategoryId==='0') {
        defaultValue.push(categoryId)
      } else {
        defaultValue.push(pCategoryId)
        defaultValue.push(categoryId)
      }
    }
    const {options} = this.state
    return (
      <Card title={title}> 
        <Form  labelCol={{ span: 3 }}
               wrapperCol={{ span: 12 }}
               onFinish={this.handleSubmit}
        >
           <Form.Item name='name'   label='商品名称'  rules={[{required: true, message: '请输入商品名称'}]} initialValue={name} ><Input /></Form.Item>
           {/* ITEM和Input之间不能有空格，踩坑 */}
          <Form.Item name='desc'   label='商品描述'   rules={[{required: true, message: '请输入商品名称'}]} initialValue={desc}  ><TextArea  autosize={{minRows:2,maxRows:6}}/></Form.Item>
          <Form.Item name='price'  label='商品价格'   rules={[{required: true, message: '请输入商品名称'}]} initialValue={price} ><Input   type='number' addonAfter='元' /></Form.Item>
          <Form.Item  label='商品分类'  rules={[{required: true, message: '商品分类必选'}]} ><Cascader   defaultValue={defaultValue} options={this.state.options} loadData={this.loadData} onChange={this.onChange} /></Form.Item>
          <Form.Item  label='商品图片'  ><PicturesWall getImages={this.getImages} imgs={imgs}></PicturesWall></Form.Item>
          
          <Form.Item  label='商品详情'  
             labelCol={{ span: 2 }}
             wrapperCol={{ span: 20 }}
          
          > <RichTextEditor getEditorText = {this.getEditorText}  detail={detail} /> </Form.Item>
          <Form.Item> <Button style={{marginLeft:'60%'}} type='primary' htmlType="submit"  >提交</Button></Form.Item>
        </Form>

      </Card>
    )
  }
}


function ProductAddUpdate(props){ 
  const navigate=useNavigate()
  const location = useLocation()
  return <ProductAddUpdateWrapper navigate={navigate} location={location} props></ProductAddUpdateWrapper>

}

export default ProductAddUpdate