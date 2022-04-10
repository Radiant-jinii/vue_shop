//导入uuid包
import {v4 as uuidv4} from 'uuid';
export const getUUID=()=>{
    // 从本地存储获取是否有uuid_token,没有就生成一个
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
    
}