<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return {
        defaultIndex:0
      }
    },
    mounted(){
      this.$bus.$on('changeDefaultIndex',this.changeDefaultIndex) //给事件总线绑定改变下标的事件
    },
    computed: {
      defaultImg(){
        return this.skuImageList[this.defaultIndex] || {}
      }
    },
    methods:{
      changeDefaultIndex(index){
        this.defaultIndex = index //改变了下标，defaultIndex被改变，默认显示的图片就会改变
      },

      move(event){
        let mask = this.$refs.mask
        let bigImg = this.$refs.bigImg

        let mouseX = event.offsetX
        let mouseY = event.offsetY
        let maskX = mouseX - mask.offsetWidth / 2
        let maskY = mouseY- mask.offsetHeight / 2

        if(maskX < 0){
          maskX = 0
        }else if(maskX > mask.offsetWidth){
          maskX = mask.offsetWidth
        }

        if(maskY < 0){
          maskY = 0
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight
        }

        //设置遮罩的位置
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'

        //设置大图的位置
        bigImg.style.left = -2 *maskX + 'px'
        bigImg.style.top = -2 *maskY + 'px'
      } 
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>