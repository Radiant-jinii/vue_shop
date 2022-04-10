import { reqGetSearchInfo } from "@/api";

const state={
searchList:{}
};
const mutations={
    GETSEARCHLIST(state,data){
        state.searchList=data
    }
};
const actions={
    async  getSearchList(context,params={}){
        let re=await reqGetSearchInfo(params)
        
        if(re.code==200){
            context.commit("GETSEARCHLIST",re.data)
           
        }
     }
  
};
const getters={
    //这个state使当前文件的state,不是最大那个state
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]

    },
    attrsList(state){
        return state.searchList.attrsList||[]

    }

};
export default({
state,
mutations,
actions,
getters
})