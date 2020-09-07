<template>
  <div id="app">
    <Header></Header> 
    <!-- 写一个组件标签  代表着实例化了一个组件对象 -->
    <router-view></router-view>
    <!-- <Footer v-show="!($route.path==='/login'|| $route.path === '/register')"></Footer> -->
    <Footer v-show="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>

