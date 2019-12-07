<template>
  <div class="mylist">
    <van-search
      background="#F0F8FF"
      v-model="value"
      placeholder="请输入内容"
      show-action
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">发布</div>
      <template slot="left-icon">
        <van-icon class="like" name="edit" />
      </template>
    </van-search>
  </div>
</template>

<script>
import {
  publishArticleComment,
  apiAddCommentReply
} from "../api/commentjs";
export default {
  props: ["artid","comid","imcomment"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    async onSearch() {
      if (this.value.trim().length === 0) {
        return;
      }
      if (this.imcomment === true) {
        let res = await publishArticleComment({
          aid: this.artid,
          value: this.value
        });
        console.log(res);
        let newObj = res.data.data.new_obj;
        this.value = "";
        this.$emit("addcomment", newObj);
      } 
      else {
        console.log(this.artid);
        let res = await apiAddCommentReply({
          artid: this.artid,
          comid: this.comid,
          value: this.value
        });
        console.log(res);
        let answer = res.data.data.new_obj
        this.$emit('reply11',answer)
         this.value = ""
      }
    }
  }
};
</script>

<style lang= "less" scoped>
.mylist {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}
</style>
// 