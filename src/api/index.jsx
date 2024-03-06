//包含应用中所有的结请

import axios from 'axios';
import jsonp from 'jsonp'
//每个函数返回都是promise
import ajax from "./ajax";
import { message } from 'antd';


import { PAGE_SIZE } from '../utils/constants';
/*
export  function reqLogin(username,password) {
    let url ='/login'
    let data= {username:username,password:password}
    ajax.ajax(url=url,data,'POST')

    */  

    
//箭头函数加return, 如果加了大括号，就要使用return
export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'post')

// export const reqAddUser=(username,password)=>ajax('/manage/user/add',{},'post')

//jsonp的请求数据
//https://api.openweathermap.org/data/2.5/weather?q=beijing&appid=5cd46ec997e82859d5712a6056f3a987

export const reqWeather=(city)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5cd46ec997e82859d5712a6056f3a987`
    return new Promise((resolve,reject)=>{
        let promise;
        promise = axios.get(url)
        promise.then((response)=>{
            resolve(response)
        }).catch(()=>{
            message.error('请求天气数据失败!')
        })
    })

}

//获取当前城市
export const reqCity=()=>{
    const url=`http://ip-api.com/json/`
    return new Promise((resolve,reject)=>{
        let promise;
        promise = axios.get(url)
        promise.then((response)=>{
            resolve(response)
        }).catch(()=>{
            message.error('请求城市数据失败!')
        })
    })

}



//获取分类

export const reqCategorys =(parentId)=> ajax('/api/manage/category/list',{parentId:parentId},'get') 

export const reqAddCategorys =(categoryName,parentId)=>ajax('/api/manage/category/add',{categoryName,parentId},'post') 

export const reqUpdateCategorys =({categoryId,categoryName})=>ajax('/api/manage/category/update',{categoryId,categoryName},'post') 

//删除分类
export const reqCategoryDelete =(categoryId)=> ajax('/api/manage/category/delete',{categoryId:categoryId},'post') 


//获取商品

export const reqProducts =(pageNum,pageSize=PAGE_SIZE)=> ajax('/api/manage/product/list',{pageNum:pageNum,pageSize:pageSize},'get') 

export const reqProductsSearch =(pageNum,pageSize=PAGE_SIZE,searchName,productName,productDesc)=> ajax('/api/manage/product/search',{pageNum:pageNum,pageSize:pageSize,searchName:searchName,productName:productName,productDesc:productDesc},'get') 


export const reqCategoryInfo =(categoryId)=> ajax('/api/manage/category/info',{categoryId:categoryId},'get') 
export const reqCategoryUpdateStatus =(productId,status)=> ajax('/api/manage/product/updateStatus',{productId:productId,status:status},'post') 



//删除商品
export const reqProductDelete =(productId)=> ajax('/api/manage/product/delete',{productId:productId},'post') 
//增加商品

export const reqProductAdd =(categoryId,pCategoryId,name,price,desc,status,imgs,detail)=> ajax('/api/manage/product/add',{categoryId:categoryId,pCategoryId:pCategoryId,name:name,price:price,desc:desc,status:status,imgs:imgs,detail:detail},'post') 

//修改商品
export const reqProductUpdate =(_id,categoryId,pCategoryId,name,price,desc,status,imgs,detail)=> ajax('/api/manage/product/update',{_id,categoryId:categoryId,pCategoryId:pCategoryId,name:name,price:price,desc:desc,status:status,imgs:imgs,detail:detail},'post') 



//删除图片

export const reqImgDelete =(name)=> ajax('/api/manage/img/delete',{name:name},'post') 


//获取角色列表
export const reqRoles =()=> ajax('/api/manage/role/list',{},'get') 

//创建角色
export const reqAddRole =(roleName)=> ajax('/api/manage/role/add',{roleName:roleName},'post') 


//修改角色权限
export const reqUpdateRole =(_id,name,menus)=> ajax('/api/manage/role/update',{_id:_id,name:name,menus:menus},'post') 


//修改角色权限
export const reqDeleteRole =(roleId)=> ajax('/api/manage/role/delete',{_id:roleId},'post') 

//获取用户
export const reqUser =(roleId)=> ajax('/api/manage/user/list',{},'get') 

//新增用户
export const reqAddUser =(user)=> ajax('/api/manage/user/add',user,'post') 
//删除用户
export const reqDeleteUser =(userId)=> ajax('/api/manage/user/delete',{userId:userId},'post') 

//更新用户
export const reqUpdateUser =(user)=> ajax('/api/manage/user/update',user,'post') 