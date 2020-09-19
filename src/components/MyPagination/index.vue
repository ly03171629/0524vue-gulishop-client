<template>
  <div class="pagination">
    <button :disabled="currentPageNum === 1" @click="$emit('changePageNum',currentPageNum - 1)">上一页</button>
    <button v-if="startEnd.start > 1" @click="$emit('changePageNum',1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor和vif如果一起使用vfor优先级高于vif -->
    <button
      v-for="(page) in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{active:currentPageNum === page}"
      @click="$emit('changePageNum',page)"
    >{{page}}</button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <button v-if="startEnd.end < totalPageNum" @click="$emit('changePageNum',totalPageNum)">{{totalPageNum}}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changePageNum',currentPageNum + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  // props:['currentPageNum']   数组写法最简单，但是缺点没法指定数据类型
  // props:{                    对象的简便写法 它可以指定数据类型，严格了一些，但是还是不够严格
  //   currentPageNum:Number
  // }
  props: {
    currentPageNum: {
      type: Number,
      default: 1,
    },
    pageSize: Number,
    total: Number,
    continueNum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPageNum() {
      return Math.ceil(this.total / this.pageSize);
    },

    startEnd() {
      //要想计算连续页的起始位置和结束位置
      //和三个数据又关系  当前页码  连续数量  总页数
      let { currentPageNum, continueNum, totalPageNum } = this;
      let start, end, disNum;
      if (totalPageNum <= continueNum) {
        //连续页数比总页数还大，那么1就是起始  总页数就是结束
        start = 1;
        end = totalPageNum;
      } else {
        //首先计算正常情况
        start = currentPageNum - Math.floor(continueNum / 2);
        end = currentPageNum + Math.floor(continueNum / 2);

        if (start <= 1) {
          //左侧边界修正
          disNum = 1 - start; //指的是算出的start和1之间的差值，为了后面去修正算出来的start和end
          start += disNum;
          end += disNum;
        }

        if (end >= totalPageNum) {
          //右侧边界修正
          disNum = end - totalPageNum;
          start -= disNum;
          end -= disNum;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

