<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()">
      <template slot="right">
        <button @click="save" class="btn">保存</button>
      </template>
    </van-nav-bar>
    <van-cell-group class="topnav">
      <van-cell @click="showImg" title="头像" is-link>
        <template slot="default">
          <img class="myicon" :src="userList.photo" alt />
        </template>
      </van-cell>
      <van-cell title="名称" is-link @click="nameshow=true" :value="userList.name" />
      <van-cell title="联系方式" is-link @click="mibileshow=true" :value="userList.mobile" />
    </van-cell-group>

    <van-cell-group>
      <van-cell
        title="性别"
        @click="gendershow=true"
        is-link
        :value="userList.gender === 0 ? '男':'女'"
      />
      <van-cell title="生日" @click="birthdayshow=true" is-link :value="userList.birthday" />
    </van-cell-group>
    <loadimg @path="path" v-model="showimg"></loadimg>
    <!-- 修改名称面板 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
      <van-field v-model="userList.name" required />
    </van-popup>

    <!-- 修改联系方式 -->
    <van-popup v-model="mibileshow" position="bottom" :style="{ height: '8%' }">
      <van-field v-model="userList.mobile" required />
    </van-popup>

    <!-- <van-popup v-model="gendershow" position="bottom" :style="{ height: '10%' }">
      <van-picker :columns="columns"  />
    </van-popup>-->
    <!-- 修改性别 -->
    <van-popup v-model="gendershow" :style="{ height: '30%' }" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="gendershow = false"
        @confirm="onConfirm"
        :default-index="userList.gender"
        :item-height="30"
      />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup v-model="birthdayshow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="userList.birthday"
        @confirm="dateonconfirm"
        type="date"
        :min-date="minDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { apiGetUserProfile, apiProflie } from "../../api/user";
import loadimg from "../../components/uploadImg";
export default {
  components: {
    loadimg
  },
  data() {
    return {
      showimg: false,
      userList: {},
      nameshow: false,
      mibileshow: false,
      gendershow: false,
      birthdayshow: false,
      columns: ["男", "女"],
      minDate: new Date("1990-01-01")
    };
  },
  methods: {
    async save() {
      try{
         let res = await apiProflie({
        name: this.userList.name,
        gender: this.userList.gender,
        birthday: this.userList.birthday
      });
      console.log(res)
      this.$toast.success('修改成功')
      }catch(error){
        console.log(error)
        this.$toast.fail('修改失败')
      }
     
    },
    async getapiGetUserProfile() {
      let res = await apiGetUserProfile();
      console.log(res);
      this.userList = res.data.data;
    },
    showImg() {
      this.showimg = true;
    },
    path(val) {
      this.userList.photo = val;
    },

    onConfirm(value) {
      if (value === "男") {
        this.userList.gender = 0;
      } else {
        this.userList.gender = 1;
      }
      this.gendershow = false;
    },

    dateonconfirm() {}
  },
  created() {
    this.getapiGetUserProfile();
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background-color: #3296fa;
}
span.van-nav-bar__text {
  color: #fff;
}
i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
  color: #fff;
}
.van-nav-bar__title.van-ellipsis {
  color: #fff;
}
.myicon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
/deep/.topnav {
  margin-bottom: 10px;
}
.btn {
  background-color: #3296fa;
  border: 0px;
  color: #fff;
}
</style>