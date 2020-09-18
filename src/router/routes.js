import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'',
        redirect: 'myorder'
      }
      
    ]
  },
  {
    path:'/trade',
    component:Trade
  },
  {
    path:'/pay',
    component:Pay
  },
  {
    path:'/paysuccess',
    component:PaySuccess
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/search/:keyword?',//?代表这个params参数可传可不传
    component:Search,
    name:'search',
    // props:true
    //props这个属性用来配置传递参数的简便方式，就是把参数作为属性映射到组件当中
    //1、布尔值   如果写为true  代表路由对象把接收的params参数作为属性映射到要显示的路由组件当中
    // props:{name:'zhaoliying'}
    //2、对象写法 如果写为对象，目的是额外的往要显示的路由组件当中传递一些静态数据用的
    //3、函数写法 函数写法是用的最多的，因为它不但可以映射params还可以映射query
    // props(route){
    //   //把路由对象接收到的参数，无论是什么参数，自己手动映射为路由组件的属性
    //   return {keyword:route.params.keyword,keyword2:route.query.keyword2}
    // }

  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHide:true
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHide:true
    }
  },
  {
    path:'/',
    redirect:'/home'
  },
  
]