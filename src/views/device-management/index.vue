<template>
  <div class="device-container">
    <el-card shadow="always" style="min-height: 320px;">
      <div>
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column
            v-for="c of defaultColumn"
            :key="c.value"
            :fixed="c.fixed"
            :prop="c.value"
            :label="c.label"
            :width="c.width || 'auto'"
          />
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
import { deviceList } from "@/api/device";
export default {
  data() {
    return {
      defaultColumn: [
        {
          label: "名称",
          value: "Name",
          // width: 120,
          fixed: false
        },
        {
          label: "数量",
          value: "Count",
          // width: 120,
          fixed: false
        },
        {
          label: "型号/品牌",
          value: "Model",
          // width: 120,
          fixed: false
        },
        {
          label: "更新时间",
          value: "Release_Time",
          // width: 120,
          fixed: false
        },
        {
          label: "状态",
          value: "Status",
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
    this.getDeviceList();
  },
  methods: {
    onPageChange(page) {
      this.getDeviceList();
    },
    async getDeviceList() {
      const PARAMS = {
        page: this.page.current_page,
        pageSize: 10 // 默认每页10条
      };
      const res = await deviceList(PARAMS);
      this.tableData = res.data;
      this.page = { ...this.page, ...res };
      console.log(res, "ll");
    }
  }
};
</script>

<style lang="scss" scoped>
.device {
  &-container {
    margin: 30px;
  }
}
</style>
