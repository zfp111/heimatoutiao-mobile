<template>
  <div class="mydetails">
    <!-- 文章nav -->
    <van-nav-bar
      class="mynav"
      @click-left="back"
      left-arrow
      background="#3e9df8"
      fixed
      title="文章详情"
    />
    <!-- 文章标题部分 -->
    <van-cell>
      <template slot="title">
        <h1 class="mytitle">{{articleDetails.title}}</h1>
      </template>
    </van-cell>
    <!-- 用户关注部分 -->
    <van-sticky :offset-top="46">
      <van-cell>
        <template slot="title">
          <div class="userinfo">
            <div class="usericon">
              <img class="icon" :src="articleDetails.aut_photo" alt />
            </div>
            <div class="username">
              <div class="myname">{{articleDetails.aut_name}}</div>
              <div class="pubtime">{{articleDetails.pubdate |spaceTime}}</div>
            </div>
            <div class="userfocus">
              <van-button
                v-if="articleDetails.is_followed === false"
                @click="guanzhu"
                type="primary"
              >+ 关注</van-button>
              <van-button
                v-if="articleDetails.is_followed === true"
                type="primary"
                @click="quguan"
              >已关注</van-button>
            </div>
          </div>
        </template>
      </van-cell>
    </van-sticky>

    <!-- 文章内容部分 -->
    <van-cell>
      <template slot="title">
        <div v-html="articleDetails.content"></div>
      </template>
    </van-cell>
    <!-- 喜欢和不喜欢 -->
    <van-cell class="mylike">
      <van-button
        class="mybtn"
        round
        plain
        @click="like"
        :type="articleDetails.attitude === 1 ? 'danger' : 'default'"
      >
        <van-icon name="like-o">点赞</van-icon>
      </van-button>
      <van-button
        class="mybtn"
        round
        plain
        :type="articleDetails.attitude === 0 ? 'danger': 'default'"
        @click="dislike"
      >
        <van-icon name="delete">不喜欢</van-icon>
      </van-button>
    </van-cell>
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <mycomm :score="item" v-for="(item,index) in commetList" :isreplay ="isreplay" @showReplay="showReplay=$event" :key="index"></mycomm>
    </van-list>

    <!-- 发表评论部分 -->
    <com :artid="artid" @addcomment="addcomment"></com>

    <!-- 回复评论 -->
    <replay :imcomment="true" :artid="artid"  v-model="showReplay" />

   
  </div>
</template>

<script>
 import replay from "../../components/commentanswer"
import mycomm from "../../components/commentList";
import com from "../../components/write";
import {
  apiGetArticleDetails,
  apLikeArticle,
  apDisLikeArticle
} from "../../api/article";
import { followsUser, apifollowsUser } from "../../api/user";
import { getArticleComment } from "../../api/commentjs";
export default {
  components: {
    mycomm,
    com,
    replay
  },
  data() {
    return {
      isreplay:false,
      showReplay:false,
      artid: 0,
      articleDetails: {},
      offset: null,
      limit: 10,
      commetList: [],
      endid: 0,
      loading: false,
      finished: false
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    //关注作者
    async guanzhu() {
      let autid = this.articleDetails.aut_id;
      await followsUser(autid);
      this.articleDetails.is_followed = true;
    },
    //取消关注作者
    async quguan() {
      let aid = this.articleDetails.aut_id;
      await apifollowsUser(aid);
      this.articleDetails.is_followed = false;
    },
    //点赞
    async like() {
      // let art_id = this.articleDetails.art_id;
      await apLikeArticle(this.artid);
      //  console.log('111111111111')
      this.articleDetails.attitude = 1;
    },
    //不喜欢
    async dislike() {
      // let art_id = this.articleDetails.art_id;
      await apDisLikeArticle(this.artid);
      //  console.log('111111111111')
      this.articleDetails.attitude = 0;
    },
    //获取文章评论
    async getArticleComment() {
      let res = await getArticleComment({
        artid: this.artid,
        offset: this.offset ? this.offset : null,
        limit: this.limit
      });
      // console.log(res);
      this.commetList = [...this.commetList, ...res.data.data.results];
      this.endid = res.data.data.end_id;
      this.offset = res.data.data.last_id;
      if (this.offset === this.endid) {
        // 说明数据已经加载完毕
        this.finished = true;
      }
      // 关闭加载状态
      this.loading = false;
    },
    //发布评论
    addcomment( value) {
      this.commetList.push(value);
    },
    onLoad() {
      this.getArticleComment();
    }
  },
  async created() {
    //获取文章id
    this.artid = this.$route.params.artid;
    let res = await apiGetArticleDetails(this.artid);
    // console.log(res);
    this.articleDetails = res.data.data;
    this.getArticleComment();
  }
};
</script>


<style lang="less" scoped>
.mydetails {
  margin-top: 46px;
  margin-bottom: 54px;
  .mytitle {
    text-align: center;
  }
  .userinfo {
    display: flex;
    .usericon {
      .icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .username {
      flex: 1;
      .myname {
        color: #3e9df8;
      }
    }
    .mylike {
      text-align: center;
      .mybtn {
        color: red;
      }
    }
  }
}
.van-cell__value.van-cell__value--alone {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
}
.van-nav-bar.van-hairline--bottom {
  background-color: #3e9df8;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
}
</style>