<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button type="primary" @click="enterMcu">录入门禁</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { enterMcu } from "@/api/user";
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    async enterMcu() {
      const res = await enterMcu()
      console.log(res, 'bind');
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
