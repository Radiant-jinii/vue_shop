//对axios进行封装
import axios from "axios"

//引入进度条
import nprogress from 'nprogress'
//引入store
import store from '@/store'
//引入进度条样式
import 'nprogress/nprogress.css'
//创建一个axios实例
const requests=axios.create({
   //基础路径
    baseURL:'/api',
    //代表请求超时时间5s
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    //在请求拦截器中发送uuid，让系统能唯一识别用户（游客）
    if(store.state.detail.uuid){
      
        //userTempId是和后台商量好的，后台会知道如何处理该请求头
        config.headers.userTempId=store.state.detail.uuid
    }
    //登录后发送获取用户信息之前的被拦截，然后执行该if语句
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
  
    nprogress.start()
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
return res.data
},(error)=>{
return Promise.reject(new Error('faile'))
})

export default requests