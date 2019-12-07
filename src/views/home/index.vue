<template>
  <div class="home">
    <van-nav-bar title="首页" class="mynav" :fixed="true" />

    <van-tabs v-model="active" class="tabBar">
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="加载中..."
            @load="onLoad"
          >
            <van-cell class="mycell" v-for="(artItem,artIndex) in item.articleList" :key="artIndex">
              <!-- <template slot="title">{{artItem.title}}</template> -->
              <div>{{artItem.title}}</div>
              <div>
                <van-grid :border="false" :column-num="3" v-if="artItem.cover.type > 0">
                  <van-grid-item v-for="(imgitem,index) in artItem.cover.images" :key="index">
                    <van-image lazy-load :src="imgitem" />
                  </van-grid-item>
                </van-grid>
              </div>
              <div>
                <span>{{artItem.aut_name}}</span>
                <span>{{artItem.comm_count}}评论</span>
                <span>{{artItem.pubdate | spaceTime}}</span>
                <div class="more">
                  <van-icon @click="openmore(artItem.art_id,artItem.aut_id)" class="moreicon" name="cross" />
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div class="iconplus">
        <van-icon name="plus" @click="showList" />
      </div>
      <pop v-model="show" :active.sync="active" :channelList="channelList"></pop>
      <more v-model="moreshow" :autid="autid" :articleId="articleId" @delArticle="delArticle"></more>
    </van-tabs>
  </div>
</template>

<script>
import { apiGetChannel } from "../../api/channel";
import { getLocalStarage } from "../../utils/processlocal";
import { apiGetArticleList, apiDislikeArticle } from "../../api/article";

import pop from "../../components/popup";
import more from "../../components/more";

//图片懒加载
import Vue from "vue";
import { Lazyload } from "vant";

// options 为可选参数，无则不传
Vue.use(Lazyload);

export default {
  components: {
    pop,
    more
  },
  data() {
    return {
      channelList: [],
      active: "",
      loading: false,
      finished: false,
      isLoading: false,
      show: false,
      moreshow: false,
      articleId: 0,
      autid:0
    };
  },
  methods: {
    showList() {
      this.show = true;
    },

    async delArticle(arcid) {
      // 获取文章数据源
      let articleList = this.channelList[this.active].articleList;
      console.log(arcid);
      articleList.forEach((item, index) => {
        if (item.art_id === arcid) {
          articleList.splice(index, 1);
        }
      });
      await apiDislikeArticle(arcid);
      this.moreshow = false;
      

    },

    //触底加载
    async onLoad() {
      let currentChannelList = this.channelList[this.active];

      let res = await apiGetArticleList({
        channelId: currentChannelList.id,
        timestamp: currentChannelList.pre_timestamp
          ? currentChannelList.pre_timestamp
          : Date.now()
      });
      // console.log(res);
      currentChannelList.articleList = [
        ...currentChannelList.articleList,
        ...res.data.data.results
      ];

      currentChannelList.pre_timestamp = res.data.data.pre_timestamp;

      if (currentChannelList.pre_timestamp === null) {
        // 将 list 的加载状态设置为 true
        currentChannelList.finished = true;
      }
      currentChannelList.loading = false;
    },

    //下拉刷新
    onRefresh() {
      let currentChannelList = this.channelList[this.active];
      currentChannelList.loading = false;
      currentChannelList.finished = false;
      currentChannelList.articleList = [];
      currentChannelList.pre_timestamp = null;
      this.onLoad();
      currentChannelList.isLoading = false;
    },

    async getChannel() {
      let userInfo = this.$store.state.userInfo;
      if (userInfo && userInfo.token) {
        let res = await apiGetChannel();
        this.channelList = res.data.data.channels;
        // console.log(res);
      } else {
        let channels = getLocalStarage("channels");
        console.log(channels);
        if (channels) {
          this.channelList = channels;
        } else {
          let res = await apiGetChannel();
          this.channelList = res.data.data.channels;
        }
        console.log(this.channelList);
      }
      // console.log(this.channelList);
      this.addPropTochannelList();
    },

    // 添加一个给 list 添加额外属性的方法
    addPropTochannelList() {
      this.channelList.forEach(arr => {
        this.$set(arr, "loading", false);
        this.$set(arr, "finished", false);
        this.$set(arr, "articleList", []);
        this.$set(arr, "isLoading", false);
        this.$set(arr, "pre_timestamp", null);
      });
    },

    //打开更多面板
    openmore(id,autid) {
      console.log(id)
      this.moreshow = true;
      console.log(autid)
      this.articleId = id;
      this.autid=autid
    }
  },
  created() {
    this.getChannel();
  }
};
</script>

<style lang="less" scoped>
.home {
  margin-top: 90px;
  margin-bottom: 50px;
}
.mynav {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
.home /deep/.van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 999;
  width: 90%;
}
.iconplus {
  height: 46px;
  width: 10%;
  position: fixed;
  top: 46px;
  right: 0;
  text-align: center;
  line-height: 46px;
  background-color: #fff;
}
// .mycell {
//   height: 150px;
// }
span {
  margin-right: 10px;
}
.more {
  float: right;
  border: 1px solid #ccc;
  display: flex;

  .moreicon {
    margin: 1px 1px;
  }
}
</style>