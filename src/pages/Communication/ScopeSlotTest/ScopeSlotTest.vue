<template>
  <div>
    <!-- 默认插槽和具名插槽 是父组件要给子组件传递带结构的数据（带标签） -->
    <!-- <List>
      <template>
        <button>按钮1</button>
      </template>
      <template slot="yangmi">
        <button>按钮2</button>
      </template>
    </List>

    <List>
      <template>
        <button>按钮1</button>
      </template> 
      <template slot="yangmi">
        <h1>我爱你</h1>
      </template>
    </List>

    <List>
      <template>
        <button>按钮1</button>
      </template>
      <template slot="yangmi">
        <h1>我恨你</h1>
      </template>
    </List> -->


    <!-- 作用域插槽：
          数据是在子组件当中去展示的，而子组件当中展示数据的结构是由父组件决定的
          父子之间进行通信，数据可以从父传递给子   为了让子去展示数据
          子在展示数据的时候，可以把展示的数据传递给父，让父去给数据添加结构
    -->

    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- slot-scope="slotProps" 是父组件接收到子组件传递的数据组成的对象-->
    <!-- <List :todos="todos">
      <template slot-scope="slotProps">
        <span style="color:green" v-if="slotProps.todo.isComplete">
          {{slotProps.todo.text}}
        </span>
        <span v-else>{{slotProps.todo.text}}</span>
      </template>
    </List> -->
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :todos="todos">
      <template slot-scope="{todo,index}">
        <span :style="{color:index%2 === 0?'hotpink':'skyblue'}">{{index+1}} {{todo.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List
    }
  }
</script>
