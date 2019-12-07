<template>
  <div>
    <van-popup
      :value="show"
      :overlay="true"
      @input="$emit('input',false)"
      position="left"
      :style="{ width: '90%',height:'100%' }"
    >
      <van-cell>
        <template slot="title">
          <van-icon class="myclose" @click="$emit('input',false)" name="cross" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">我的频道</template>
        <template slot="default">
          <van-button
            plain
            round
            type="danger"
            v-if="showclear===false"
            @click="showclear=true"
            size="mini"
          >编辑</van-button>
          <van-button
            plain
            round
            type="danger"
            v-if="showclear===true"
            @click="showclear=false"
            size="mini"
          >完成</van-button>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <van-grid class="mycell">
            <van-grid-item
              v-for="(item,index) in channelList"
              :key="index"
              :style="{fontSize:'12px'}"
              @click="selChannel(index)"
            >
              <template slot="text">
                <van-icon
                  name="clear"
                  @click.stop="delChannel(index)"
                  v-if="showclear && index != 0"
                  class="myclear"
                />
                <span :class="{active: active === index }">{{item.name}}</span>
              </template>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>

      <van-cell>
        <template slot="title">频道推荐</template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <van-grid>
            <van-grid-item
              v-for="(itemlis,index) in tuijian"
              :style="{fontSize:'12px'}"
              :key="index"
              @click="addChannel(itemlis)"
            >
              <template slot="text">
                <div>{{itemlis.name}}</div>
              </template>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannels, apiResetChannels } from "../api/channel";
import { addLocalStarage } from "../utils/processlocal";
export default {
  props: ["show","channelList","active"],
  model: {
    prop: "show",
    event: "input"
  },
  data() {
    return {
      showclear: false,
      allChannels: []
    };
  },
  methods: {
    selChannel(index) {
      this.$emit("update:active", index);
    },
    async getAllChannels() {
      let res = await apiGetAllChannels();
      this.allChannels = res.data.data.channels;
    },
    delChannel(index) {
      // 判断当前下标是否小于传入的下标
      if (index >this.acitve) {
        this.$emit("update:acitve",this.acitve-1);
      }
      this.channelList.splice(index, 1);
      this.saveChannel();
    },
    addChannel(item) {
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "articleList", []);
      this.$set(item, "isLoading", false);
      this.$set(item, "pre_timestamp", null);

      this.channelList.push(item);
      this.saveChannel();
    },
    async saveChannel() {
      let userInfo = this.$store.state.userInfo;
      if (userInfo && userInfo.token) {
        //将数据提交到服务器
        let channels = this.channelList.slice(1).map((item, index) => {
          return {
            id:item.id,
            seq:index + 2
          };
        });
        await apiResetChannels(channels);
      } else {
        addLocalStarage("channels", this.channelList);
      }
    }
  },
  computed: {
    tuijian() {
      let mychannelId = this.channelList.map(item => {
        return item.id;
      });
      let allChannelList = this.allChannels.filter(item => {
        return mychannelId.indexOf(item.id) === -1;
      });
      return allChannelList;
    }
  },
  created() {
    this.getAllChannels();
  }
};
</script>

<style lang="less" scoped>
.myclose {
  font-size: 30px;
}
.mycell {
  position: relative;
  .myclear {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.active {
  color: red;
}
</style>