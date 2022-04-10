import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);
//引入路由信息
import routes from "./routes";
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  //配置路由
  routes,
  //配置滚动行为，使路由跳转时，页面的滚动条加载在顶部
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { y: 0 };
  },
});
export default router;
//路由的全局守卫（前置守卫）
router.beforeEach(async (to, from, next) => {
  //到哪个路由去（包含了路由的path,quert,params参数）
  //console.log("to=",to)
  //从哪个路由来（包含了路由的path,quert,params参数）
  // console.log("from=",from)
  //全部放行
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //已经登录
    if (to.path == "/login" || to.path == "/register") {
      //已经登录想去login,不行，导去home
      next("/home");
    } else {
      //已经登录去其他页面
      if (name) {
        next();
        // console.log("还有name呢");
      } else {
        try {
          let re = await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //发送求失败，说明token失效了
          console.log(error);
          await store.dispatch("userLoginout");
          next("/login");
        }
      }
    }
  } else {
    //没有登录
    //全部通行
    //没有登录不能去trade/pay/paysuccess

    ///一个需求，当用户未登录点击我的订单时，先将用户引去登录，然后直接帮用户跳转到我的订单里面去
    let toPath = to.path;
    console.log(toPath);
    if (
      toPath.indexOf("trade") != -1 ||
      toPath.indexOf("pay") != -1 ||
      toPath.indexOf("center") != -1
    ) {
      next(`/login?redirect=${toPath}`);
    }
    next();
  }
  //next()
});
