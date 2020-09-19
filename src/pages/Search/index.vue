<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>

            <li class="with-x" v-show="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>

            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>

            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @searchForTrademark="searchForTrademark" @searchForProps="searchForProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 数据决定了页面的显式
                1、数据要清楚
                2、背景色谁有根据数据当中排序标志来决定
                3、背景色谁有，那么箭头谁就有
                  图标用什么  iconfont
                  图标显示的时候是向上还是向下根据数据的排序类型决定
                -->
                <li :class="{active:sortFlag === '1'}">
                  <a href="javascript:;" @click="sortGoods('1')">
                    综合
                    <i
                      v-if="sortFlag === '1'"
                      class="iconfont"
                      :class="{iconup:sortType==='asc',icondown:sortType==='desc'}"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:sortFlag === '2'}">
                  <a a href="javascript:;" @click="sortGoods('2')">
                    价格
                    <i
                      v-if="sortFlag === '2'"
                      class="iconfont"
                      :class="{iconup:sortType==='asc',icondown:sortType==='desc'}"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a> -->
                    <router-link :to="'/detail/'+goods.id" >
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{goods.title}}</a> -->
                    <router-link :to="'/detail/'+goods.id" >
                      {{goods.title}}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 父组件需要给分页子组件传递的四个数据 -->
          <Pagination
            :currentPageNum="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="goodsListInfo.total"
            :continueNum="5"
            @changePageNum="changePageNum"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //这个searchParams是用户初始化搜索状态数据，有可能发送请求的搜索参数全部包含
        //只不过大部分都是空的
        category1Id: "", //query参数变化的搜索参数
        category2Id: "", //query参数变化的搜索参数
        category3Id: "", //query参数变化的搜索参数
        categoryName: "", //query参数变化的搜索参数
        keyword: "", //params参数变化的搜索参数
        props: [], //按照平台属性搜索的参数
        trademark: "", //按照品牌搜索的参数

        //代表的是用户发送请求默认的参数  默认获取第几页  默认排序规则是什么  默认每页个数
        order: "1:desc",
        //排序标志 1和2        1代表是综合排序  2代表价格排序
        //排序类型 desc和asc   desc代表降序   asc升序

        pageNo: 1,
        pageSize: 1,
      },
    };
  },
  //根据类别和关键字进行搜索，其实本质就是在mounted之前，把相关的参数给拿到，赋值给我们的searchParams，然后请求
  beforeMount() {
    //我们可以从路由中获取所需要的query参数和params参数
    // let {
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    // } = this.$route.query;
    // let { keyword } = this.$route.params;
    // let searchParams = {
    //   ...this.searchParams,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    //   keyword,
    // };
    // //传递的参数如果是undefined代表没传吗，如果传递的参数是''，其实是真的有参数，但是其实没必要传递空串的参数
    // //把参数是空串的全部过滤掉
    // Object.keys(searchParams).forEach((item) => {
    //   if (searchParams[item] === "") {
    //     delete searchParams[item];
    //   }
    // });
    // this.searchParams = searchParams;
    this.handlerSearchParams();
  },
  mounted() {
    this.getGoodsListInfo();
  },
  methods: {
    getGoodsListInfo() {
      // import XXX from '/asddas'同步引入
      // import() 动态引入
      //这次触发actions的时候需要传递搜索参数，它是一个对象
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    //请求前处理params和query参数
    handlerSearchParams() {
      //我们可以从路由中获取所需要的query参数和params参数
      let {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;
      let { keyword } = this.$route.params;

      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };
      //传递的参数如果是undefined代表没传吗，如果传递的参数是''，其实是真的有参数，但是其实没必要传递空串的参数
      //把参数是空串的全部过滤掉
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === "") {
          delete searchParams[item];
        }
      });
      this.searchParams = searchParams;
    },
    //点击面包屑当中的关闭× categoryName，删除参数当中的categoryName 重新发请求
    removeCategoryName() {
      this.searchParams.pageNo = 1
      this.searchParams.categoryName = undefined;
      // this.getGoodsListInfo()
      //虽然可以发请求，但是路径当中的参数不会被删除，因为路由当中参数是没变化的，所以我们必须
      //自己手动跳转路由，修改路由当中的参数
      this.$router.replace({ name: "search", params: this.$route.params });
    },
    //点击面包屑当中的关闭× keyword 删除参数当中的keyword 重新发请求
    removeKeyword() {
      this.searchParams.pageNo = 1
      this.searchParams.keyword = undefined;
      //通知header组件把输入框当中的keyword清空
      this.$bus.$emit("clearKeyword");
      // this.getGoodsListInfo()
      this.$router.replace({ name: "search", query: this.$route.query });
    },
    //子向父传递品牌数据，按照品牌搜索
    searchForTrademark(trademark) {
      // console.log(trademark)
      //'tmId:tmName'
      this.searchParams.pageNo = 1
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`; //根据品牌搜索一定要参考文档去看参数的结构
      this.getGoodsListInfo();
    },
    //删除面包屑当中的品牌
    removeTrademark() {
      this.searchParams.pageNo = 1
      this.searchParams.trademark = undefined;
      this.getGoodsListInfo();
    },
    //子向父传递属性数据，按照属性搜索
    searchForProps(attr, attrValue) {
      // 属性ID:属性值:属性名
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      
      //加入之前判断数据当中是否存在，如果已经存在就不需要再次加入并且发请求了
      let repeat = this.searchParams.props.some((item) => item === prop);
      if (repeat) return;

      this.searchParams.pageNo = 1
      this.searchParams.props.push(prop);
      this.getGoodsListInfo();
    },
    //删除面包屑当中的属性
    removeProp(index) {
      this.searchParams.pageNo = 1
      this.searchParams.props.splice(index, 1);
      this.getGoodsListInfo();
    },
    //点击综合和价格进行排序
    sortGoods(sortFlag) {
      //拿到原本数据当中的排序标志和排序类型
      let originSortFlag = this.sortFlag;
      let originSortType = this.sortType;
      let newOrder = "";
      if (sortFlag === originSortFlag) {
        //点击的还是原来的那个排序
        newOrder = `${originSortFlag}:${
          originSortType === "asc" ? "desc" : "asc"
        }`;
      } else {
        //点击的是新的那个排序
        newOrder = `${sortFlag}:desc`;
      }

      //把新的排序规则更新然后重新发请求
      this.searchParams.pageNo = 1
      this.searchParams.order = newOrder;
      this.getGoodsListInfo();
    },

    changePageNum(page){
      this.searchParams.pageNo = page
      this.getGoodsListInfo()
    }
  },
  components: {
    SearchSelector,
  },

  computed: {
    // attrsList(){
    //   return this.$store.getters.attrsList
    // },
    ...mapState({
      goodsListInfo: (state) => state.search.goodsListInfo,
    }),
    ...mapGetters(["goodsList"]), //父组件search当中只需要拿到商品列表去展示
    //attrsList  trademarkList 两个数据是子组件需要展示的，到子组件当中去获取，可以避免组件通信
    sortFlag() {
      return this.searchParams.order.split(":")[0];
    },
    sortType() {
      return this.searchParams.order.split(":")[1];
    },
  },
  // computed:mapGetters(['attrsList','goodsList','trademarkList'])

  watch: {
    //其实在search页面重复发送请求只能通过监视当前的路由对象，自己手动调用去发请求
    //因为mounted在路由组件当中不切换的情况下只会执行一次
    $route: {
      handler(newVal, oldVal) {
        this.handlerSearchParams();
        this.getGoodsListInfo();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>