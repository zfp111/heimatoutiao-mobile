<template>
  <div class="myreplay">
    <van-popup
      :value="value"
      @input="$emit('input',false)"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-cell>
        <template slot="title">当前评论</template>
      </van-cell>
      <commentList :score="score" :isreplay="true"></commentList>
      <van-cell>
        <template slot="title">评论回复</template>
      </van-cell>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <commentList :score="item" v-for="(item,index) in replyList" :isreplay="true" :key="index"></commentList>
      </van-list>
      <div class="write">
        <write @reply11="reply11" :comid="score.com_id" :artid="artid" :imcomment="false"></write>
      </div>
    </van-popup>
  </div>
</template>

<script>
import bus from "../utils/bus";
import commentList from "../components/commentList";
import write from "../components/write";
import { getArticleCommentReplay } from "../api/commentjs";
export default {
  props: ["value", "artid"],
  data() {
    return {
      score: {},
      loading: false,
      finished: false,
      replyList: [],
      offset: null,
      endid: 0,
      limit: 10
    };
  },
  components: {
    commentList,
    write
  },
  methods: {
    async getAnswer() {
      console.log(this.score.com_id.toString());
      let res = await getArticleCommentReplay({
        commid: this.score.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      });
      this.replyList = [...this.replyList, ...res.data.data.results];
      console.log(this.replyList);
      this.endid = res.data.data.end_id;
      this.offset = res.data.data.last_id;
      if (this.offset === this.endid) {
        this.finished = true;
      }
      this.loading = false;
    },
    onLoad() {
      this.getAnswer();
      
    },
    reply11(val) {
      this.replyList.push(val);
      this.score.reply_count++;
    }
  },
  created() {
    bus.$on("chuangzhi", value => {
      this.score = value;
      // this.getAnswer();
      console.log(this.score);
      this.finished = false;
      this.loading = false;
      this.replyList = [];
      this.offset = null;
      this.endid = null;
    });
  }
};
</script>

<style lang="less" scoped>
.comclose {
  font-size: 20px;
}
.write {
  position: fixed;
  bottom: 0;
}
// /deep/.myreplay {
//   display: flex;
// }
// /deep/.van-search__action:active {
//   background-color: #ccc;
// }
// .van-button--normal {
//   padding: 0 10px;
// }
// .myimg {
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 15px;
// }
// .van-cell__title {
//   display: flex;
// }
// .comm_content {
//   flex: 1;
// }
// .content {
//   margin: 15px 0;
// }
// .comm_like {
//   color: red;
// }
// .comm_time {
//   margin-right: 10px;
// }
</style>