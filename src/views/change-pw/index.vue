<template>
  <div class="pw-container">
    <el-form
      ref="ruleForm"
      style="max-width: 420px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="oldpass">
        <el-input v-model="ruleForm.oldpass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePwd } from "@/api/user";
export default {
  name: "ChangePw",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldpass: [{ required: true, trigger: "blur", message: "请输入旧密码" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const PARAMS = {
            old: this.ruleForm.oldpass,
            new: this.ruleForm.checkPass
          };
          // alert("submit!");
          const res = await updatePwd(PARAMS);
          if (res) {
            this.$message({
              type: "success",
              message: "修改密码成功!"
            });
            this.$store.dispatch("user/logout");
            this.$router.push(`/login`);
          }
          console.log(res, "sddsd");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.pw {
  &-container {
    margin: 30px;
  }
}
</style>
