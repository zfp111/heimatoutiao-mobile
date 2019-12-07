<template>
  <van-popup :style="{width:'90%'}" :value="value" @input="$emit('input', false)">
    <van-cell-group v-if="istype===true">
      <van-cell icon="bookmark-o" title="不感兴趣" @click="dislike" />
      <van-cell icon="medel-o" title="反馈垃圾内容" @click="istype=false" is-link />
      <van-cell icon="eye-o" @click="jubao" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-if="istype === false">
      <van-cell icon="arrow-left" @click="istype=true" />
      <van-cell
        v-for="(item, index) in types"
        @click="reports(item.id)"
        :key="index"
        :title="item.name"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
import { apiReportsArticle, apiBlacklists } from "../api/article";
export default {
  props: ["value", "articleId", "autid"],
  data() {
    return {
      istype: true,
      types: [
        { id: 0, name: "其他问题" },
        { id: 1, name: "标题夸张" },
        { id: 2, name: "低俗色情" },
        { id: 3, name: "错别字多" },
        { id: 4, name: "旧闻重复" },
        { id: 5, name: "广告软文" },
        { id: 6, name: "内容不实" },
        { id: 7, name: "涉嫌违法犯罪" },
        { id: 8, name: "侵权" }
      ]
    };
  },
  methods: {
    dislike() {
      this.$emit("delArticle", this.articleId);
    },
    async reports(type) {
      try {
        await apiReportsArticle({
          arcid: this.articleId,
          type: type
        });
        this.$emit("input", false);
        this.istype = true;
      } catch (error) {
        this.$toast.fail("此文章已经举报过了");
      }
    },
    async jubao() {
      console.log(this.autid)
      try {
        await apiBlacklists(this.autid);
        this.$emit("input", false);
        
      } catch {
        this.$toast.fail("此文章作者已经拉黑过了");
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>