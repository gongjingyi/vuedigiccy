<template>
    <div>
        <head-top></head-top>
        <div class="celuedetail-page">
          <table class="celuedetail-top-table" v-html="celuedetailtable">
            <!-- <tr><th rowspan="2" class="gray font18">独角兽回归1号</th><td class="green font18 fontblod">+100.00%</td><td class="green font18 fontblod">+104.3%</td><td class="red font18 fontblod">-106%</td><td class="gray">2.2999</td></tr>
            <tr><td>净值</td><td>日收益</td><td>月收益</td><td>净值</td></tr> -->
          </table>
          <div class="celuedetail-middle">
            <el-row type="flex" class="row-bg">
              <el-col :span="12">
                <div class="grid-content">
                  <el-tabs v-model="tabPosition" type="card" @tab-click="handleClick">
                    <el-tab-pane label="近一月" name="1m">近一月</el-tab-pane>
                    <el-tab-pane label="近三月" name="3m">近三月</el-tab-pane>
                    <el-tab-pane label="半年" name="6m">半年</el-tab-pane>
                    <el-tab-pane label="全部" name="all">全部</el-tab-pane>
                  </el-tabs>
                </div>
                <div class="graph-line-cont">
                  <el-row type="flex" class="row-bg line-cont-title">
                    <el-col :span="12">
                      <div class="grid-content" style="display:none;">
                        <span class="line dpblueB"></span><span class="name">BTC：</span><span v-bind:class="[linebtcradio>0?'radio green fontblod':'radio red fontblod']">{{linebtcradio>0?(parseFloat(linebtcradio)*100).toFixed(2):(parseFloat(linebtcradio)*100).toFixed(2)}}%</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="line yellowB"></span><span class="name">{{lineParmName}}：</span><span v-bind:class="[linefundradio>0?'radio green fontblod':'radio red fontblod']">{{linefundradio>0?(parseFloat(linefundradio)*100).toFixed(2):(parseFloat(linefundradio)*100).toFixed(2)}}%</span>
                      </div>
                    </el-col>
                  </el-row>
                  <div id="line-graph" class="line-graph"></div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content pie-cont">
                  <h4>持仓占比</h4>
                  <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                      <div class="grid-content">
                        <div class="pie-graph" id="pie-graph" style="height:160px;width:160px;"></div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="pie-ul-cont">
                      <div class="grid-content">
                        <ul class="pie-list-ul" v-html="pieliststr">
                          <!-- <li><span class="icon"></span><span class="name">黄金类</span><span class="val">12.7%</span></li> -->
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="celuedetail-bottom">
            <div class="celuedetail-bottom-title">
              <el-row type="flex" class="row-bg">
                <el-col :span="12">
                  <div class="grid-content">
                    <div class="topic">更多调仓</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">
                    <el-menu router><el-menu-item index="Celuecheckall">查看更多流水&nbsp;&nbsp;&nbsp;></el-menu-item></el-menu>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-table :data="detailtableData" style="width: 100%">
              <!-- <el-table-column prop="name" label="交易对"><template slot-scope="scope"><span>{{scope.row.name}}</span></template></el-table-column>
              <el-table-column prop="category" label="操作类型"><template slot-scope="scope"><span v-bind:class="[scope.row.category === 'buy'?'table-but greenB':'table-but redB']">{{scope.row.category === "buy"?"买入":"卖出"}}</span></template></el-table-column>
              <el-table-column prop="time" label="交易时间"><template slot-scope="scope"><span>{{scope.row.time}}</span></template></el-table-column>
              <el-table-column prop="price" label="成交价"><template slot-scope="scope"><span>{{scope.row.price}}</span></template></el-table-column> -->
              <el-table-column prop="pair" label="交易对"><template slot-scope="scope"><span>{{scope.row.pair}}</span></template></el-table-column>
              <!-- <el-table-column prop="flag" label="操作类型"><template slot-scope="scope"><span v-bind:class="[scope.row.flag === 'buy'?'table-but greenB':'table-but redB']">{{scope.row.flag === "buy"?"买入":"卖出"}}</span></template></el-table-column> -->
              <el-table-column prop="flag" label="操作类型"><template slot-scope="scope"><span v-bind:class="[scope.row.flag.indexOf('buy') !== -1?(scope.row.flag === 'buy'?'table-but greenB':'table-but green'):(scope.row.flag === 'sell'?'table-but redB':'table-but red')]">{{scope.row.flag.indexOf("buy") !== -1?(scope.row.flag === "buy"?"做多买入":"做空买入"):(scope.row.flag === "sell"?"做多卖出":"做空卖出")}}</span></template></el-table-column>
              <el-table-column prop="tradetime" label="交易时间"><template slot-scope="scope"><span>{{scope.row.tradetime}}</span></template></el-table-column>
              <el-table-column prop="price" label="成交价"><template slot-scope="scope"><span>{{scope.row.price}}</span></template></el-table-column>
            </el-table>
          </div>
        </div>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
