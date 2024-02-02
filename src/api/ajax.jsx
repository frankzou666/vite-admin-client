//发送一个异步请求的ajax


//函数返回值是promise对像，为什么要返回promise对像
import axios from "axios";

import {message} from 'antd'



const BASE_URL ='http://localhost:5500'

export default function ajax(url,data={},type='get'){

        if (type==='get') {
            //params是对像类像，
            return  axios.get(url,{params:data})
    
        } else {
            return  axios.post(url,data)
    
        }
   
    
}



