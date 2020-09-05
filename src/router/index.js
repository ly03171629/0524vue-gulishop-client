//1引入并声明使用
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)//声明使用

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//2必须往外暴露一个路由器对象
export default new VueRouter({
  routes:[
    {
      path:'/home',
      component:Home
    },
    {
      path:'/search',
      component:Search
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
    }
  ]
})

//3、必须在vue当中去注入（使用）路由器对象 main.js当中去注入