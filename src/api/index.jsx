//包含应用中所有的结请

//每个函数返回都是promise
import ajax from "./ajax";

/*
export  function reqLogin(username,password) {
    let url ='/login'
    let data= {username:username,password:password}
    ajax.ajax(url=url,data,'POST')

    */  

    
//箭头函数加return, 如果加了大括号，就要使用return
export const reqLogin=(username,password)=>ajax('/api/login',{username,password},'post')

export const reqAddUser=(username,password)=>ajax('/manage/user/add',{},'post')

