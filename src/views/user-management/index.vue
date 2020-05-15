<template>
  <div class="user-container">
    <el-card shadow="always">
      <el-tabs :tab-position="tabPosition" style="height: auto">
        <el-tab-pane
          v-for="p of tabPaneList"
          :key="p"
          v-permission="p.acl"
          :label="p.label"
        >{{ p.label }}</el-tab-pane>
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
      tabPaneList: [
        {
          label: "用户注册管理",
          acl: ["super_admin", "admin"]
        },
        {
          label: "管理员管理",
          acl: ["super_admin"]
        },
        {
          label: "成员管理",
          acl: ["super_admin", "admin"]
        }
      ]
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
