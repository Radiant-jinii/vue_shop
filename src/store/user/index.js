import { reqGetCode, reqUserLogin, reqUserRegister ,reqUserInfo,reqUserLoginOut} from "@/api"

const state={
    code:'',
    token:localStorage.getItem("TOKEN"),
    userInfo:'',
}
const mutations={
    GETCODE(state,data){
        state.code=data
    },
    USERLOGIN(state,data)
    {
        state.token=data
    },
    //这里的state是小仓库，getters里面的state也是小仓库
    GETUSERINFO(state,data){
        state.userInfo=data
    },
    //清除用户信息
    CLEAR(state){
        state.userInfo={},
        state.token='',
        window.localStorage.removeItem("TOKEN")
    }
}
const actions={
    //获取验证码
   async getCode({commit},phone){
       let promiseResult=await reqGetCode(phone)
      if(promiseResult.code=200){
        commit('GETCODE',promiseResult.data)
        return 'ok'
      }
      else{
          return Promise.reject(new Error("验证码获取失败"))
      }
    },
    //用户注册
   async userRegister(context,user){
      
      let promiseResult =await reqUserRegister(user)
      if(promiseResult.code==200){
          //该请求发送成功
          return 'ok'
      }
      else{
          //如果返回不是200,说明接口拿数据失败了
          return Promise.reject(promiseResult.message)
      }
    },
    //用户登录
    async userLogin(context,data){
       let promiseResult=await reqUserLogin(data)
       if(promiseResult.code==200){
           context.commit('USERLOGIN',promiseResult.data.token)
           localStorage.setItem('TOKEN',promiseResult.data.token)
           return 'ok'
       }
       else{
           return Promise.reject(promiseResult.message)
       }
    },
    //获取用户登录后的信息
    async getUserInfo({commit}){
        let promiseResult=await reqUserInfo()
       if(promiseResult.code==200){
        commit("GETUSERINFO",promiseResult.data)
        
       }
    },
    //退出登录
   async userLoginout({commit}){
        //发送请求
      let promiseResult= await reqUserLoginOut()
      if(promiseResult.code==200){
        commit("CLEAR")
        return 'ok'
      }
      else{
          return Promise.reject(new Error("fail"))
      }
    }

}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}
