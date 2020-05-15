<template>
  <div class="user-container">
    <el-card shadow="always">
      <el-tabs :tab-position="tabPosition" style="height: auto">
        <el-tab-pane v-permission="['admin']" v-for="p of tabPaneList" :key="p" :label="p">用户管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  data() {
    return {
      tabPosition: "left",
      tabPaneList: ["用户注册管理", "成员管理", "管理员管理"]
    };
  }
};
</script>

<style lang="scss" scoped>
.user {
  &-container {
    margin: 30px;
  }
  // &-text {
  //   font-size: 30px;
  //   line-height: 46px;
  // }
}
</style>
