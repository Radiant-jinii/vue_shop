import {
  reqCategoryList,
  reqGetBannerList,
  reqFloorList
} from '@/api'

const state = {
  categorylist: [],
  bannerList: [],
  floorList: [],

};
const mutations = {
  CATEGORYLIST(state, categorylist) {
    state.categorylist = categorylist
  },
  GETBANNERLIST(state, data) {


    state.bannerList = data
  },
  GETFLOORLIST(state, data) {
    state.floorList = data
  },
  GETSEARCHLIST(state, data) {
    state.searchList = data
  }
};
const actions = {
  // 发请求了，获取服务器的数据
  async categoryList(context) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      context.commit('CATEGORYLIST', result.data)
    }
  },
  async getBannerList(context) {

    let result = await reqGetBannerList();
    if (result.code == 200) {
      context.commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList(context) {
    let re = await reqFloorList()
    if (re.code == 200) {
      context.commit('GETFLOORLIST', re.data)
    }
  },
  // test(){
  //   console.log('测试一下，shopcart下面的$store里面的dispatch能不能调用home里面的actions');
  // }


}
const getters = {

}
export default ({
  // namespaced:true,

  state,
  mutations,
  actions,
  getters
})