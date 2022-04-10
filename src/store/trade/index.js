import {reqAddressInfo,reqOrderInfo} from "@/api"
const state={
    address:[],
    orderInfo:{}
}
const mutations={
    GETADDRESSINFO(state,data){
        state.address=data
    },
    GETORDERINFO(state,data){
        state.orderInfo=data
    }
}
const actions={
    //获取用户地址信息
   async getAddressInfo(context)
    {
      let promiseResult= await reqAddressInfo()
      if(promiseResult.code==200){
       context.commit('GETADDRESSINFO',promiseResult.data)
      }
    },
    //获取交易页面物品数据
   async getOrderInfo({commit}){
       let promiseResult= await reqOrderInfo()
       if(promiseResult.code==200){
        commit("GETORDERINFO",promiseResult.data)
       }
    }
}

export default({
    state,
    mutations,
    actions
})
