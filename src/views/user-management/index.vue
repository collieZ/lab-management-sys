<template>
  <div class="user-container">
    <el-card shadow="always" style="min-height: 320px;">
      <el-tabs :tab-position="tabPosition" @tab-click="onTabChange" style="height: 100%">
        <el-tab-pane v-for="p of tabPaneList" :key="p.label" v-permission="p.acl" :label="p.label">
          <div style="margin: 10px 10px;">
            <el-table :data="tableData" border style="width: 100%;">
              <el-table-column
                v-for="c of defaultColumn"
                :key="c.value"
                :fixed="c.fixed"
                :prop="c.value"
                :label="c.label"
                :width="c.width || 'auto'"
              />
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    v-if="currentTab === '用户注册管理'"
                    v-permission="['super_admin', 'admin']"
                    size="small"
                    type="text"
                    @click="dialogVisible = true; currentRow = scope.row;"
                  >处理申请</el-button>
                  <el-button
                    v-if="currentTab === '管理员管理'"
                    v-permission="['super_admin']"
                    size="small"
                    type="text"
                    @click="dialogVisible = true; currentRow = scope.row; scope.row.Admin === '成员' ? setManager = 'N' : setManager = 'Y'"
                  >设置管理员</el-button>
                  <el-button
                    v-if="currentTab === '成员管理'"
                    v-permission="['super_admin', 'admin']"
                    type="text"
                    size="small"
                    @click="handleClick('delete' ,scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="text-align: right; margin-top: 10px;"
              background
              layout="prev, pager, next"
              :current-page.sync="page.current_page"
              :total="page.total"
              @current-change="onPageChange"
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
      <div class="apply" v-if="currentTab === '用户注册管理'">
        <h4 style="margin: 0 0 20px 0;">是否同意申请?</h4>
        <el-radio v-model="aggreApply" label="Y">同意</el-radio>
        <el-radio v-model="aggreApply" label="N">拒绝</el-radio>
        <div style="margin: 10px 0 0 0; text-align: right;">
          <el-button type="primary" :loading="applyLoading" @click="handleAgreeApply">确定</el-button>
        </div>
      </div>
      <div v-if="currentTab === '管理员管理'">
        <h4 style="margin: 0 0 20px 0;">选择是否设置为管理员？</h4>
        <el-radio v-model="setManager" label="Y">是</el-radio>
        <el-radio v-model="setManager" label="N">否</el-radio>
        <div style="margin: 10px 0 0 0; text-align: right;">
          <el-button type="primary" :loading="setManagerLoading" @click="handleSetManager">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  regiterApply,
  agreeApply,
  getMemberList,
  manageAdmin,
  delMember
} from "@/api/user";
export default {
  name: "UserManagement",
  data() {
    return {
      dialogTitle: "处理申请",
      dialogVisible: false,
      tabPosition: "left",
      currentTab: "用户注册管理",
      // apply
      aggreApply: "",
      applyLoading: false,
      // set manege
      setManager: "",
      setManagerLoading: false,
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
          // width: 120,
          fixed: false
        },
        {
          label: "角色",
          value: "Admin",
          // width: 120,
          fixed: false
        },
        {
          label: "学号",
          value: "Student_Number",
          // width: 120,
          fixed: false
        },
        {
          label: "专业",
          value: "Major",
          // width: 120,
          fixed: false
        },
        {
          label: "年级",
          value: "Enrollment_Year",
          // width: 120,
          fixed: false
        },
        {
          label: "性别",
          value: "Sex",
          // width: 120,
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
        // case "dealApply":
        //   this.dialogVisible = true;
        //   break;
        case "delete":
          this.$confirm("此操作将删除该成员, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              delMember({ student_number: row.Student_Number }).then(res => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getMemberList('member')
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });

          break;
      }
    },
    onTabChange(tab) {
      this.currentTab = tab.label;
      this.tableData = [];
      this.page.current_page = 1;
      if (this.currentTab === "用户注册管理") {
        this.getRegiterApplyList();
      } else if (this.currentTab === "管理员管理") {
        this.getMemberList(); // 获取全部过滤超级管理员
      } else {
        this.getMemberList("member"); // 获取成员
      }
    },
    onPageChange(page) {
      // console.log(this.page.current_page, "page");
      if (this.currentTab === "用户注册管理") {
        this.getRegiterApplyList();
      } else if (this.currentTab === "管理员管理") {
        this.getMemberList(); // 获取全部过滤超级管理员
      } else {
        this.getMemberList("member"); // 获取成员
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
    /**
     * 处理申请 注册｜加入的人员
     */
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
          this.aggreApply = "";
        });
    },
    /**
     * 处理 是否设置为管理员
     */
    handleSetManager() {
      this.setManagerLoading = true;
      const PARAMS = {
        student_number: this.currentRow.Student_Number,
        setting: this.setManager
      };
      manageAdmin(PARAMS)
        .then(res => {
          this.$message({
            type: "success",
            message: res.msg || "设置成功"
          });
          this.getMemberList();
          this.dialogVisible = false;
        })
        .finally(() => {
          this.setManagerLoading = false;
          this.dialogVisible = false;
          this.setManager = "";
        });
    },
    /**
     * 获取成员列表，根据当前tab过滤
     */
    getMemberList(role = "all") {
      const PARAMS = {
        role,
        page: this.page.current_page,
        pageSize: 10 // 默认每页10条
      };
      getMemberList(PARAMS).then(res => {
        if (role === "all") {
          const tempData = res.data.filter(u => {
            return u.Admin !== "超级管理员";
          });
          this.tableData = tempData;
          this.page = {
            ...this.page,
            ...res,
            total: res.total - (res.data.length - tempData.length)
          };
          console.log(this.page);
        } else {
          this.tableData = res.data;
          this.page = { ...this.page, ...res };
        }
      });
    }
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
