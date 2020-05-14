<template>
  <div class="login-container">
    <el-form
      ref="regiterForm"
      :model="regiterForm"
      :rules="regiterRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="student_number">
        <el-input
          ref="student_number"
          v-model="regiterForm.student_number"
          placeholder="学号"
          name="student_number"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="regiterForm.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="major">
        <el-input
          ref="major"
          v-model="regiterForm.major"
          placeholder="专业"
          name="major"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="enrollment_year">
        <el-input
          ref="enrollment_year"
          v-model="regiterForm.enrollment_year"
          placeholder="年级"
          name="enrollment_year"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="name">
        <el-input ref="name" v-model="regiterForm.name" placeholder="用户名" name="name" type="text" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="regiterForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          @keyup.enter.native="handleRegister"
        />
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>-->
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >注册</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: any</span>
      </div>-->
    </el-form>
  </div>
</template>

<script>
import { regiter } from "@/api/user";
export default {
  name: "RegisterPage",
  props: {},
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      regiterForm: {
        name: "",
        student_number: "",
        sex: "男",
        major: "",
        enrollment_year: "",
        password: ""
      },
      regiterRules: {
        name: [{ required: true, trigger: "blur" }],
        student_number: [{ required: true, trigger: "blur" }],
        major: [{ required: true, trigger: "blur" }],
        enrollment_year: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  methods: {
    handleRegister() {
      this.$refs.regiterForm.validate(valid => {
        if (valid) {
          this.loading = true;
          regiter(this.regiterForm)
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.msg || "注册成功"
              });
              this.loading = false;
              this.$emit("sw-login");
              this.$refs["regiterForm"].resetFields();
            })
            .catch(() => {
              this.loading = false;
            });
          // this.$store
          //   .dispatch("user/login", this.loginForm)
          //   .then(() => {
          //     // debugger
          //     this.$router.push({ path: this.redirect || "/" });
          //     this.loading = false;
          //   })
          //   .catch(() => {
          //     this.loading = false;
          //   });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
$bg: #2d3a4b;
$dark_gray: #889aa4;
$cursor: #fff;
$light_gray: #eee;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(223, 221, 221, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 5px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  // .show-pwd {
  //   position: absolute;
  //   right: 5px;
  //   top: 7px;
  //   font-size: 16px;
  //   color: $dark_gray;
  //   cursor: pointer;
  //   user-select: none;
  // }
}
</style>

