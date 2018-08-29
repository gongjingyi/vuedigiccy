<template>
    <div class="head_container">
      <div class="top-name">
        <el-row type="flex" class="row-bg">
          <el-col class="top-nameL" :span="18">利讯数字货币交易管理系统</el-col>
          <el-col class="top-nameR" :span="6">
            <el-dropdown @command="handleCommand" menu-align='start' class="head-navR">
                <div class="avator"><span class="user_pic"></span><span class="user_name">{{username}}</span></div>
                <el-dropdown-menu slot="dropdown" class="login-inout">
                  <el-dropdown-item command="home">首页</el-dropdown-item>
                  <el-dropdown-item command="singout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <el-row class="head-nav">
        <el-col :span="24">
          <el-breadcrumb separator=">" class="head-navL">
            <el-breadcrumb-item v-for="(item, index) in $route.meta" v-bind:to="{path: item.routerval}" v-bind:key="index">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      avatorsrc: "/src/assets/user.png",
      username: ""
    };
  },
  created() {
    let _this = this;
    _this.$nextTick(function() {
      _this.username = localStorage.username;
    });
  },
  methods: {
    handleCommand(command) {
      if (command === "home") {
        this.$router.push("Celuelist");
      } else if (command === "singout") {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.top-nameR {
  text-align: right;
}
.top-nameR .avator {
  font-size: 0;
}
.top-nameR .avator span {
  display: inline-block;
  float: left;
}
.top-nameR .avator span.user_pic {
  margin: 20px 11px 0 0;
  .bis("../assets/head.png");
  height: 40px;
  width: 40px;
  border-radius: 20px;
}
.avator span.user_name {
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
  line-height: 80px;
  margin-right: 20px;
}
.top-name {
  height: 80px;
  background: #0f0838;
  color: #fff;
}
[class*="el-col-"].top-nameL {
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
}

.head-nav {
  background: #fff;
}

.el-breadcrumb.head-navL,
.el-breadcrumb.head-navR {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.el-breadcrumb.head-navR {
  float: right;
  margin-right: 10px;
}
.el-breadcrumb.head-navL > span:nth-child(1) {
  margin-left: 20px;
}
.el-dropdown-menu {
  margin: 0;
  padding: 0;
}
</style>
