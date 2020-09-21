<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    
    <child :aaa="'bbb'" xxx="yyy" ccc="123" @abc="test1" @bcd="test1"></child>

    <!-- <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
    <el-button type="info" icon="el-icon-delete" size="mini"></el-button> -->


    <HintButton type="primary" icon="el-icon-plus" size="mini" title="添加"></HintButton>
    <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除"></HintButton>


    <!-- click 和 dblclick都是自定义事件，因为是在组件标签身上添加的
    click事件点击会调用回调    因为子组件内部已经触发调用了这个事件回调
    dblclick事件双击 不会调用回调  因为子组件内部没有触发调用这个事件回调，
                    如果还要去使用，就可以使用native强制变为原生dom事件去使用
    -->
    <el-button type="primary" icon="el-icon-info" @click="test1" @dblclick.native="test1"></el-button>


  </div>
</template>

<script type="text/ecmascript-6">
import Child from '@/pages/Communication/AttrsListenersTest/Child'
import HintButton from '@/pages/Communication/AttrsListenersTest/HintButton'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      test1(){
        console.log(111)
      }
    },
    components:{
      Child,
      HintButton
    }
  }
</script>
