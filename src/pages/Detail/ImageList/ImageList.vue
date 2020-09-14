<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id">
        <img
          :src="img.imgUrl"
          :class="{active:index === defaultIndex}"
          @click="changeDefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      defaultIndex: 0,
    };
  },
  methods:{
    changeDefaultIndex(index){
      this.defaultIndex = index //为了让自己变化橙色的边框
      this.$bus.$emit('changeDefaultIndex',index) //通知zoom组件改变下标
    }
  },
  watch: {
    skuImageList: {
      immediate: true, //添加这个东西没意思，只是让两边的代码一样
      handler() {
        //监视哪个数据变化之后所执行的函数
        //放在这里能保证我们的bannerList内一定有数据，但是还是不能保证结构完全形成
        this.$nextTick(() => {
          //这个回调是nextTick的回调，nextTick会等待页面dom最近一次循环更新结束之后才会执行它内部传递的回调
          //updated也可以实现，但是并不是最近一次更新，而是所有的更新都会执行这个钩子（updated）
          new Swiper(this.$refs.imgSwiper, {
            // loop: true, // 循环模式选项
            // 如果需要分页器

            slidesPerView : 5, //代表每屏显示几张
            slidesPerGroup : 5, //没滑动一次滑动多少张

            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>