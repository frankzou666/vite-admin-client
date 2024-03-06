import React, { Component } from 'react'
import {Routes,Route,Navigate,BrowserRouter, useNavigate,useLocation} from 'react-router-dom'
import {Space,Card,Table,Button, Pagination,Modal,notification,Select, Input,message,List} from 'antd';
import {AppstoreAddOutlined, UserOutlined,HolderOutlined,IdcardOutlined,SearchOutlined ,ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons'

import {reqProducts,reqProductsSearch,reqCategoryInfo} from '../../api'
import LinkButton from '../../components/link-button';
import PicturesWall from './pictureswall'


import './productdetail.styl'

 class ProductDetailWapper extends Component {
  constructor(props){
    super(props)
    let imgs;
    if (this.props.location.state) {
      imgs= this.props.location.state.record.imgs
    }
    this.state={
      //通过转过来的路由，得到record
      record:this.props.location.state.record,
      pagingPage:this.props.location.state.pagingPage,
      category1:'',
      category2:'',
      imgs:imgs,
      
    }

  }
  async componentDidMount(){
    let result1;
    let result2;


    //获取分类信息
    // result = await reqCategoryInfo(this.state.record.pCategoryId );
    // if (result.status===0) {
    //   this.setState({category1:result.data.name})
    // }
    // result = await reqCategoryInfo(this.state.record.categoryId );
    // if (result.status===0) {
    //   this.setState({category2:result.data.name})
    // }
    
    //通过Promise.all同时并行发起多个请求
    const results = await Promise.all([ reqCategoryInfo(this.state.record.pCategoryId ),await reqCategoryInfo(this.state.record.categoryId )])
    if (results[0].status===0) {
      this.setState({category1:results[0].data.name})
    }
    if (results[1].status===0) {
      this.setState({category2:results[1].data.name})
    }

  }  
  
  render() {
    const Item = List.Item
    const {name,desc,price,detail} =this.state.record
    const {category1,category2,imgs} = this.state

    const title=(
      <div className='card-title'> 
         <LinkButton onClick={()=>this.props.navigate('/product',{state:{pagingPage:this.state.pagingPage}})}><ArrowLeftOutlined /></LinkButton>
         <span>商品详情</span>
      </div>
    )
    
    return (
      <Card title={title} className='P-productdetail'>
         <List>
           <Item className='productdetail-list'>
             <span className='productdetail-list-span-title'>商品名称:</span>
             <span className='productdetail-list-span-body'>{name}</span>
           </Item>
           <Item className='productdetail-list'>
             <span className='productdetail-list-span-title'>商品描述:</span>
             <span className='productdetail-list-span-body'>{desc}</span>
           </Item>
           <Item className='productdetail-list'>
             <span className='productdetail-list-span-title'>价格:</span>
             <span className='productdetail-list-span-body'>{price}</span>
           </Item>
           <Item className='productdetail-list'>
             <span className='productdetail-list-span-title'>所属分类:</span>
             <span className='productdetail-list-span-body'>{category1}  <ArrowRightOutlined /> {category2}</span>
           </Item>

           <Item className='productdetail-list'>
             <span className='productdetail-list-span-title'>商品图片:</span>
             <span className='productdetail-list-span-body'><PicturesWall imgs={imgs} disabled={true} showUploadList={{showRemoveIcon:false}}></PicturesWall></span>
           </Item>

           <Item className='productdetail-list'>
             <span className='productdetail-list-span-title'>商品详情:</span>
             <span className='productdetail-list-span-body' dangerouslySetInnerHTML={{__html:detail}}></span>
           </Item>
            
         </List>

      </Card>
    )
  }
}

function ProductDetail(props){ 
  const navigate=useNavigate()
  const location = useLocation()
  return <ProductDetailWapper navigate={navigate} location={location} props></ProductDetailWapper>

}

export default ProductDetail