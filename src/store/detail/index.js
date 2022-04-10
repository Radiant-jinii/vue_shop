import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    uuid:getUUID()
}
const mutations={
    GETGOODSINFO(state,data){
        state.goodInfo=data
    }
}
const actions={
   async getGoodsInfo(context,skuId){
      let re=  await reqGoodsInfo(skuId)
      if(re.code==200){
          context.commit('GETGOODSINFO',re.data)
      }
    },
    //向服务器发送请求，让服务器知道加入购物车物品的id和number,服务器并不会返回数据
   async addOrUpdateShopCart(context,{skuId,skuNum}){
  const re=  await reqAddOrUpdateShopCart(skuId,skuNum)
    //  async返回的是一个promise对象
    if(re.code==200)
    {
        return 'ok'
    }
    else{
        return Promise.reject(new Error('file'))
    }
 
    }
}
const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state)
    {
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default({
    state,
    mutations,
    actions,
    getters
})