export default {
  data() {
    return {
      celuedetailtable: "",
      pieliststr: "",
      typeval: localStorage.typeval ? localStorage.typeval : "1m",
      tabPosition: localStorage.typeval ? localStorage.typeval : "1m",
      detailtableData: [], // 详情列表
      dateAry: [], // line日期
      zuheAry: [], // BTC
      lineParmName: "", // 对比名称
      dapanAry: [], // 对比策略
      linebtcradio: [],
      linefundradio: [],
      peiary: [],
      lineminval: 0,
      linemaxval: 0,
      markrouter: false
    };
  },
  components: {
    headTop
  },
  watch: {
    $route() {
      // console.log("freafresg");
      let _this = this;
      if (_this.markrouter) {
        // 页面已经被渲染过
        if (window.location.hash.indexOf("/Celuedetail") > 0) {
          _this.drawbottomtable(_this);
          _this.drawtoptable(_this);
          _this.drawpie(_this);
        }
      }
    }
  },
  created() {
    this.$nextTick(function() {
      let _this = this;
      _this.markrouter = true;
      _this.drawbottomtable(_this);
      _this.drawtoptable(_this);
      _this.drawpie(_this);
      _this.flashdata(_this);
    });
  },
  methods: {
    handleClick(tab, event) {
      this.typeval = tab.name;
      localStorage.typeval = tab.name;
      this.drawline(this);
    },
    flashdata(thisval) {
      setTimeout(function() {
        thisval.drawbottomtable(thisval);
        thisval.drawtoptable(thisval);
        thisval.drawpie(thisval);
        thisval.flashdata(thisval);
      }, 60000);
    },
    drawbottomtable(thisval) {
      let url = "http://47.254.69.149:8000/opereates";
      let parm = {
        username: localStorage.username,
        token: localStorage.usertoken,
        fund_id: localStorage.fundid,
        page: 1
      };
      thisval.$http.post(url, parm).then(
        response => {
          if (response.body["status"] === 0) {
            if (response.body["data"] && response.body["data"].length > 0) {
              response.body["data"].forEach(function(v, i, ary) {
                thisval.$set(thisval.detailtableData, i, v);
              });
            } else {
              thisval.detailtableData = [];
            }
          }
        },
        response => {}
      );
    },
    drawtoptable(thisval) {
      let url = "http://47.254.69.149:8000/fundinfo";
      let parm = {
        username: localStorage.username,
        token: localStorage.usertoken,
        fund_id: localStorage.fundid
      };
      thisval.$http.post(url, parm).then(
        response => {
          if (response.body["status"] === 0) {
            thisval.lineParmName = response.body.data["name"];
            thisval.celuedetailtable =
              "<tr><th rowspan='2' class='gray font18'>" +
              response.body.data["name"] +
              "</th><td class='gray fontblod'>" +
              parseFloat(response.body.data["total_amount"]).toFixed(4) +
              "  (usdt)</td><td class='" +
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
            thisval.drawline(thisval); // 拿到另一条策略的名字后画line图
          } else {
          }
        },
        response => {}
      );
    },
    drawpie(thisval) {
      let piedata = [];
      let colorary = [
        "#4293F2",
        "#546285",
        "#8C88DE",
        "#4462A3",
        "#29C17D",
        "#FFA520",
        "#F26F42",
        "#916B45",
        "#38BBDD",
        "#e869ff",
        "#6f7cff",
        "#ffb361",
        "#f67744",
        "#35cefc",
        "#ff557b",
        "#66b543",
        "#fc5939"
      ];
      let pairtotalamount = 0;
      let piestr = "";
      let url = "http://47.254.69.149:8000/fundhold";
      let parm = {
        username: localStorage.username,
        token: localStorage.usertoken,
        fund_id: localStorage.fundid
      };
      thisval.$http.post(url, parm).then(
        response => {
          if (response.body["status"] === 0) {
            thisval.peiary = response.body["data"];
            thisval.peiary.forEach(function(v, i, ary) {
              pairtotalamount += parseFloat(v["pair_amount"]);
            });
            thisval.peiary.forEach(function(v, i, ary) {
              piedata[i] = {};
              piedata[i]["value"] = v["pair_amount"];
              piedata[i]["name"] = v["pair"];
              piestr +=
                "<li><span class='icon' style='background:" +
                colorary[i] +
                "'></span><span class='name'>" +
                v["pair"] +
                "</span><span>" +
                (v["pair_amount"] / pairtotalamount * 100).toFixed(2) +
                "%</span></li>";
            });
            thisval.pieliststr = piestr;
            let mycharts = echarts.init(document.getElementById("pie-graph"));
            mycharts.setOption({
              color: [
                "#4293F2",
                "#546285",
                "#8C88DE",
                "#4462A3",
                "#29C17D",
                "#FFA520",
                "#F26F42",
                "#916B45",
                "#38BBDD",
                "#e869ff",
                "#6f7cff",
                "#ffb361",
                "#f67744",
                "#35cefc",
                "#ff557b",
                "#66b543",
                "#fc5939"
              ],
              series: [
                {
                  hoverAnimation: false,
                  name: "访问来源",
                  type: "pie",
                  radius: ["50%", "100%"],
                  itemStyle: {
                    normal: {
                      labelLine: { show: false },
                      label: { show: false }
                    }
                  },
                  center: ["50%", "50%"],
                  data: piedata
                }
              ]
            });
          }
        },
        response => {}
      );
    },
    drawline(thisval) {
      let url = "http://47.254.69.149:8000/historypct";
      let parm = {
        username: localStorage.username,
        token: localStorage.usertoken,
        fund_id: localStorage.fundid,
        type: thisval.typeval
      };
      // console.log(JSON.stringify(parm));
      // let btcpcts = [];
      let fundpcts = [];
      // let lineminval1 = 0;
      // let linemaxval1 = 0;
      let lineminval2 = 0;
      let linemaxval2 = 0;
      thisval.$http.post(url, parm).then(
        response => {
          // console.log(JSON.stringify(response));
          if (response.body["status"] === 0) {
            thisval.dateAry = [];
            thisval.zuheAry = [];
            thisval.dapanAry = [];
            thisval.linebtcradio = response.body["btc_last_pct"];
            thisval.linefundradio = response.body["fund_last_pct"];
            // btcpcts = response.body["btc_pcts"];
            fundpcts = response.body["fund_pcts"];
            if (
              // btcpcts &&
              // btcpcts.length > 0 &&
              fundpcts &&
              fundpcts.length > 0
            ) {
              // lineminval1 = btcpcts[0]["pct"];
              // linemaxval1 = btcpcts[0]["pct"];
              // btcpcts.forEach(function(v, i, ary) {
              //   thisval.dateAry.push(v["day"]);
              //   thisval.zuheAry.push(parseFloat(v["pct"]) * 100);
              //   lineminval1 < v["pct"]
              //     ? (lineminval1 = lineminval1)
              //     : (lineminval1 = v["pct"]);
              //   linemaxval1 > v["pct"]
              //     ? (linemaxval1 = linemaxval1)
              //     : (linemaxval1 = v["pct"]);
              // });
              lineminval2 = fundpcts[0]["pct"];
              lineminval2 = fundpcts[0]["pct"];
              fundpcts.forEach(function(v, i, ary) {
                let datacurrent = v["day"].toString();
                if (i !== 0) {
                  datacurrent = datacurrent.toString().slice(4);
                }
                thisval.dateAry.push(datacurrent);
                thisval.dapanAry.push(parseFloat(v["pct"]) * 100);
                lineminval2 < v["pct"]
                  ? (lineminval2 = lineminval2)
                  : (lineminval2 = v["pct"]);
                linemaxval2 > v["pct"]
                  ? (linemaxval2 = linemaxval2)
                  : (linemaxval2 = v["pct"]);
              });
              // lineminval1 < lineminval2
              //   ? (thisval.lineminval = lineminval1)
              //   : (thisval.lineminval = lineminval2);
              // linemaxval1 > linemaxval2
              //   ? (thisval.linemaxval = linemaxval1)
              //   : (thisval.linemaxval = linemaxval2);
              thisval.lineminval = lineminval2;
              thisval.linemaxval = linemaxval2;

              let mycharts = echarts.init(
                document.getElementById("line-graph")
              );
              mycharts.setOption({
                tooltip: {
                  trigger: "axis",
                  formatter: function(params, ticket, callback) {
                    var res = params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                      res +=
                        "<br/>" +
                        params[i]["seriesName"] +
                        " : " +
                        parseFloat(params[i]["value"]).toFixed(2) +
                        "%";
                    }
                    setTimeout(function() {
                      // 仅为了模拟异步回调
                      callback(ticket, res);
                    }, 10);
                    return "loading";
                  }
                },
                calculable: true,
                grid: {
                  borderWidth: 0,
                  x: "55px",
                  y: "10px",
                  x2: "0",
                  y2: "30px"
                },
                xAxis: [
                  {
                    boundaryGap: false,
                    type: "category",
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisTick: { show: false },
                    data: thisval.dateAry
                  }
                ],
                yAxis: [
                  {
                    type: "value",
                    scale: true,
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitNumber: 2,
                    min: parseFloat(thisval.lineminval) * 100,
                    max: parseFloat(thisval.linemaxval) * 100,
                    axisLabel: {
                      formatter: function(value) {
                        return parseFloat(value).toFixed(1) + "%";
                      }
                    }
                  }
                ],
                series: [
                  // {
                  //   name: "BTC",
                  //   type: "line",
                  //   symbol: "none",
                  //   smooth: true,
                  //   itemStyle: {
                  //     normal: { color: "#607DBB" },
                  //     lineStyle: { width: 1 }
                  //   },
                  //   data: thisval.zuheAry
                  // },
                  {
                    name: thisval.lineParmName,
                    type: "line",
                    symbol: "none",
                    smooth: true,
                    itemStyle: { normal: { color: "#FFA520" } },
                    data: thisval.dapanAry
                  }
                ]
              });
            }
          }
        },
        response => {}
      );
    }
  }
};
</script>
<style lang="less">
table.celuedetail-top-table {
  width: 984px;
  padding: 33px 0;
  margin: 0 0 20px 20px;
  color: #8993aa;
  border-spacing: 0;
  text-align: center;
}
table.celuedetail-top-table > tr th {
  color: #022454;
  font-size: 18px;
}
table.celuedetail-top-table > tr:nth-child(1) td {
  height: 24px;
}
table.celuedetail-top-table > tr:nth-child(2) td {
  height: 29px;
}
.celuedetail-page .el-tabs__item.is-active {
  background: #8993aa;
  color: #fff;
}
.celuedetail-page .el-tabs--card > .el-tabs__header {
  border: 0;
}
.celuedetail-page .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #e9e9e9;
  margin-left: 20px;
  height: 24px;
}
.celuedetail-page .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-bottom: 0;
}
.celuedetail-page .el-tabs__item {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  width: 110px;
  text-align: center;
}
.celuedetail-page .el-menu-item:focus,
.celuedetail-page .el-menu-item:hover {
  background: #fff;
  color: #4293f2;
}
.celuedetail-page .el-table {
  margin-left: 20px;
  padding-bottom: 20px;
}
.celuedetail-page table {
  border: 1px solid #e5e5e5;
}
.celuedetail-page .el-table__header-wrapper {
  // display: inline-block;
  height: 38px;
}
.celuedetail-page .el-table__header thead {
  color: #546285;
  background: #f9f9f9;
}
.celuedetail-page .el-table__header th {
  padding: 0;
  margin: 0;
  text-align: left;
  background: #f9f9f9;
}
.celuedetail-page .el-table__header th:nth-child(1) {
  padding: 0 0 0 20px;
}
.celuedetail-page .el-table__header .cell {
  display: inline-block;
  padding: 0;
  margin: 0;
  text-align: left;
}
.celuedetail-page .el-table__header .cell {
  height: 38px;
  line-height: 38px;
}
.celuedetail-page .el-table__body tr td:nth-child(1) {
  padding-left: 20px;
}
.celuedetail-page .el-table__body td {
  padding: 0;
  background: #fff;
}
.celuedetail-page .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #fff;
}
.celuedetail-page .el-table__body .cell {
  height: 60px;
  line-height: 60px;
  padding: 0;
  margin: 0;
}
.celuedetail-page .el-table__body .cell span {
  display: inline-block;
  height: 100%;
  width: 100%;
  font-size: 14px;
}
.celuedetail-page .el-table__body .cell span.table-but {
  height: 30px;
  width: 76px;
  margin-top: 15px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}
