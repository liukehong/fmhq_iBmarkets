<template>
  <div  :style="{width: '100%', height: '100%'}" id="area_chart" class="echarts_box"></div>
</template>

<script>
function formDate (num,type) {
  if (num == "" || num == null) {
      return "";
    }
    var date = new Date(num);
    var Y = date.getFullYear();
    var M =
      (date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1);
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var ymdh = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    if (type) {//输出时间类型
      if (type == 2) {
        ymdh = Y + "-" + M + "-" + D;
      }
      if (type == 3) {
        ymdh = Y + "." + M + "." + D + " " + h + ":" + m;
      }
    }
    return ymdh;
}
import echarts from 'echarts'
export default {
  name: 'Charts',
  data () {
    return {
      areachartData: {
        date: [],
        data: [0, 0, 0, 0, 0, 0, 0]
      },
      echartsInit: null,
      date: '',
      clientWidth: 0,
      timer: false,
    }
  },
  mounted: function () {
    this.fnScrollChange();
  },
  methods: {
    // 监听浏览器变化
      fnScrollChange () {
        let vm = this;
        window.addEventListener("resize", function temp() {
          vm.clientWidth = document.body.clientWidth;
        });
        setTimeout(function(){
          vm.getWeekOk();
        },0)
      },
      drawAreaChart() {
      let areaEcharts = echarts.init(
        document.getElementById("area_chart")
      );
      let date = this.areachartData.date;
      let data = this.areachartData.data;
      var option1 = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: 80,
          right: 50,
          top: 20,
          bottom: 40
        },
        xAxis: {
          type: "category",
          // position: "top",
          boundaryGap: true,
          data: date,
          axisLabel: {
            color: "#fff"
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLabel: {
            // formatter: "{value} %",
            color: "#fff"
          }
          // splitLine: {
          //   lineStyle: {
          //     color: "#353535"
          //   }
          // }
          // min: "0.2",
          // max: "2",
          // splitNumber: 9
        },
        series: [
          {
            name: this.$t("home.price"),
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              // normal: {
              // 	color: '#3097F6'
              // }
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3097F6"
                  },
                  {
                    offset: 1,
                    color: "#7354E7"
                  }
                ])
              }
            },
            lineStyle: {
              width: 3
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3097F6"
                  },
                  {
                    offset: 1,
                    color: "#7354E7"
                  }
                ])
              }
            },
            data: data
          }
        ]
      };
      areaEcharts.setOption(option1);
      this.echartsInit = areaEcharts;
      return areaEcharts;
    },
    getWeekOk() {
      let res = {
          code : 0,
          data: {
              profit: [0,100,107.52,0,0,0,0],
              time: [
                  1553011199000,
                  1552924799000,
                  1552838399000,
                  1552751999000,
                  1552665599000,
                  1552579199000,
                  1552492799000
              ]
          }
      }
      var _this = this;
      var echartsDate = [];
      var echartsData = res.data.profit;
      // for (var k in res.data) {
      //   echartsDate.push(k);
      // }
      // echartsDate = this.bubbleSort(echartsDate);
      // for (var i = 0; i < echartsDate.length; i++) {
      //   echartsData.push(res.data[echartsDate[i]].toFixed(2));
      // }
      res.data.time.forEach(function(val, k) {
        if (val) {
          echartsDate.push(formDate(val, 2));
        } else {
          echartsDate.push("");
        }
      });
      this.areachartData.date = echartsDate;
      this.areachartData.data = echartsData;
      this.drawAreaChart();
    },
  },
  watch: {
    clientWidth(val, oldVal) {
      if (!this.timer) {
        this.clientWidth = val;
        this.timer = true;
        let that = this;
        if (this.echartsInit) {
          setTimeout(function(){
            that.echartsInit.resize();
          },0)
        }
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
}
</script>

<style lang="scss">
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2)
}
.col-item{
  // padding-bottom: 0 .12rem .12rem .12rem;
  // padding: .12rem;
}
.wallet-item{
  padding-right: .1rem;
  height: 1.94rem;
  @media screen and (max-width: 700px) {
    padding-right: 0px;
    margin-bottom: .2rem;
  };
  .register{
    background-image: url('../../../image/home_image1.png');
  }
  .electron{
    background-image: url('../../../image/home_image2.png');
  }
  .cash{
    background-image: url('../../../image/home_image3.png');
  }
  .item{
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
    .text-box{
      height: 1rem;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      padding-left: .21rem;
      p:nth-of-type(1){
        height: .4rem;
        line-height: .4rem;
        font-size: .24rem;
        font-weight: 500;
      }
      p:nth-of-type(2){
        height: .6rem;
        line-height: .6rem;
        font-size: .36rem;
        font-weight: bold;
      }
    }
  }
}
.wallet-item:last-child{
  padding: 0px;
}
.capital-item{
  height: 1.94rem;
  border: .02rem solid rgba(50,168,238,.3);
  padding: .31rem .21rem .2rem .2rem;
  .capital-box{
    padding-bottom: .42rem .2rem .42rem .2rem;
    height: 100%;
    display: flex;
    flex: wrap;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}
.item-box{
  position: relative;
  .title{
    height: .2rem;
    padding: 0 .11rem;
    position: absolute;
    z-index: 999;
    top: -.1rem; 
    left: 50%;
    transform: translateX(-50%);
    line-height: .2rem;
    font-size: .18rem;
    border-left: 2px solid #32A8EE;
    border-right: 2px solid #32A8EE;
    background: rgb(6,11,24);
  }
  .content{
    background: rgb(9,16,55);
  }
}
.personal-item{
  min-height: 3.79rem;
  border: .02rem solid rgba(50,168,238,.3);
  padding: .31rem .21rem .2rem .2rem;
  .personal-box{
    .personal-box-1{
      height: 3.28rem;
      @media screen and (max-width: 700px) {
        height: 2.5rem;
      };
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .meal_icon{
        height: 1.33rem;
        img{
          display: block;
          height: 100%;
        }
      }
      .meal_div{
        margin-top: .41rem;
        width: 90%;
        background: rgb(13,23,67);
        text-align: center;
        padding-top: .1rem;
        padding-bottom: .2rem;
        div{
          padding-bottom: .24rem;
        }
      }
    }
    .personal-box-2{
      height: 3.5rem;
    }
  }
}
</style>
