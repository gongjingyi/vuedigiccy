<template>
    <div>
        <head-top></head-top>
        <div class="celuecheckall-page">
          <table class="celuecheckall-top-table" v-html="celuecheckalltable">
            <!-- <tr><th rowspan="2" class="gray font18">独角兽回归1号</th><td class="green font18 fontblod">+100.00%</td><td class="green font18 fontblod">+104.3%</td><td class="red font18 fontblod">-106%</td><td class="gray">2.2999</td></tr>
            <tr><td>净值</td><td>日收益</td><td>月收益</td><td>净值</td></tr> -->
          </table>
          <div class="celuecheckall-bottom">
            <div class="celuecheckall-bottom-title">
              <el-row type="flex" class="row-bg">
                <el-col :span="12">
                  <div class="grid-content">
                    <div class="topic">更多调仓</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="celuecheckall-table">
              <div class="celuecheckall-table-list" v-for="(itme,index) in chackalltableData" v-bind:key="itme.date">
                <el-row type="flex" class="row-bg tableitemmark">
                  <el-col :span="12">
                    <div class="grid-content">
                      <div class="time">{{itme.date}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <div class="arrow"><i @click="celuecheckallitem($event,index)" class="el-icon-arrow-up"></i></div>
                    </div>
                  </el-col>
                </el-row>
                <el-table :data="itme.detaillistary" style="width: 100%" class="tableitem">
                  <el-table-column prop="pair" label="交易对"><template slot-scope="scope"><span>{{scope.row.pair}}</span></template></el-table-column>
                  <!-- <el-table-column prop="flag" label="操作类型"><template slot-scope="scope"><span v-bind:class="[scope.row.flag === 'buy'?'table-but greenB':'table-but redB']">{{scope.row.flag === "buy"?"买入":"卖出"}}</span></template></el-table-column> -->
                  <el-table-column prop="flag" label="操作类型"><template slot-scope="scope"><span v-bind:class="[scope.row.flag.indexOf('buy') !== -1?(scope.row.flag === 'buy'?'table-but greenB':'table-but green'):(scope.row.flag === 'sell'?'table-but redB':'table-but red')]">{{scope.row.flag.indexOf("buy") !== -1?(scope.row.flag === "buy"?"做多买入":"做空买入"):(scope.row.flag === "sell"?"做多卖出":"做空卖出")}}</span></template></el-table-column>
                  <el-table-column prop="tradetime" label="交易时间"><template slot-scope="scope"><span>{{scope.row.tradetime}}</span></template></el-table-column>
                  <el-table-column prop="price" label="成交价"><template slot-scope="scope"><span>{{scope.row.price}}</span></template></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="getmore" style="height:50px;line-height:40px;text-align:center;cursor:pointer;font-size:22px;" v-on:click="checkalldata">查看更多</div>
          </div>
        </div>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
export default {
  data() {
    return {
      celuecheckalltable: "",
      pageinival: 1,
      markfundidchange: false,
      chackalltableData: []
    };
  },
  components: {
    headTop
  },
  watch: {
    $route() {
      // console.log("freafresg");
      let _this = this;
      if (_this.markfundidchange) {
        // 页面已经被渲染过
        _this.chackalltableData = [];
        _this.drawalltoptable(_this);
        _this.drawallbottomtable(_this);
      }
    }
  },
  $route() {
    let _this = this;
    if (_this.markfundidchange) {
      // 页面已经被渲染过
      console.log("22222");
      _this.drawalltoptable(_this);
      _this.drawallbottomtable(_this);
    }
  },
  created() {
    this.$nextTick(function() {
      let _this = this;
      _this.markfundidchange = true;
      _this.drawalltoptable(_this);
      _this.drawallbottomtable(_this);
    });
  },
  methods: {
    checkalldata() {
      this.drawallbottomtable(this);
    },
    drawallbottomtable(thisval) {
      let url = "http://47.254.69.149:8000/opereates";
      let parm = {
        username: localStorage.username,
        token: localStorage.usertoken,
        fund_id: localStorage.fundid,
        page: thisval.pageinival
      };
      thisval.$http.post(url, parm).then(
        response => {
          if (response.body["status"] === 0) {
            let bottomtableobj = response.body.data;
            if (bottomtableobj && bottomtableobj.length > 0) {
              let checkallaryint = {};
              checkallaryint["date"] = bottomtableobj[0]["tradetime"].split(
                " "
              )[0];
              checkallaryint["detaillistary"] = bottomtableobj;
              thisval.chackalltableData.push(checkallaryint);
              thisval.pageinival = thisval.pageinival + 1;
            }
          }
          if (thisval.pageinival === 2) {
            thisval.drawallbottomtable(thisval);
          }
        },
        response => {}
      );
    },
    drawalltoptable(thisval) {
      let url = "http://47.254.69.149:8000/fundinfo";
      let parm = {
        username: localStorage.username,
        token: localStorage.usertoken,
        fund_id: localStorage.fundid
      };
      thisval.$http.post(url, parm).then(
        response => {
          if (response.body["status"] === 0) {
            thisval.celuecheckalltable =
              "<tr><th rowspan='2' class='gray font18'>" +
              response.body.data["name"] +
              "</th><td class='gray fontblod'>" +
              parseFloat(response.body.data["total_amount"]).toFixed(4) +
              "</td><td class='" +
              (response.body.data["day_pct"] > 0
                ? "green font18 fontblod"
                : "red font18 fontblod") +
              "'>" +
              (response.body.data["day_pct"] * 100).toFixed(2) +
              "%</td><td class='" +
              (response.body.data["month_pct"] > 0
                ? "green font18 fontblod"
                : "red font18 fontblod") +
              "'>" +
              (response.body.data["month_pct"] * 100).toFixed(2) +
              "%</td><td class='gray fontblod'>" +
              parseFloat(response.body.data["net_value"]).toFixed(4) +
              "</td></tr><tr><td>总资产</td><td>日收益</td><td>月收益</td><td>净值</td></tr>";
          } else {
          }
        },
        response => {}
      );
    },
    celuecheckallitem(eventval, indexval) {
      if (event.target.className === "el-icon-arrow-up") {
        event.target.className = "el-icon-arrow-down";
        document.getElementsByClassName("tableitem")[indexval].style.display =
          "none";
      } else {
        event.target.className = "el-icon-arrow-up";
        document.getElementsByClassName("tableitem")[indexval].style.display =
          "block";
      }
    }
  }
};
</script>
<style lang="less">
table.celuecheckall-top-table {
  width: 984px;
  padding: 33px 0;
  margin: 0 0 20px 20px;
  color: #8993aa;
  border-spacing: 0;
  text-align: center;
}
table.celuecheckall-top-table > tr th {
  color: #022454;
  font-size: 18px;
}
table.celuecheckall-top-table > tr:nth-child(1) td {
  height: 24px;
}
table.celuecheckall-top-table > tr:nth-child(2) td {
  height: 29px;
}
.celuecheckall-page .el-radio-group {
  border: 1px solid #e9e9e9;
}
.celuecheckall-page .el-radio-button__inner:hover {
  color: #f7694f;
}
.celuecheckall-page .el-radio-button__inner {
  background: #fff;
  border: 0;
  border-left: 1px solid #e9e9e9;
  width: 110px;
}
.celuecheckall-page .is-active .el-radio-button__inner {
  background: #8993aa;
  color: #fff;
  border-color: #e9e9e9;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: 0 0 0 #fff;
}

.celuecheckall-page table {
  border: 1px solid #e5e5e5;
}
.celuecheckall-page .el-table__header-wrapper {
  // display: inline-block;
  height: 38px;
}
.celuecheckall-page .el-table__header thead {
  color: #546285;
  background: #f9f9f9;
}
.celuecheckall-page .el-table__header th {
  padding: 0;
  margin: 0;
  text-align: left;
  background: #fff;
}
.celuecheckall-page .el-table__header th:nth-child(1) {
  padding: 0 0 0 20px;
}
.celuecheckall-page .el-table__header .cell {
  display: inline-block;
  padding: 0;
  margin: 0;
  text-align: left;
}
.celuecheckall-page .el-table__header .cell {
  height: 38px;
  line-height: 38px;
}
.celuecheckall-page .el-table__body tr td:nth-child(1) {
  padding-left: 20px;
}
.celuecheckall-page .el-table__body td {
  padding: 0;
  background: #fff;
}
.celuecheckall-page .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #fff;
}
.celuecheckall-page .el-table__body .cell {
  height: 60px;
  line-height: 60px;
  padding: 0;
  margin: 0;
}
.celuecheckall-page .el-table__body .cell span {
  display: inline-block;
  height: 100%;
  width: 100%;
  font-size: 14px;
}
.celuecheckall-page .el-table__body .cell span.table-but {
  height: 30px;
  width: 76px;
  margin-top: 15px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}
