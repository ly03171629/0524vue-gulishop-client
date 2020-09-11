<template>
  <div class="swiper-container" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "SliderLoop",
  props:['bannerList'],
  watch: {
    bannerList: {
      immediate: true, //添加这个东西没意思，只是让两边的代码一样
      handler() {
        //监视哪个数据变化之后所执行的函数
        //放在这里能保证我们的bannerList内一定有数据，但是还是不能保证结构完全形成
        this.$nextTick(() => {
          //这个回调是nextTick的回调，nextTick会等待页面dom最近一次循环更新结束之后才会执行它内部传递的回调
          //updated也可以实现，但是并不是最近一次更新，而是所有的更新都会执行这个钩子（updated）
          new Swiper(this.$refs.bannerSwiper, {
            // loop: true, // 循环模式选项
            // 如果需要分页器
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
</style>
