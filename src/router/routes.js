// import Home from '@/pages/Home'
// import Search from '@/pages/Search'


const Home = () => import('@/pages/Home')   //使用的时候单独打包文件加载
const Search = () => import('@/pages/Search')   //使用的时候单独打包文件加载

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


import store from '@/store'

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
    component:Trade,
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopcart'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/pay',
    component:Pay,
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart
  },

  
  {
    path:'/addcartsuccess',
    component:AddCartSuccess,
    //只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if(skuNum && skuInfo){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/home',
    component:Home   //Home是一个函数，当你要使用component对应的组件的时候，它会调用对应的Home函数
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
    },
    // beforeEnter: (to, from, next) => {
    //   if(store.state.user.userInfo.name){
    //     next('/')
    //   }else{
    //     next()
    //   }
    // }
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

  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
  
]