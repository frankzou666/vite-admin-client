import React, { Component } from 'react'
import {Routes,Route,Navigate,BrowserRouter, useNavigate,redirect,useLocation} from 'react-router-dom'
import { createBrowserHistory,createMemoryHistory } from "history";
import {Space,Card,Table,Button, Pagination,Modal,notification,Select, Input,message} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowRightOutlined} from '@ant-design/icons'


import {reqProducts,reqProductsSearch,reqCategoryUpdateStatus} from '../../api'
import AddUpdate from './addupdate'
import ProductDetail from './productdetail'
import ProductHome from './producthome'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import './product.styl'
import { toHexFormat } from 'antd/es/color-picker/color';

 class ProductWapper extends Component {
/*
     默认路由是一层层match,所以这里需要精确match. 如果是默认的话一match到product就不会往下处理了，所以要加exact
 */

  constructor(props){
    super(props)
    this.state={
      products:[],
      productsTotal:0,
      isLoading:false,
      searchType:'1',
      searchKeyWords:'',
      pagingPage:this.props.location.state?this.props.location.state.pagingPage:1,
      current:this.props.location.state?this.props.location.state.pagingPage:1,
    }
    
  }   

  //初始化table的列数据
  initalColumns=()=>{
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>{
          return '¥'+ price
        }
      },
      {
        width:150,
        title: '状态',
        dataIndex: 'status',
        render:(_,record)=>{
          if (record.status===1) {
            return <Space size="middle">
                     <span>在售</span>
                     <Button type='primary' danger onClick={()=>this.handelOnOrOffSale(record,0)}>下架</Button>
                   </Space>
          } else if(record.status===0) {
            return  <Space size="middle">
                      <span>停售</span>
                      <Button type='primary' onClick={()=>this.handelOnOrOffSale(record,1)}>上架</Button>
                    </Space>
          }
          else {
            return <span>售完</span>
          }
        }
      },
      {
        width:150,
        title: '操作',
        render:(_,record)=>{
          return <span>
                    <LinkButton onClick={()=>{this.props.navigate('/product/productdetail',{state:{record:record,pagingPage:this.state.pagingPage}})}}>详情</LinkButton>
                    <LinkButton>修改</LinkButton>
                 </span>
        }
      },
    ];

  }
  componentWillMount(){
    this.initalColumns()

  }
  handelOnOrOffSale=async (record,status)=>{
    console.log(status)
    const result = await reqCategoryUpdateStatus(record._id,status);
    const description = status?"上架":"下架"
    if (result.status==0) {
      if (status){
        notification.success({message:'成功',description:'商品名称:'+record.name+','+'操作:'+description+',结果:'+'成功',placement:'bottomRight',duration:2})  
      } else {
        notification.warning({message:'成功',description:'商品名称:'+record.name+','+'操作:'+description+',结果:'+'成功',placement:'bottomRight',duration:2})  
      }
      
      this.getProductsBySearch()
    } else{
      notification.error({message:'警告',description:'商品名称:'+record.name+','+description+'失败!!!',placement:'bottomRight',duration:3})  
      this.getProductsBySearch()
    }
  }

  //没有任何条件的搜索
  getProducts= async (pageNum=this.state.current)=>{
    this.setState({isLoading:true})
    const result = await reqProducts(pageNum);
    if (result.status==0) {
      this.setState({products:result.data.list})
      this.setState({productsTotal:result.data.total})
    } else{
      message.error('获取商品失败!')
    }
    this.setState({isLoading:false})

  }

  //有条件的搜索
  getProductsBySearch= async (pageNum)=>{
    const searchType = this.state.searchType
    const searchKeyWords = this.state.searchKeyWords
    const pageSize = PAGE_SIZE
    let searchName=null;
    let productName;
    let productDesc;
    if (this.state.searchType ==='1' && searchKeyWords.length>0){
      productName =searchKeyWords
    } else if (this.state.searchType ==='2' && searchKeyWords.length>0){
      productDesc =searchKeyWords
    } else {
      this.getProducts()
      return
    }
    const result = await reqProductsSearch(pageNum,pageSize,searchName,productName,productDesc);
    if (result.status===0) {
      this.setState({products:result.data.list})
      this.setState({productsTotal:result.data.total})
    } else{
      message.error('获取商品失败!')
    }
  }

  componentDidMount(){
    this.getProducts()
    console.log(this.props.location)
  }
  handleClick=()=>{
    this.props.navigate('/product/addupdate')

  }

  
  render() {
    const Option = Select.Option
    const pageSize = PAGE_SIZE
    const productsTotal = this.state.productsTotal
    const current = this.state.current
    const title=(
      <div className='card-title'> 
         <Select defaultValue={this.state.searchType} onChange={(value)=>this.setState({searchType:value})}>
           <Option value='1'>按名称搜索</Option>
           <Option value='2'>按描述搜索</Option>
         </Select>
         <Input placeholder='请输入关键字' onChange={(e)=>this.setState({searchKeyWords:e.target.value})}></Input>
         <Button type='primary' icon={<SearchOutlined />} onClick={()=>this.getProductsBySearch(1)}  >搜索</Button>
      </div>
    )

    const extra=(
      <Button type='primary'  icon={<AppstoreAddOutlined />}>添加商品</Button>
    )

    const products =  this.state.products
    
    return (
   
          <Card title={title} extra={extra} className='P-Card' >
            <Table rowKey='_id' dataSource={products} columns={this.columns} bordered size='small'
            pagination = {{ defaultPageSize:pageSize,current:current,total:productsTotal,onChange:(page)=>{ 
              if (this.state.searchKeyWords){
                this.getProductsBySearch(page)
                this.setState({pagingPage:page})
                this.setState({current:page})
              } else {
                this.getProducts(page)
                this.setState({pagingPage:page})
                this.setState({current:page})
              }
              }}}  >
               
            </Table>
          </Card>
       
    )
  }
}

function Product(props){ 
    const navigate=useNavigate()
    const location = useLocation()
    return <ProductWapper navigate={navigate}  location={location} props></ProductWapper>

}

export default Product