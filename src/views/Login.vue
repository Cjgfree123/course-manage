<template>
  <div id="login">
    <div class="login-wrap">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.psw" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { loginUrl } from "@/api/baseUrl.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        psw: ""
      }
    };
  },
  methods: {
    onLogin() {
      axios
        .post(loginUrl, {
          userName:this.userName,
          psw:this.psw,
        })
        .then(function({ data: res }) {
          console.log(res);
          if (res.errcode === 0) {
            // 全局提示请求成功
            // 跳转到课程列表页面
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
#login {
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  min-height: 300px;
  background: url("../common/image/login.jpg");
  .login-wrap {
    position: absolute;
    width: 460px;
    height: 100%;
    min-height: 300px;
    background: rgba(255, 255, 255, 0.4);
    top: 0;
    right: 0;
    .el-form {
      position: relative;
      top: 35%;
      left: 0;
      .el-input {
        width: 282px;
        height: 36px;
      }
      .el-button {
        width: 282px;
      }
    }
  }
}
</style>