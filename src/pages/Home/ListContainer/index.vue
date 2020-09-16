<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <SliderLoop :bannerList="bannerList"></SliderLoop>
        <!--banner轮播-->
        <!-- <div class="swiper-container" ref="bannerSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner,index) in  bannerList" :key="banner.id">
              <img :src="banner.imgUrl" />
            </div>
          </div> -->
          <!-- 如果需要分页器 -->
          <!-- <div class="swiper-pagination"></div> -->

          <!-- 如果需要导航按钮 -->
          <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div> -->
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "ListContainer",
  mounted() {
    //1、把实例化swiper写在mounted当中，不能保证bannerList有数据，也就没法保证上面的轮播div结构形成
    //2、即使数据能保证回来，放在mounted当中也不能保证结构形成，因为上面div通过for循环去创建也需要时间
    this.getBannerList();
    //虽然说延迟定时器可以解决问题，但是不好
    // setTimeout(() => {
    //   new Swiper(this.$refs.bannerSwiper, {
    //     loop: true, // 循环模式选项
    //     // 如果需要分页器
    //     pagination: {
    //       el: ".swiper-pagination",
    //     },

    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //   });
    // }, 3000);
  },
  methods: {
    getBannerList() {
      this.$store.dispatch("getBannerList");
    },
  },
  computed: {
    //不能用数组 因为bannerList不在总的store的state里面
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },

  //一般监视:只能监视数组本身数据的改变，而不能监视数组内部对象内部属性的变化
  // watch: {
  //   bannerList: {
  //     immediate:true,  //添加这个东西没意思，只是让两边的代码一样
  //     handler() {
  //       //监视哪个数据变化之后所执行的函数
  //       //放在这里能保证我们的bannerList内一定有数据，但是还是不能保证结构完全形成
  //       this.$nextTick(() => {
  //         //这个回调是nextTick的回调，nextTick会等待页面dom最近一次循环更新结束之后才会执行它内部传递的回调
  //         //updated也可以实现，但是并不是最近一次更新，而是所有的更新都会执行这个钩子（updated）
  //         new Swiper(this.$refs.bannerSwiper, {
  //           loop: true, // 循环模式选项
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },

  //深度监视：用来解决一般监视搞不定的问题
  // watch:{
  //   bannerList:{
  //     deep:true,
  //     handler(){
  //       //监视哪个数据变化之后所执行的函数
  //     }
  //   }
  // }
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(../../../assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
