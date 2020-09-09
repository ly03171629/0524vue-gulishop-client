<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- <router-link to="/login">登录</router-link> -->
            <router-link :to="{path:'/login'}">登录</router-link>
            <!-- <a href="###">登录</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/" class="logo">
          <img src="./images/logo.png" alt />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt />
        </a>-->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    toSearch() {
      //1、字符串写法
      //2、对象写法
      // this.$router.push('/search')
      // this.$router.push({path:'/search'})

      //一、params参数能不能和对象写法path配合？
      //不能配合，如果要配合只能和name配合使用
      //如果只传query参数，那么可以和path配合
      //如果传递的参数有params参数也有query参数，那么直接用name就可以，query也可以和name配合

      //字符串写法没问题
      // this.$router.push('/search/'+this.keyword)

      //错的 对象写法params必须和name进行配合使用
      // this.$router.push({path:'/search/',params:{keyword:this.keyword}})

      //对的
      // this.$router.push({name:'search',params:{keyword:this.keyword}})

      //二、如果params参数有时候传，有时候不传，那么在路由配置的时候路径接收的参数后面添加?

      //三、params参数和name配合了，但是传递的是一个空串，那么路径也会触问题
      //解决：1、首先要配置可传可不传
      //2、传递参数的时候要么不写params,要么传递undefined替代
      // this.$router.push({name:'search',params:{keyword:''|| undefined}})

      //四、props的三种写法
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        // query: {keyword2:this.keyword.toUpperCase()},
      };

      //判断当前路由当中是不是有query参数，有就带上
      let {query} = this.$route 
      if(query){
        location.query = query
      }

      this.$router.push(location)
      // this.$router.push(location).catch(() => {})
      // this.$router.push(location).then(() => {}).catch(() => {})
      // this.$router.push(location,() => {}) 

      // this.$router.push(location).then(() => {}) //不行，因为返回的promise不一定是成功的
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
