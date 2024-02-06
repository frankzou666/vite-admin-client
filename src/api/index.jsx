//包含应用中所有的结请

import axios from 'axios';
import jsonp from 'jsonp'
//每个函数返回都是promise
import ajax from "./ajax";
import { message } from 'antd';

/*
export  function reqLogin(username,password) {
    let url ='/login'
    let data= {username:username,password:password}
    ajax.ajax(url=url,data,'POST')

    */  

    
//箭头函数加return, 如果加了大括号，就要使用return
export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'post')

export const reqAddUser=(username,password)=>ajax('/manage/user/add',{},'post')

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


