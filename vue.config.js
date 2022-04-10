module.exports={
    lintOnSave:false,
    //配置服务器
    devServer:{
        //配置代理服务器
       proxy:{
           //代理服务器看到api就将请求转发给target
        '/api':{
            target:'http://39.98.123.211',
            // pathRewrite: { '^/api': '' },
        }
       }
    },
  
}