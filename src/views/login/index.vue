<template>
  <div class="container">
    <div class="main-area">
      <el-card shadow="always">
        <div class="sys-title">407实验室管理系统</div>
        <el-tabs v-model="activeTab" stretch @tab-click="handleClick">
          <el-tab-pane label="用户登录" name="login">
            <login />
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="register">用户注册</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import login from "./login";
export default {
  name: "WelcomePage",
  components: {
    login
  },
  data() {
    return {
      activeTab: "login"
    };
  },
  watch: {},
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="scss">
// $bg: #2d3a4b;
// $dark_gray: #889aa4;
// $light_gray: #eee;
.container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  .main-area {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .sys-title {
      color: #509678a9;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      padding: 8px 10px;
    }
  }
}
</style>
