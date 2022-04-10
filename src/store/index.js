import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import search from '@/store/search'
import home from '@/store/home'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import user from '@/store/user'
import trade from "@/store/trade"
export default new Vuex.Store({
modules:{
    search,
    home,
    detail,
    shopcart,
    user,
    trade
   
}
})