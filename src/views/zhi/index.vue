<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar fixed @click-left="$router.back()" left-arrow class="myhead" title="登录">
      <template slot="title">
        <div class="myhead-word">小智同学</div>
      </template>
    </van-nav-bar>
    <!-- 内容区域 -->
    <div class="chatList" ref="chatList">
      <div :class="item.isrobote?'robote' : 'person'" v-for="(item,index) in list" :key="index">
        <img
          class="img"
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg"
          alt
        />
        <div class="item">{{item.msg}}</div>
      </div>
     
    </div>
    <!-- 底部发送信息区域 -->
    <div class="bottom">
      <van-search v-model="chat" placeholder="请输入你要说的话" show-action left-icon shape="round">
        <div slot="action" @click="onSearch">发送</div>
      </van-search>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      chat: "",
      list: [{ isrobote: true, msg: "你好啊" }]
    };
  },
  methods: {
    onSearch() {
        if(this.chat.trim().length === 0){
            this.$toast.fail('不能为空哦')
            return;
        }
      this.socket.emit("message", {
        msg: this.chat,
        timestamp: Date.now()
      });
      this.list.push({
        msg: this.chat,
        isrobote: false
      });
      this.chat = ''
    }
  },
  created() {
    this.socket = io(
      `http://ttapi.research.itcast.cn?token=${this.$store.state.userInfo.token}`
    );
    // 端接收服务器响应的
    this.socket.on("message", value => {
      // 也需要将响应的数据保存到记录中
      this.list.push({
        msg: value.msg,
        isrobote: true
      });
    });
  }
};
</script>

<style lang="less" scoped>
.myhead {
  background-color: #3296fa;
  .myhead-word {
    color: #fff;
  }
}

.van-nav-bar .van-icon {
  color: #fff;
  vertical-align: middle;
}

.chatList {
  overflow: auto;
  background-color:#fff;
  position: fixed;
  width: 100%;
  top: 46px;
  bottom: 46px;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 46px;
  background-color: #ccc;
  .ipt {
    width: 80%;
    height: 40px;
    border-radius: 5px;
  }
  .btn {
    width: 15%;
    height: 40px;
  }
}

.chatList {
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .item {
    background-color: #e0effb;
    padding: 10px;
    border-radius: 7px;
   
  }
}

.robote {
  overflow: hidden;
  margin-top: 20px;
  .img {
    margin-left: 10px;
    float: left;
  }
  .item {
    margin-left: 10px;
    float: left;
     width: 240px;
  }
}

.person {
  overflow: hidden;
  margin-top: 20px;
  .img {
    float: right;
    margin-right: 10px;
  }
  .item {
    float: right;
    margin-right: 10px;
  }
}
</style>