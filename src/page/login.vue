<template>
    <div class="login-page">
        <transition name="form-fade" mode="in-out">
            <section class="form-container">
                <div class="manage_tip"></div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                  <el-form-item prop="username" class="username">
                    <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                  </el-form-item>
                  <el-form-item prop="password" class="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="submitForm('loginForm')" @keyup="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                  </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          // const url = "http://jingyi.digiccytest.com:8000/login";
          const url = "http://47.254.69.149:8000/login";
          const parm = {
            username: _this.loginForm.username,
            passwd: _this.loginForm.password
          };
          _this.$http.post(url, parm).then(
            response => {
              if (response.body["status"] === 0) {
                localStorage.username = _this.loginForm.username;
                localStorage.usertoken = response.body["token"];
                _this.$router.push("Celuelist");
              } else {
                alert("用户名或者密码不对！");
              }
            },
            response => {
              //   error callback
              console.log(JSON.stringify(response));
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.login-page {
  height: 100%;
  width: 100%;
  background: #0f0838;
}
.form-container {
  height: 351px;
  width: 346px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.manage_tip {
  display: inline-block;
  height: 92px;
  width: 342px;
  .bis("../assets/logo.png");
  margin-bottom: 49px;
}
.el-form-item {
  margin-bottom: 30px;
}
.el-input input {
  display: inline-block;
  width: 276px;
  height: 50px;
  border: 0;
  background: #fff;
  padding: 0;
  margin: 0;
  border-radius: 0 4px 4px 0;
  padding-left: 10px;
}
.username .el-input::before {
  content: url(../assets/user.png);
}
.password .el-input::before {
  content: url(../assets/lock.png);
}
.el-input::before {
  display: block;
  height: 50px;
  width: 70px;
  float: left;
}
.el-form-item__content button {
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #643cff, #238bfe);
}
.login-page .button--primary:focus {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}
input:-webkit-autofill {
  box-shadow: 0 0 0 1000px white inset;
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: 0 0 0 1000px white inset;
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
</style>
