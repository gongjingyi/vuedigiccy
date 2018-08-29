<template>
    <div class="manage_page">
        <el-row class="manage_page_row">
        	<!--150B4C 0D082B-->
	  		<el-col :span="3" style="min-height: 100%; background-color: #0F0838;">
	  			<div class="mannage_page_logo"><span></span></div>
				<el-menu class="manage_el_menu" style="min-height: 100%;" router background-color="#0F0838">
					<el-menu-item index="Celuelist">bitup</el-menu-item>
					<el-menu-item index="Celuelist_xianji">数字先机</el-menu-item>
          <!-- <el-submenu>
            <template slot="title" class="list-group">策略管理</template>
            <el-menu-item-group>
              <el-menu-item index="Celuelist">bitup</el-menu-item>
              <el-menu-item index="Celuelist">数字先机</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
				</el-menu>
			</el-col>
			<el-col :span="21" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
export default {
  components: {
    headTop
  },
  created() {
    let _this = this;
    const url = "http://47.254.69.149:8000/fundlist";
    const parm = {
      token: localStorage.usertoken,
      username: localStorage.username
    };
    _this.$http.post(url, parm).then(
      response => {
        if (response.body["status"] !== 0) {
          _this.$router.push("/");
        }
      },
      response => {
        _this.$router.push("/");
      }
    );
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.manage_page {
  height: 100%;
}
.manage_page_row {
  height: 100%;
}
.mannage_page_logo {
  height: 80px;
  text-align: center;
}
.mannage_page_logo span {
  display: inline-block;
  height: 50px;
  width: 50px;
  margin-top: 15px;
  .bis("../assets/logo_2.png");
}
.manage_page .el-menu {
  border: 0;
}
.manage_page .el-menu-item {
  text-align: center;
  color: #fff;
}
.manage_page .el-menu-item:hover,
.manage_page .el-menu-item:focus,
.manage_page {
  color: #14a1e8;
}
</style>
