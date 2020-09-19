//1引入并声明使用
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)//声明使用

import routes from './routes'

import store from '@/store'

//2必须往外暴露一个路由器对象
// this.$router.push   this.$router就是VueRouter的实例化对象

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location,onResolved,onRejected){
  if(onResolved === undefined && onRejected === undefined){
    //代表没有传递处理的回调无论是成功还是失败
    return originPush.call(this,location).catch(() => {})
  }else{
    return originPush.call(this,location,onResolved,onRejected)
  }
}
VueRouter.prototype.replace = function(location,onResolved,onRejected){
  if(onResolved === undefined && onRejected === undefined){
    //代表没有传递处理的回调无论是成功还是失败
    return originReplace.call(this,location).catch(() => {})
  }else{
    return originReplace.call(this,location,onResolved,onRejected)
  }
}
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


// 必须登录后才能访问的多个界面使用全局守卫（交易相关、支付相关、用户中心相关）
router.beforeEach((to, from, next) => {
  // 全局导航守卫    一般都是多个页面路由跳转的时候用到，每个路由跳转的时候都要去解析的
  //to    目的地路由对象
  //from  出发的路由对象
  //next  放行不放行的函数
    // 参数为空  代表放行
    // 参数为false 代表中断
    // 参数为指定的路径  代表跳转到指定的路径对应的页面
    let targetPath = to.path
    if(targetPath.indexOf('/pay') === 0 || targetPath.startsWith('/trade') || targetPath.startsWith('/center')){
      if(store.state.user.userInfo.name){
        next()
      }else{
        //去到登录页  并且把本来想去的目标路径存起来，以保证后面登录后可以去到之前想去的地方
        next('/login?redirect='+targetPath)
      }
    }else{
      next() //放行
    }
})



export default router

//3、必须在vue当中去注入（使用）路由器对象 main.js当中去注入