//发送一个异步请求的ajax


//函数返回值是promise对像，为什么要返回promise对像
import axios from "axios";

import {message} from 'antd'





export default function ajax(url,data={},type='get'){

        return new Promise((resolve,reject)=>{
            let promise 
            if (type==='get') {
                //params是对像类像，
                promise = axios.get(url,{params:data})
        
            } else {
                promise=axios.post(url,data)
            }
            promise.then((response)=>{
                resolve(response.data)

            }).catch((error)=>{
                message.error(error.message)
            }
            )
        })

        
   
    
}



