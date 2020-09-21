<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生的dom事件 
    原生的dom事件类型在html标签身上就是原生dom事件
    原生的dom事件类型在组件标签身上就是自定义事件
    原生的dom事件类型在组件标签身上，如果想成为原生dom事件，那么需要加修饰符 .native,事件监听添加给了子组件的根元素
    -->
    <button @click="test1('杨幂',$event)">我爱你赵丽颖</button>
    <Event1 @click.native="test2"></Event1>


    <br>
    <br>
    <br>

    <!-- 自定义事件 
    自定义事件添加在html标签身上,无意义，也不会这么干，因为没办法触发调用
    自定义事件添加在组件标签身上，有意义
    原生的dom事件类型如果添加在组件标签身上，也是自定义事件

    -->
    <!-- <button @xxx="test3">我爱你杨幂</button> -->
    <Event2 @xxx="test3" @click="test3"></Event2>  

  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
      test1(name,event){
        console.log(event.target.innerHTML,name)
      },
      test2(event){
        console.log(event.target.innerHTML) 
      },
      test3(event){
        //event是事件的回调默认参数，这个默认值不一定是事件对象
        //如果是原生dom事件的回调，那么就是事件对象
        //如果是自定义事件的回调，那么就是自定义事件触发时候自己传递的参数，有就有没有就是undefined
        console.log(event)
        console.log(event.target.innerHTML)//报错
      },
      
    }
  }
</script>
