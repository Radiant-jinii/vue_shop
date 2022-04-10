//对axios进行封装
import axios from "axios"

//引入进度条
import nprogress from 'nprogress'

//引入进度条样式
import 'nprogress/nprogress.css'
//创建一个axios实例
const requests=axios.create({
   //基础路径
    baseURL:'/mock',
    //代表请求超时时间5s
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
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