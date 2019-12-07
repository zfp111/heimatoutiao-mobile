<template>
  <div class="mycomment">
    <van-cell>
      <template slot="title">
        <div class="usericon">
          <img class="myimg" :src="score.aut_photo" alt />
        </div>
        <div class="comm_content">
          <div>{{score.aut_name}}</div>
          <div class="content">{{score.content}}</div>
          <div>
            <span class="comm_time">{{score.pubdate | spaceTime }}</span>
            <van-button
              v-if="isreplay === false"
              round
              size="small"
              @click="showReplay"
              type="default"
            >回复{{score.reply_count}}</van-button>
          </div>
        </div>
        <div class="like">
          <van-icon class="comm_like" name="like" />
          {{score.like_count}}
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import bus from "../utils/bus";
export default {
  props: ["score", "isreplay"],

  methods: {
    showReplay() {
      this.$emit("showReplay", true);
      bus.$emit("chuangzhi", this.score);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.mycomment {
  display: flex;
}
/deep/.van-search__action:active {
  background-color: #ccc;
}
.van-button--normal {
  padding: 0 10px;
}
.myimg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.van-cell__title {
  display: flex;
}
.comm_content {
  flex: 1;
}
.content {
  margin: 15px 0;
}
.comm_like {
  color: red;
}
.comm_time {
  margin-right: 10px;
}
</style>