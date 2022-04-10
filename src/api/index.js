//接口统一管理
import requests from './request'
//
import mockRequests from './mockAjax'


//三级联动接口
export const reqCategoryList=()=>{
    return requests({
        url:"/product/getBaseCategoryList",
        methods:'get'

    })
}
//关于代理服务器的一个小测试，获取刘德华的百度百科
// export const myaxios=()=>{
//     requests({
//         url:"/doc/1287918-1361771.html",
//         methods:'get'

//     })
// }
 

//获取bnanner(Home首页轮播图接口)
export const reqGetBannerList=()=>{
   return  mockRequests.get('/banner')
}

//获取floorlist的数据
export const reqFloorList=()=>{
    return mockRequests.get('/floor')
}

//获取Search里面的数据
export const reqGetSearchInfo=(params)=>{
  return requests({
        url:'/list',
        method:'post',
        data:params
    })
}

//获取详情页的信息 detail  URL:/api/item/{skuid} 请求方式:get
export const reqGoodsInfo=(skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:"get"
    })
}
//添加购物车/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}
//获取购物车信息
///api/cart/cartList
export const reqCartList=()=>requests({
    url:'/cart/cartList',
    method:'get'
})
//写完接口写仓库，写完仓库有数据则拿数据，没有数据则进行下一步操作
//删除购物车产品的接口
///api/cart/deleteCart/{skuId}
export const reqDeleteCartById=function(skuId){
   return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}
//修改状态的接口 ischecked
///api/cart/checkCart/{skuId}/{isChecked}
//商品选中状态0代表取消选中1代表选中
export const reqUpdateCheckedById=(skuId,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
    
}
//从服务器里面获取验证码
///api/user/passport/sendCode/{phone}  get
export const reqGetCode=(phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}
//用户注册接口
///api/user/passport/register
//post请求，带三个参数（phone,password,code）
export const reqUserRegister=(data)=>{
    return requests({
        url:"/user/passport/register",
        //向服务器传数据
        data,
        method:'post'
    })
}
//用户登录接口
///api/user/passport/login
//post
//带两个参数：phone,password
export const reqUserLogin=(data)=>{
    return requests({
        url:"/user/passport/login",
        data,
        method:'post'
    })
}

//登录后要拿到用户信息
//api/user/passport/auth/getUserInfo
export const reqUserInfo=()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//用户退出登录，需要告诉服务器删除用户的token
///api/user/passport/logout   get
export const reqUserLoginOut=()=>{
 return requests({
     url:'/user/passport/logout',
     method:'get'
 })
}

///api/user/userAddress/auth/findUserAddressList
//获取用户地址信息
//get

export const reqAddressInfo=()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

//获取订单交易页数据
///api/order/auth/trade
//get
export const reqOrderInfo=()=>{
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}

//提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=>{
return requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})
}

//获取订单支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayInfo=(orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })

}

//查询支付状态
///api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>{
return requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
}

//获取我的订单列表
///api/order/auth/{page}/{limit}
export const reqGetMyOrder=(page,limit)=>{
return requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})
}
