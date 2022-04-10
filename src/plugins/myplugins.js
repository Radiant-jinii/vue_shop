let vue_upper={}
vue_upper.install=function(vue,options){
    //为插件加上自定义指令v-upper
    //为哪个元素加入v-upper指令，element就是哪个元素，params可以拿到对应的值（参数，修饰符等等）
vue.directive(options.name,(element,params)=>{
element.innerHTML=params.value.toUpperCase()
})
}
export default vue_upper
