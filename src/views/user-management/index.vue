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
                  <el-button
                    size="small"
                    type="text"
                    @click="handleClick('dealApply' ,scope.row)"
                  >处理申请</el-button>
                  <el-button type="text" size="small" @click="handleClick('delete' ,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="text-align: right; margin-top: 10px;"
              background
              layout="prev, pager, next"
              :current-page.sync="page.current_page"
              :total="page.total"
              @current-change="getRegiterApplyList"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="apply">
        <h4 style="margin: 0 0 20px 0;">是否同意申请?</h4>
        <el-radio v-model="aggreApply" label="Y">同意</el-radio>
        <el-radio v-model="aggreApply" label="N">拒绝</el-radio>
        <div style="margin: 10px 0 0 0; text-align: right;">
          <el-button type="primary" :loading="applyLoading" @click="handleAgreeApply">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regiterApply, agreeApply, login } from "@/api/user";
export default {
  name: "UserManagement",
  data() {
    return {
      dialogTitle: "处理申请",
      dialogVisible: false,
      tabPosition: "left",
      // apply
      aggreApply: "",
      applyLoading: false,
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
      tableData: [],
      currentRow: {},
      page: {
        current_page: 1, // page
        total: 100
        // max_page: ''
      }
    };
  },
  mounted() {
    this.getRegiterApplyList();
  },
  methods: {
    handleClick(type, row) {
      this.currentRow = row;
      switch (type) {
        case "dealApply":
          const PARAMS = {
            student_number: row.Student_Number,
            agree: "Y"
          };
          this.dialogVisible = true;
          console.log(row, "Student_Number");
          break;
        case "delete":
          break;
      }
    },
    /**
     * 查询申请列表
     */
    getRegiterApplyList() {
      const PARAMS = {
        page: this.page.current_page,
        pageSize: 10, // 默认每页10条
        name: "",
        student_number: ""
      };
      regiterApply(PARAMS).then(res => {
        this.tableData = res.data;
        this.page = { ...this.page, ...res };
      });
    },
    handleAgreeApply() {
      this.applyLoading = true;
      const PARAMS = {
        student_number: this.currentRow.Student_Number,
        agree: this.aggreApply
      };
      agreeApply(PARAMS)
        .then(res => {
          this.$message({
            type: "success",
            message: res.msg || "处理成功"
          });
          this.getRegiterApplyList();
          this.dialogVisible = false;
        })
        .finally(() => {
          this.applyLoading = false;
          this.dialogVisible = false;
          this.aggreApply = ''
        });
    }
    // onPageChange(page) {
    //   console.log(this.page.current_page, "page");
    //   this.getRegiterApplyList();
    // }
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
