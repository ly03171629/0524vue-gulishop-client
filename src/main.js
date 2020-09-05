import App from '@/App'
// import Vue from 'vue/dist/vue.esm.js' 带解析器的vue版本
import Vue from 'vue'

Vue.config.productionTip = false

// 麻烦写法
//定义组件（本质是定义了一个组件对象的构造函数）
// let VueComponent = Vue.extend({
//   data(){

//   },
//   template:'<h2>你好啊</h2>'
// })

// //注册组件
// Vue.component('myh',VueComponent) //本质给构造函数和一个名字进行关联


// //使用组件  <myh />


// 简单写法
// 定义带注册
// Vue.component('myh',{
//     data(){
  
//     },
//     template:'<h2>你好啊</h2>'
//   })

// 使用
{/* <myh /> */}

// Vue.component('App',App) //定义带注册



new Vue({
  el:'#app',
  render: h => h(App) //1、定义带注册  2、使用组件  3、渲染（依赖vue的一个loader去解析的vue-template-compiler）


  //1、注册App组件进行使用 不过缺少解析器没法渲染。想用必须导入带解析器的版本js
  // components:{
  //   App:App   //定义带注册  上面导入的App是定义组件所需的配置对象
  // },
  // template:'<App />' 
})
