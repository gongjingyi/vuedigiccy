<template>
    <div class="celue-page">
        <head-top></head-top>
         <el-table :data="tableData" style="width: 100%">
          <el-table-column label="策略名称" width="400px"><template slot-scope="scope"><span @click="goceluedetail(scope.$index)" class="product-name blue"><el-menu router><el-menu-item index="Celuedetail">{{scope.row.name}}</el-menu-item></el-menu></span></template></el-table-column>
          <el-table-column label="净值" width="300px"><template slot-scope="scope"><span>{{scope.row.net_value}}</span></template></el-table-column>
          <el-table-column label="日收益"><template slot-scope="scope"><span v-bind:class="[scope.row.day_pct>0?'green':'red']">{{(parseFloat(scope.row.day_pct)*100).toFixed(4)}}%</span></template></el-table-column>
        </el-table>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {
    headTop
  },
  created() {
    let _this = this;
    _this.$nextTick(function() {
      const url = "http://47.254.69.149:8000/fundlist";
      let parm = {
        token: localStorage.usertoken,
        username: localStorage.username
      };
      _this.$http.post(url, parm).then(
        response => {
          if (response.body["status"] === 0) {
            response.body["data"].forEach(function(v, i, ary) {
              _this.$set(_this.tableData, i, v);
            });
          } else {
            console.log(JSON.stringify(response));
          }
        },
        response => {
          console.log(JSON.stringify(response));
        }
      );
    });
  },
  methods: {
    goceluedetail(index) {
      let _this = this;
      localStorage.fundid = _this.tableData[parseInt(index)].fund_id;
      _this.$router.push("Celuedetail");
      // _this.$router.push({
      //   path: "/celuedetail",
      //   query: { id: localStorage.fundid }
      // });
    }
  }
};
</script>
<style lang="less">
.celue-page .el-table {
  margin-left: 20px;
  padding-bottom: 20px;
}
.celue-page table {
  border: 1px solid #e5e5e5;
}
.celue-page .el-table__header-wrapper {
  height: 38px;
}
.celue-page .el-table__header thead {
  color: #546285;
  background: #f9f9f9;
}
.celue-page .el-table__header th {
  padding: 0;
  margin: 0;
  text-align: left;
  background: #f9f9f9;
}
.celue-page .el-table__header th:nth-child(1) {
  padding: 0 0 0 20px;
}
.celue-page .el-table__header .cell {
  display: inline-block;
  padding: 0;
  margin: 0;
  text-align: left;
}
.celue-page .el-table__header .cell {
  height: 38px;
  line-height: 38px;
}
.celue-page .el-table__body tr td:nth-child(1) {
  padding-left: 0;
}
.celue-page .el-table__body td {
  padding: 0;
  background: #fff;
}
.celue-page .el-table__body tr.current-row > td,
.celue-page .el-table__body tr > td,
.celue-page .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #fff;
}
.celue-page table .el-table__body tr > td:hover {
  background-color: #fff;
}
.celue-page .el-table__body .cell {
  height: 60px;
  line-height: 60px;
  padding: 0;
  margin: 0;
}
.product-name {
  color: #0e0521;
}
.celue-page .el-table__body .cell span {
  display: inline-block;
  height: 100%;
  width: 100%;
  font-size: 14px;
}
.product-name:hover {
  cursor: pointer;
}
.product-name .el-menu {
  padding: 0;
  margin: 0;
  height: 100%;
}
.product-name ul .el-menu-item {
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #0e0521;
  text-align: left;
  background: #fff;
}
.product-name ul .el-menu-item:focus,
.product-name ul .el-menu-item:hover {
  background: #fff;
  color: #4293f2;
}
</style>
