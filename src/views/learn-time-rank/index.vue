<template>
  <div class="rank-container">
    <el-card shadow="always" style="min-height: 320px;">
      <div style="margin: 10px 10px;">
        <div class="btn-area">
          <el-button style="margin: 10px 0 10px 0" type="primary" size="small" @click="handleClick('myDetail', $event)">我的记录</el-button>
        </div>
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
                v-permission="['super_admin', 'admin']"
                size="small"
                type="text"
                @click="dialogVisible = true; currentRow = scope.row;"
              >详情</el-button>
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
    </el-card>
  </div>
</template>

<script>
import { rankList } from "@/api/rank";
import { getUserRecode } from "@/api/user";
export default {
  name: "LearnTimeRank",
  data() {
    return {
      defaultColumn: [
        {
          label: "排名",
          value: "Rank",
          // width: 120,
          fixed: false
        },
        {
          label: "姓名",
          value: "Name",
          // width: 120,
          fixed: false
        },
        {
          label: "进出次数",
          value: "Punch_Times",
          // width: 120,
          fixed: false
        },
        {
          label: "总时间",
          value: "Total_Time",
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
  created() {
    this.getLearnRankList();
  },
  methods: {
    handleClick(type, row) {
      this.currentRow = row;
      switch (type) {
        case "myDetail":
          this.getUserRecodeDetail()
          break;
      }
    },
    onPageChange(page) {
      this.getLearnRankList();
    },
    async getLearnRankList() {
      const PARAMS = {
        page: this.page.current_page,
        pageSize: 10 // 默认每页10条
      };
      const rank = await rankList(PARAMS);
      this.tableData = rank.data;
      this.page = { ...this.page, ...rank };
      console.log(rank);
    },
    async getUserRecodeDetail() {
      const record = await getUserRecode();
      console.log(record, "recode");
    }
  }
};
</script>

<style lang="scss" scoped>
.rank {
  &-container {
    margin: 30px;
  }
  // &-text {
  //   font-size: 30px;
  //   line-height: 46px;
  // }
}
</style>
