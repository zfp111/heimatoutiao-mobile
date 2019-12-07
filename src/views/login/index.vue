<template>
  <div>
    <van-nav-bar title="登录" class="mynav" />
    <van-cell-group>
      <van-field
        v-model="form.mobile"
        :error-message="errmsg.mobilemsg"
        left-icon="contact"
        clearable
        placeholder="请输入手机号"
      >
        <template slot="left-icon">
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="form.code"
        :error-message="errmsg.codemsg"
        left-icon="contact"
        placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" :disabled="flag" round class="mybtn" @click="getCode">{{codeText}}</van-button>
        <template slot="left-icon">
          <i class="iconfont icon-iconfontmima1"></i>
        </template>
      </van-field>
    </van-cell-group>
    <div class="mylogin">
      <van-button
        type="info"
        size="large"
        :loading="loadflag"
        loading-text="登录中..."
        class="loginBar"
        @click="login"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { loginCheck } from "../../api/user";
export default {
  data() {
    return {
      form: {
        mobile: "13911111111",
        code: ""
      },
      errmsg: {
        mobilemsg: "",
        codemsg: ""
      },
      loadflag: false,
      codeText: "发送验证码",
      flag:false
    };
  },
  methods: {
    async login() {
      if (!this.check()) {
        return;
      }
      this.loadflag = true;
      try {
        let res = await loginCheck(this.form);
        this.$store.commit("saveUser", res.data.data);
        if(this.$route.name === '/login'){
          this.$router.push("/home");
        }else{
          this.$router.back();
        } 
         this.$notify.success('登录成功');
        // this.$toast.success("登录成功");
      } catch {
        this.$toast.fail("登录失败");
      }

      this.loadflag = false;
    },
    getCode() {
      let sec = 60;
      this.flag=true;
      this.codeText = "还有60秒";
      let timerId = setInterval(() => {
        sec--;
        this.codeText = `还有${sec}秒`;
        if(sec == 58){
          this.form.code='246810'
        }
        if (sec < 0) {
           this.codeText = '发送验证码';
            sec = 60;
            clearInterval(timerId)
            this.flag=false;
        }
      }, 1000);
    },
    check() {
      let mobileflag = true;
      let codeflag = true;
      if (this.form.mobile.trim().length !== 11) {
        this.errmsg.mobilemsg = "手机号不合法";
        mobileflag = false;
      }
      if (this.form.code.trim().length !== 6) {
        this.errmsg.codemsg = "验证码不合法";
        codeflag = false;
      }
      if (mobileflag) {
        this.errmsg.mobilemsg = "";
      }
      if (codeflag) {
        this.errmsg.codemsg = "";
      }

      return mobileflag && codeflag;
    }
  }
};
</script>

<style lang="less" scoped>
.mynav {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
.mybtn {
  background-color: #ededed;
}
.mylogin {
  margin: 20px 10px;
  .loginBar {
    border-radius: 5px;
  }
}
</style>