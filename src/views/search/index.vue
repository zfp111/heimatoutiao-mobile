<template>
  <div>
    <van-search
      v-model="key"
      background="#3e9df8"
      @search="onSearch"
      placeholder="请输入搜索关键词"
      show-action
      @input="searchKey"
    >
      <div @click="cancle" slot="action">取消</div>
    </van-search>
    <van-cell-group v-if="isshow === true">
      <van-cell
        v-for="(item,index) in searchList"
        @click="onSearch(item.item)"
        icon="search"
        :key="index"
      >
        <template slot="title">
          <div v-html="item.results"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-if="isshow === false">
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <van-icon @click="delAll" name="delete" />
        </template>
      </van-cell>
      <van-cell v-for="(item,index) in historyList" @click="onSearch(item)" :key="index" icon="search" :title="item">
        <template slot="right-icon">
          <van-icon @click.stop="delHistory(index)" name="cross" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSearchKey } from "../../api/search";
import * as local from "../../utils/processlocal";
export default {
  data() {
    return {
      key: "",
      isshow: false,
      searchList: [],
      timer: null,
      historyList: []
    };
  },
  methods: {
    onSearch(key) {
      this.historyList.unshift(key);
      console.log(this.historyList);
      this.historyList = [...new Set(this.historyList)];
      local.addLocalStarage("history", this.historyList);

      this.$router.push(`/searchList/${key}`);
    },

    //删除所有历史
    delAll() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "此操作将会清空所有的历史记录,是否要清空"
        })
        .then(() => {
          this.historyList = [];
          local.clearLocalStarage("history");
        })
        .catch(() => {
          console.log();
        });
    },

    //删除历史
    delHistory(index) {
      this.historyList.splice(index, 1);
      local.addLocalStarage("history", this.historyList);
    },
    searchKey() {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.key.trim().length === 0) {
          this.isshow = false;
          return;
        }
        this.isshow = true;
        let res = await apiSearchKey(this.key);
        console.log(res);
        this.searchList = res.data.data.options;

        this.searchList = this.searchList.map(item => {
          return {
            item: item,
            results: item
              .split(this.key)
              .join(`<span style='color:#3e9df8'>${this.key}</span>`)
          };
        });
      }, 300);
    },

    //取消
    cancle() {
      this.key = "";
      this.isshow = false;
    }
  },
  created() {
    console.log(this.historyList);
    this.historyList = local.getLocalStarage("history") || [];
  }
};
</script>

<style lang="less" scoped>
.van-search__action {
  background-color: #3e9df8;
  color: #fff;
}
</style>