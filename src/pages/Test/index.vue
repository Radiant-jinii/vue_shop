<template>
  <el-button type="primary" icon='el-icon-star-off' @click="open">测试</el-button>

</template>

<script>
import QRCode from 'qrcode'
export default {
name:'test',
methods:{
  async open(){
    let url=await QRCode.toDataURL("wxp://f2f0QLf4I3D3pRkZc_OYwHG6ti4-5t_DSS9k9Lio-JpGC0oLhvrN6OviqIjLWWx5Tg7X")
    console.log(url);
      this.$alert(`<img src=${url} />`, 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
  }
}
}
</script>

<style>

</style>