.celuedetail-page .el-table__body .cell span.table-but.green{
  color: #00be63;
  background: #dffff3;
  border:1px solid #00be63;
}
.celuedetail-page .el-table__body .cell span.table-but.red{
  color: #ff8375;
  background: #ffe4e0;
  border:1px solid #ff8375;
}
.el-menu-item:hover {
  background: #fff;
}
.line-graph {
  height: 200px;
}
.pie-graph {
  height: 160px;
  width: 160px;
  margin: 44px 0 0 40px;
}
.graph-line-cont .line-cont-title {
  // width: 450px;
  width: 480px;
  margin-left: 20px;
}
.line-cont-title .grid-content > span {
  display: inline-block;
  font-size: 16px;
  line-height: 20px;
}
.line-cont-title .grid-content {
  font-size: 0;
}
.line-cont-title .grid-content .line {
  height: 6px;
  width: 29px;
  margin-right: 15px;
}
.pie-cont {
  height: 100%;
}
.pie-cont > div {
  height: 100%;
}
.pie-cont h4 {
  font-size: 14px;
  color: #8993aa;
}
.pie-cont .pie-ul-cont {
  height: 100%;
  position: relative;
}
.pie-cont .pie-list-ul {
  // position: absolute;
  // transform: translateY(-50%);
  // top: 50%;
  height: 200px;
  overflow-y: auto;
  cursor: pointer;
}
.pie-list-ul li {
  font-size: 0;
}
.pie-list-ul li + li {
  // margin-top: 17px;
  margin-top: 6px;
}
.pie-list-ul li > span {
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  color: #022454;
  font-weight: bold;
}
.pie-list-ul li > span:nth-child(1) {
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 13px;
}
.pie-list-ul li > span:nth-child(2) {
  margin-right: 10px;
}
.celuedetail-bottom-title {
  height: 70px;
  background: #fff;
  overflow: hidden;
  border-top: 10px solid #e8ebee;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.celuedetail-bottom-title .grid-content {
  height: 70px;
  line-height: 70px;
}
.celuedetail-bottom-title .topic {
  color: #022454;
  font-size: 16px;
  font-weight: bold;
  padding-left: 20px;
}
.celuedetail-page .el-menu-item,
.celuedetail-page .el-menu-item {
  color: #022454;
  font-size: 16px;
  height: 70px;
  line-height: 70px;
  text-align: right;
}
.celuedetail-page .el-menu-item:hover,
.celuedetail-page .el-menu-item:focus {
  color: #409eff;
  font-size: 16px;
}
.el-tab-pane {
  display: none;
}
</style>
