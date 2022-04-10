//shopcart的小仓库
import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api/index'
const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,data){
        //data是一个数组
        state.cartList=data
    }
}
const actions={
   async getCartList(context)
    {
        const re=await reqCartList()
       if(re.code==200){
        context.commit('GETCARTLIST',re.data)
       }
    },
    //删除购物车某一个产品(通过id)
    //该接口不会返回数据，只用通知服务器要进行删除这个行为
    //async返回一个promise对象
    async deleteCartListBySkuId(context,skuId){
       const re= await reqDeleteCartById(skuId)
        if(re.code==200)
        {
            //如果成功返回ok,ok是一个非promise对象，会被处理成一个promiseSatus=fullfilled,promiseresult=ok的一个对象
            return 'ok'
        }
        else{
            //如果re.code不是200，则返回一个promise对象，该对象的promisestatus=rejected,promiseresult=fail;
            return Promise.reject(new Error('删除某个产品时出错了'))
        }
    },
    //修改购物车某个产品的状态
    async updateCheckedById(context,{skuId,isChecked})
    {
        let re=await reqUpdateCheckedById(skuId,isChecked)
        if(re.code==200)
        {
            return 'ok'
        }
        else{
            return Promise.reject(new Error('fail'))
        }
    },
    //删除已选中的商品
    deleteAllCheckedCart(context){
        //这里的context对应着一个大仓库
       let cartArr= context.getters.cartList.cartInfoList
       let promiseArr=[]
        cartArr.forEach((item,index,arr)=>{
            //这里调用了deleteCartListBySkuId函数,这个函数的返回值是一个promise对象
            let re=item.isChecked==1?context.dispatch('deleteCartListBySkuId',item.skuId):""
            //将返回的promise对象加入promiseArr数组中
            promiseArr.push(re);
        })
       return Promise.all(promiseArr)
     
    },
    //修改全选框
    //context里面的gettters是大仓库的getters,而state是小仓库（shopcart）的getters
   async updateAllCheckedCart(context,isChecked){
        let Checked=isChecked?"1":'0'
        let promiseArr=[]
       let arr=context.state.cartList[0].cartInfoList
       arr.forEach((item,index,arr)=>{
        let promise=context.dispatch('updateCheckedById',{skuId:item.skuId,isChecked:Checked})
        promiseArr.push(promise)
       })
       return Promise.all(promiseArr)
    }

}
const getters={
    //将数据简化，数组里面有个对象，对象里有又有数组，数组里面又有对象。
    //拿到数组里面的对象
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default({
    state,
    mutations,
    actions,
    getters
})
