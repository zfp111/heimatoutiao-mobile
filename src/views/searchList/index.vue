<template>
  <div class="myresult">
    <van-nav-bar class="mynav" @click-left="back" left-arrow background="#3e9df8" fixed title="搜索结果" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell @click="detail(item.art_id)" v-for="(item,index) in resultList" :key="index">
          <template slot="title">
            <div class="title">{{item.title}}</div>
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="(img,index) in item.images" :key="index">
                <van-image :src="img" />
              </van-grid-item>
            </van-grid>
            <div class="tips">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}</span>
              <span>{{item.pubdate | spaceTime}}</span>
            </div>
            <van-grid class="opt" :column-num="3">
              <van-grid-item class="mytext" @click="comment"  icon="comment-o" :text="item.comm_count.toString()" />
              <van-grid-item class="mytext" icon="like-o" text="点赞" />
              <van-grid-item class="mytext" icon="share" text="分享" />
            </van-grid>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { apiSearchResults } from "../../api/search";
export default {
  data() {
    return {
      key: "",
      isLoading: false,
      finished: false,
      loading: false,
      pag: 0,
      perpage: 10,
      resultList: []
    };
  },
  methods: {
    async onLoad() {
      this.pag++;
      let res = await apiSearchResults({
        key: this.key,
        page: this.pag,
        perpage: this.perpage
      });
      this.resultList=[... this.resultList,...res.data.data.results]
     
      if(this.resultList.length >= res.data.data.total_count) {
        this.finished = true
      }
      this.loading=false
    },
    onRefresh() {
      this.resultList = []
      this.onLoad()
      this.isLoading = false
    },
    back(){
      this.$router.back()
    },

    comment(){
      if(!this.$login()){
        return 
      }
      console.log('comment')
    },

    detail(aid){
      this.$router.push(`/details/${aid}`)
    }
  },
  created() {
    this.key = this.$route.params.key;
  }
};
</script>

<style lang="less" scoped>
.myresult {
  margin-top: 46px;
  .mynav {
    z-index: 999999;
  }
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
.tips {
  span {
    margin-right: 10px;
    font-size: 12px;
    color: #ccc;
  }
}

/deep/ i.van-icon.van-grid-item__icon {
  font-size: 14px;
  margin-right: 7px;
}
/deep/.van-grid-item__content.van-grid-item__content--center.van-hairline {
  flex-direction: row;
}
/deep/.van-grid-item__icon + .van-grid-item__text {
  margin-top: 0px;
}
.mytext {
  font-size: 12px;
}
</style>