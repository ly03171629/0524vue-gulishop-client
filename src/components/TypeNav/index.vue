<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="currentIndex = -1">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{item_on:currentIndex === index}"
              @mouseenter="moveIn(index)"
            >
              <!-- 移入哪一个一级分类 就把哪一个下标赋值给 currentIndex  那么移入的这个下标一定和currentIndex相等，其余不等-->
              <h3>
                <a href>{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a href>{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                        <a href>{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
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
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
    };
  },
  mounted() {
    //挂载完成后（模板挂载完成后，模板变为真正的dom后）
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      //用户在触发响应的actions去发请求拿数据
      this.$store.dispatch("getCategoryList");
    },

    moveIn(index){
      console.log(index)
      this.currentIndex = index
    }

    //这里面可以获取vuex当中mutations和actions方法
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
      background: #fafafa;
      z-index: 999;

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
