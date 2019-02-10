<template>
  <div id="header">

    <div class="logo">
      <i>考试云</i>
    </div>

    <div clsss="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#2F3341"
        text-color="#ccc"
        active-text-color="#fff"
      >
        <el-menu-item index="1">课程列表</el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{path:`userInfo/${userId}`}">个人主页</router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = `${key}`;
    }
  },
  computed:{
    ...mapState(['userId'])
  }
};
</script>

<style lang="less" scoped>
#header {
  position: relative;
  height: 57px;
  background: #2f3341;
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 57px;
    line-height: 57px;
    text-indent: 30px;
    font-size: 20px;
    text-align: left;
    color: #fff;
    font-weight: 400;
    font-family: "微软雅黑";
  }

  .el-menu-demo {
    position: absolute;
    left: 200px;
    top: 0;
    height: 57px;
    .el-menu-item {
      height: 57px;
      border: none;
    }
    .is-active {
      border: none !important;
      background: #3f475a !important;
    }
  }
}
</style>