.celuecheckall-page .el-table__body .cell span.table-but.green{
  color: #00be63;
  background: #dffff3;
  border:1px solid #00be63;
}
.celuecheckall-page .el-table__body .cell span.table-but.red{
  color: #ff8375;
  background: #ffe4e0;
  border:1px solid #ff8375;
}
.el-menu-item:hover {
  background: #fff;
}
.celuecheckall-bottom-title {
  height: 70px;
  line-height: 70px;
  border-top: 10px solid #e8ebee;
  border-bottom: 1px solid #e6e6e6;
}
.celuecheckall-bottom-title .topic {
  padding-left: 20px;
  color: #022454;
  font-weight: bold;
}
.celuecheckall-table {
  padding-bottom: 20px;
}
.el-row--flex.tableitemmark {
  height: 50px;
  line-height: 50px;
  background: #f9f9f9;
  color: #546285;
  border: 1px solid #e5e5e5;
}
.celuecheckall-table-list .time {
  padding-left: 20px;
}
.celuecheckall-table-list .arrow {
  text-align: right;
}
.celuecheckall-table-list .arrow i {
  width: 120px;
  height: 50px;
  line-height: 50px;
  text-align: right;
  padding-right: 20px;
  cursor: pointer;
}
.celuecheckall-table-list .time,
.celuecheckall-table-list .arrow {
  // height: 50px;
  // line-height: 50px;
  // background: #f9f9f9;
  // color: #546285;
}
.celuecheckall-table-list {
  margin: 20px 20px 0 20px;
}
</style>
