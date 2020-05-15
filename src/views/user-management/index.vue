<template>
  <div class="user-container">
    <el-card shadow="always" style="min-height: 320px;">
      <el-tabs :tab-position="tabPosition" style="height: 100%">
        <el-tab-pane v-for="p of tabPaneList" :key="p.label" v-permission="p.acl" :label="p.label">
          <div style="margin: 10px 10px;">
            <el-table :data="tableData" border style="width: 100%;">
              <el-table-column
                v-for="c of defaultColumn"
                :key="c.value"
                :fixed="c.fixed"
                :prop="c.value"
                :label="c.label"
                :width="c.width || 120"
              />
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="handleClick(scope.row)">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
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
      ],
      defaultColumn: [
        {
          label: "姓名",
          value: "Name",
          width: 120,
          fixed: false
        },
        {
          label: "学号",
          value: "Student_Number",
          width: 120,
          fixed: false
        },
        {
          label: "专业",
          value: "Major",
          width: 120,
          fixed: false
        },
        {
          label: "年级",
          value: "Enrollment_Year",
          width: 120,
          fixed: false
        },
        {
          label: "性别",
          value: "Sex",
          width: 120,
          fixed: false
        }
      ],
      tableData: []
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
