

//照片墙 自定义封装组件

import React, { Component } from 'react';

import {Space,Card,Table,Button,Modal,notification,Select, Input,message,Cascader,Form,Upload} from 'antd';

import {reqProducts,reqProductsSearch,reqImgDelete} from '../../api'

import {BASE_IMG_URL} from '../../utils/constants'

export default class PicturesWall extends Component {
  constructor(props) {
    super(props)
    let fileList=[]
    const {imgs} = this.props
    if (imgs && imgs.length>0) {
      fileList = imgs.map((img,index)=>({
           uid:-index,
           name : img,
           status : 'done',
           url:BASE_IMG_URL + img
      }))
    }

    this.state ={
      //定义图片的来源,如果以前修，就从父组件中取
      fileList: fileList,
      previewOpen:false,
      previewImage:'',
      previewTitle:'',
    }

  }

 getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  handleChange = async ({file,fileList}) => {
    if(file.status==='done') {
      const response = file.response
      setTimeout(()=>{},500)
      if (response.status===0) {
        const {name,url} =response.data
        //当文件上传成功后，最后一个文件的list,要改成服务器端返回的name和url
        file = fileList[fileList.length-1]
        file.name= name
        file.url=url   
        this.props.getImages(fileList)
        message.success('上传文件成功')
      } else {
        message.error('上传文件失败!')
      }
    //删除文件  
    } else if (file.status==='removed') {
        const result = await reqImgDelete(file.name)
        if (result.status==0) {
          message.success('删除图片成功')
          this.props.getImages(fileList)
        } else {
          message.error('删除图片失败')
        }
    }
    
    this.setState({fileList:fileList})
    //调用父组件的函数，把数据传回去
    
  };

  componentDidMount=()=>{

  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.setState({previewImage:file.url || file.preview})
    this.setState({previewOpen: true})
    this.setState({previewTitle: file.name})
 }   

  handleCancel=()=> {
    this.setState({previewOpen: false})
  }

  
  render() {
    const {fileList,previewTitle,previewOpen,previewImage} = this.state
    const { showUploadList,disabled} = this.props
    return (
        <>
          <Upload
            action="/api/manage/img/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            accept="image/*"
            name="image"
            showUploadList = {showUploadList}
            disabled ={disabled}
          >
            上传
          </Upload>
          <Modal  open={previewOpen} title={previewTitle} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage}/>
          </Modal>
        </>
      );
  }
  
}
