<template>
  <div>
    <router-view></router-view>
    <van-tabbar :route="true">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item  to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item  to="/media" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
 
};
</script>

<style>
</style>