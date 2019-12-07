<template>
  <div>
    <van-popup :value="value" @input="$emit('input',false)">
      <van-cell-group style="width:100%">
        <van-cell @click="changeImg" title="从相册中选取" />

        <input ref="myload" @change="change" style="display:none" type="file" />

        <van-cell title="拍照" />
        <van-cell @click="$emit('input',false)" title="取消" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
//图片预览
import Vue from "vue";
import { ImagePreview } from "vant";

Vue.use(ImagePreview);

import { apiUploadUserIcon } from "../api/user";
export default {
  props: ["value"],
  methods: {
    changeImg() {
      this.file.click();
    },
    change() {
      //获取选中的图片
      let fileobj = this.file.files[0];
      //创建一个fileRead
      let reader = new FileReader();
      if (fileobj) {
        reader.readAsDataURL(fileobj);
        reader.addEventListener("load", () => {
          ImagePreview({
            images: [reader.result],
            showIndex: false,
            // 当关闭预览面板时触发
            onClose: this.saveimg
          });
        });
      }
    },
    saveimg() {
      this.$dialog
        .confirm({
          title: "是否确认",
          message: "是否将图片设置为用户头像"
        })
        .then(async () => {
          let res = await apiUploadUserIcon(this.file.files[0]);
          let path = res.data.data.photo;
          this.$emit("path", path);
        })
        .catch(() => {
          console.log("11111111");
        });
      this.$emit("input", false);
    }
  },
  computed: {
    file: function() {
      return this.$refs["myload"];
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup.van-popup--center {
  width: 90%;
  text-align: center;
}
</style>