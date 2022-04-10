<template>
  <div>
    <!-- 自定义指令测试 -->
    <!-- <div v-upper="msg"></div> -->
    <Header />
    <!-- 路由组件出口位置 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  data(){
    return{
      msg:'abc'
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted(){
    //派发一个actions，获取商品分类信息
     this.$store.dispatch("categoryList");
  }
};
</script>

