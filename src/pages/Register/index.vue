<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去
          <router-link to="/login">登陆</router-link>
          <!-- <a href="login.html" target="_blank">登陆</a> -->
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>

        <input
          v-model="mobile"
          placeholder="请输入你的手机号"
          type="text"
          name="phone"
          v-validate="{required: true,regex: /^1\d{10}$/}"
          :class="{invalid: errors.has('phone')}"
        />

        <span class="error-msg">{{ errors.first('phone') }}</span>

        <!-- <input type="text" placeholder="请输入你的手机号" v-model="mobile" />
        <span class="error-msg">错误提示信息</span>-->
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          v-model="code"
          placeholder="请输入验证码"
          type="text"
          name="code"
          v-validate="{required: true,regex: /^\d{4}$/}"
          :class="{invalid: errors.has('code')}"
        />
        <img ref="code" src="/api/user/passport/code" alt="code" @click="changeCode" />
        <span class="error-msg">{{ errors.first('code') }}</span>

        <!-- <input type="text" placeholder="请输入验证码" v-model="code" /> -->

        <!-- 
          下面两种获取验证码的方式都是可以返回正常数据的
          第一种是通过src直接发送到目标服务器，利用src的特性，解决跨域，可以认为没有跨域
          第二种是通过代理服务器转发到目标服务器，解决跨域问题

          下面的第二种方式图片验证码有效，可以正常注册
          上面第一种方式图片验证码，无效，注册时候报错：验证码不正确

        -->
        <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->

        <!-- <img ref="code" src="/api/user/passport/code" alt="code" @click="changeCode" />

        <span class="error-msg">错误提示信息</span>-->
      </div>
      <div class="content">
        <label>登录密码:</label>

        <input
          v-model="password"
          placeholder="请输入你的密码"
          type="text"
          name="password"
          v-validate="{required: true,regex: /^\w{6,10}$/}"
          :class="{invalid: errors.has('password')}"
        />
        <span class="error-msg">{{ errors.first('password') }}</span>
        <!-- <input type="text" placeholder="请输入你的登录密码" v-model="password" />
        <span class="error-msg">错误提示信息</span>-->
      </div>
      <div class="content">
        <label>确认密码:</label>

        <input
          v-model="password2"
          placeholder="请再次输入密码"
          type="text"
          name="password2"
          v-validate="{required: true,regex: /^\w{6,10}$/,is:(password)}"
          :class="{invalid: errors.has('password2')}"
        />
        <span class="error-msg">{{ errors.first('password2') }}</span>
        <!-- <input type="text" placeholder="请输入你的登录密码" v-model="password" />
        <span class="error-msg">错误提示信息</span>-->
      </div>
      <div class="controls">
        <input
          name="isCheck"
          type="checkbox"
          v-model="isCheck"
          v-validate="{agree:true}"
          :class="{invalid: errors.has('isCheck')}"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('isCheck') }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      mobile: "",
      password: "",
      password2: "",
      code: "",
      isCheck: false,
    };
  },
  methods: {
    changeCode() {
      this.$refs.code.src = "/api/user/passport/code";
    },
    async register() {
      const success = await this.$validator.validateAll(); // 对所有表单项进行验证
      if (success) {
        //success为true代表验证通过
        let { mobile, password, password2, code } = this;
        try {
          await this.$store.dispatch("userRegister", {
            mobile,
            password,
            code,
          });
          alert("恭喜注册成功，确认跳转到登录页");
          this.$router.push("/login");
        } catch (error) {
          alert("用户注册失败" + error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>