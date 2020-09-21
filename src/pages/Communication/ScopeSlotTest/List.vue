<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="todo.id">
      <slot :todo="todo" :index="index">
        <!-- :todo="todo" 写在slot里面就不是props传递属性，而是子给父传递的数据(对象)当中的一个 -->
        {{todo.text}}
      </slot>
    </li>
  </ul>


  <!-- 默认插槽和具名插槽 -->
  <!-- <div>
    <h2>我爱你赵丽颖</h2> -->
    <!-- 留坑 给父组件准备的  父组件可以添这个坑  父组件可以给子组件传递数据（包含结构的数据） -->
    <!-- 默认插槽 -->
    <!-- <slot name="yangmi">
      我爱你杨幂 -->
      <!-- 我爱你杨幂 是坑里面的默认内容  如果爹给传递过来数据，那么这个内容就被替换成传递过来的数据
      如果爹没有传递过来内容，那么就是默认内容
      -->
    <!-- </slot> -->

    <!-- <slot>

    </slot> -->

  <!-- </div> -->
</template>

<script>
export default {
  name: 'List',
  props: ['todos']
}
</script>