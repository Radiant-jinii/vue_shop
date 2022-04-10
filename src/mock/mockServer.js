//引入mock.js
import Mock from 'mockjs'
//引入js格式的数据
//JSON数据格式默认对外暴露。
//webpack默认对外暴露：图片，JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
Mock.mock("/mock/banner",{
    code:200,data:banner
})
Mock.mock('/mock/floor',{
    code:200,
    data:floor
})