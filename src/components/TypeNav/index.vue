<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="moveInDiv">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <!-- <h1>ni hao a</h1> -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{item_on:currentIndex === index}"
                @mouseenter="moveIn(index)"
              >
                <!-- 移入哪一个一级分类 就把哪一个下标赋值给 currentIndex  那么移入的这个下标一定和currentIndex相等，其余不等-->
                <h3>
                  <!-- <router-link :to="'/search/?categoryName='+c1.categoryName + '&category1Id=' + c1.categoryId"></router-link> -->
                  <!-- <router-link :to="`/search/?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`"></router-link> -->
                  <!-- 使用声明式导航 牵扯到使用组件标签 使用组件标签如果多了 组件对象会非常多，就会造成效率低下（内存占用厉害） -->
                  <!-- 因此我们不能使用声明式导航，采用编程式导航 -->
                  <!-- <router-link
                    :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                  >{{c1.categoryName}}</router-link>-->

                  <!-- 采用编程式导航每个a标签都使用点击事件，又会导致，事件的回调函数太多 -->
                  <!-- <a
                    href="javascript:;"
                    @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})"
                  >{{c1.categoryName}}</a>-->

                  <!-- 每个a标签都添加事件效率仍然低下，采用事件委派处理更妥当 -->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <router-link
                          :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                        >{{c2.categoryName}}</router-link>-->
                        <!-- <a href>{{c2.categoryName}}</a> -->

                        <!-- <a
                          href="javascript:;"
                          @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})"
                        >{{c2.categoryName}}</a>-->

                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link
                            :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                          >{{c3.categoryName}}</router-link>-->

                          <!-- <a
                            href="javascript:;"
                            @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})"
                          >{{c3.categoryName}}</a>-->

                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
// import _ from 'lodash' //体积过大
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    //挂载完成后（模板挂载完成后，模板变为真正的dom后）
    //为了判断是在home页还是在search页，如果是search页那么我们要首先隐藏掉三级分类列表
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }

    // this.getCategoryList();
    //放在这里会发多次请求而请求的数据是一样的，挪到App当中发请求存数据（home/search都会发）
  },
  methods: {
    // //这里面可以获取vuex当中mutations和actions方法
    // getCategoryList() {
    //   //用户在触发响应的actions去发请求拿数据
    //   this.$store.dispatch("getCategoryList");
    // },

    //需要节流的函数
    // moveIn(index){
    //   console.log(index)
    //   this.currentIndex = index
    // }

    // moveIn:function(index){
    //   console.log(index)
    //   this.currentIndex = index
    // }
    // 节流的效果写法
    moveIn: throttle(
      function (index) {
        // console.log(index);
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),
    //{ 'trailing': false } 不让函数在拖延之后执行，也就是在时间间隔内执行完这个函数，不写有可能最后的一次是拖延执行的

    //移入到全部商品分类外部的div，显示三级分类列表
    moveInDiv() {
      this.isShow = true;
    },
    //移出全部商品分类外部的div，隐藏search的三级分类列表，home当中隐藏23级分类
    moveOutDiv() {
      this.currentIndex = -1; //目的隐藏23级分类
      if (this.$route.path !== "/home") {
        this.isShow = false; //目的是为了隐藏search的全部三级分类
      }
    },

    toSearch(event) {
      let target = event.target; //代表目标元素  目标元素有可能是a 也有可能不是a
      let data = target.dataset; //dataset 拿的就是元素身上以data-开头的所有的属性和值组成的一个对象 里面的属性都改为了小写
      // console.log(data)

      let { categoryname, category1id, category2id, category3id } = data;

      if (categoryname) {
        //如果categoryname是存在的代表点的一定是a

        //既然点的是a 那么一定会跳转，所以我们创建跳转的对象
        let location = {
          name: "search",
        };

        //创建query参数的对象，来收集整理query参数
        let query = {
          categoryName: categoryname,
        };

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //把query参数放到location当中
        location.query = query;

        //判断当前路由当中是不是有params参数，有就带上
        let { params } = this.$route;
        if (params) {
          location.params = params;
        }

        this.$router.push(location);
      }
    },
  },
  computed: {
    //可以去拿vuex当中state及getters当中的数据
    //1 最原始的写法
    //假设我们目前没有使用vuex的模块化开发，categoryList存在总的store的state当中
    // categoryList(){
    //   return this.$store.state.categoryList   //直接从store当中的state中获取这个数据就可以简写为数组
    // },

    // count(){
    //   return this.$store.state.count
    // }

    //... 扩展运算符  拆包和打包

    // 2、...mapState只是对原始写法的一个简写
    //mapState(['categoryList','count'])返回的对象就是上面的本质写法
    // {
    //   categoryList(){
    //     return this.$store.state.categoryList   //直接从store当中的state中获取这个数据就可以简写为数组
    //   },

    //   count(){
    //     return this.$store.state.count
    //   }
    // }

    // 3、mapState如果用到数组要求，名称必须和state当中名称一致才能正确映射，否则不行
    // 如果想要用自己随意起的名称，那么就要用对象写法
    // ...mapState({
    //   // category(){
    //   //   return this.$store.state.categoryList   //直接从store当中的state中获取这个数据就可以简写为数组
    //   // },
    //   category: state => state.categoryList
    // })

    // 4、如果vuex使用了模块化开发，就没办法获取state数据使用数组了，必须使用对象
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      // background: #fafafa;
      background: skyblue;
      z-index: 999;

      &.show-enter {
        opacity: 0;
        height: 0;
      }

      &.show-enter-active {
        transition: all 0.5s;
      }

      &.show-enter-to {
        opacity: 1;
        height: 461px;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 615px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
