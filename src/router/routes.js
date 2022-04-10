//引入组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Test from '@/pages/Test'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
//配置路由
export default[
    {
        //带上参数
        path:"/center",
        component:Center,
        meta:{
            show:true
        },
        children:[
            {
                path:'/center/myorder',
                component:myOrder
            },
            {
                path:'/center/grouporder',
                component:groupOrder
            },
        ]
    },
    {
        //带上参数
        path:"/test",
        component:Test,
        meta:{
            show:true
        }
    },
    {
        //带上参数
        path:"/paysuccess",
        component:PaySuccess,
        meta:{
            show:true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/pay'){
                next()
            }
            else{
                next(false)
            }
        }
    },
    {
        //带上参数
        path:"/pay",
        component:Pay,
        meta:{
            show:true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }
            else{
                next(false)
            }
        }
    },
    {
        //带上参数
        path:"/trade",
        component:Trade,
        meta:{
            show:true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }
            else{
                next(false)
            }
        }
    },
    {
        //带上参数
        path:"/shopcart",
        component:ShopCart,
        meta:{
            show:true
        }
    },
    {
        //带上参数
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{
            show:true
        }
    },
    {
        //带上参数
        path:"/detail/:skuId",
        component:Detail,
        meta:{
            show:true
        }
    },
    {
        path:"/home",
        component:Home,
        meta:{
            show:true
        }
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{
            show:true
        },
        name:'search',
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{
            show:false
        }
    },
    {
        path:"/register",
        component:Register,
        meta:{
            show:false
        }
    },
    //重定向：在项目跑起来时，定向在某一页面
    {
        path:'*',
        redirect:'/home'
    }
]