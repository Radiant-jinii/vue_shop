import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入路由
import router from '@/router'

//引入vuex
import store from '@/store'

//引入api
import * as API from '@/api'

//引入swiper
import 'swiper/css/swiper.css'
//引入element-ui
import { MessageBox ,Button} from 'element-ui'
//全局注册Button组件
Vue.component(Button.name,Button)
//注册element-ui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
//导入懒加载图片
import zhenghuan from '@/assets/1.jpg'
Vue.use(VueLazyload,{
  loading:zhenghuan
})

//注册全局组件--TypeNav
import TypeNav from '@/components/TypeNav'
//注册轮播图组件
import Carousel from '@/components/Carousel'
//注册分页器组件
import Pagination from "@/components/Pagination"
Vue.component("TypeNav", TypeNav)
Vue.component("Carousel",Carousel)
Vue.component("Pagination",Pagination)
//引入Mockserve.js
import "@/mock/mockServer";



//测试
// import {reqCategoryList} from '@/api/index'
// reqCategoryList();
// myaxios();




//导入自定义插件
import vue_upper from '@/plugins/myplugins'
Vue.use(vue_upper,{
  name:'upper'
})
new Vue({
  render: h => h(App),
  //引入全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
   
  },
  router,
  //vue实例多了$store属性
  store

}).$mount('#app')