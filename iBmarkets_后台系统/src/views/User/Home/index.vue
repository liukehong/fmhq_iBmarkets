<template>
  <div class="home_index1">
    <el-row>
      <!-- 我的钱包 -->
      <el-col
        style="padding-right: 20px; margin-bottom: 20px;"
        :class="screenSize == 1?'':'p_r'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Wallet></Wallet>
      </el-col>
      <!-- 我的配套 -->
      <el-col
        v-if="false"
        style="padding-right: 20px;"
        :class="screenSize == 1?'':'m_b_20 p_r'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="7"
      >
        <Product></Product>
      </el-col>
      <!-- 我的等级 -->
      <el-col
        :class="screenSize == 1?'':'m_b_20'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Grade></Grade>
      </el-col>
    </el-row>
    <el-row>
      <!-- 每周收益 -->
      <el-col
        style="padding-right: 20px; margin-bottom: 20px;"
        :class="screenSize == 1?'':'p_r'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Profit></Profit>
      </el-col>
      <!-- 系统公告 -->
      <el-col
        style="margin-bottom: 20px;"
        :class="screenSize == 1?'':'p_r'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <SystemList></SystemList>
      </el-col>
    </el-row>
    <el-row>
      <!-- RP充值 -->
      <el-col
        style="padding-right: 20px; margin-bottom: 20px;"
        :class="screenSize == 1?'':'p_r'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <Rp></Rp>
      </el-col>
    </el-row>
    <!-- 企业要闻 -->
    <el-row>
      <el-col
        style="padding-right: 20px;"
        :class="screenSize == 1?'':'p_r'"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
      >
        <News></News>
      </el-col>
    </el-row>
    <!-- 支付凭证 -->
    <el-dialog
      :modal-append-to-body="false"
      :title="$t('admin_programManage.text7')"
      :visible.sync="dialogVisible"
      :width="screenSize == 1?'60%':'90%'"
    >
      <img
        :src="imageAddress"
        alt
        style="width: 100%; height: 100%; display:block; min-height: 3rem;"
      />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import EchartOne from "./OneCharts";
import EchartTow from "./TowCharts";
import Wallet from "./wallet";
import Product from "./product";
import Grade from "./grade";
import Profit from "./profit";
import SystemList from "./systemList";
import News from "./news";
import Rp from "./rp";
export default {
  name: "home_index1",
  inject: ["$main"],
  mixins: [WatchScreen],
  provide() {
    return {
      p: this
    };
  },
  data() {
    return {
      imageAddress: "",
      dialogVisible: false,
      ap: "",
      cp: "",
      rp: "",
      bankMoney: 100,
      exchangeRate: ""
    };
  },
  components: {
    EchartOne,
    EchartTow,
    Wallet,
    Product,
    Grade,
    Profit,
    SystemList,
    News,
    Rp
  },
  mounted: function() {
    let vm = this;
    vm.getRate();
    vm.fnGetData();
  },
  methods: {
    // 获取最新数据
    fnGetData() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.SYSTEM_GETNEWPROGRAM().then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.imageAddress = res.data.programImageAddress || "";
          if(!!vm.imageAddress){
            vm.dialogVisible = true;
          }
        }
      });
    },
    getRate: function() {
      let vm = this;
      vm.$api.SYSTEM_EXCHANGERATERMB().then(res => {
        vm.exchangeRate = res.data.exchangeRate;
      });
    }
  }
};
</script>

<style lang="scss">
.home_index1 {
  .el-dialog__header {
    // display: none !important;
  }
  .el-dialog__body {
    padding: 0px !important;
  }
  .el-dialog__footer {
    display: none !important;
  }
}
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2);
}
.col-item {
}
.wallet-item {
  padding-right: 0.1rem;
  height: 1.94rem;
  @media screen and (max-width: 700px) {
    padding-right: 0px;
    margin-bottom: 0.2rem;
  }
  .register {
    background-image: url("../../../image/home_image1.png");
  }
  .electron {
    background-image: url("../../../image/home_image2.png");
  }
  .cash {
    background-image: url("../../../image/home_image3.png");
  }
  .item {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
    .text-box {
      height: 1rem;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      padding-left: 0.21rem;
      p:nth-of-type(1) {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        font-weight: 500;
      }
      p:nth-of-type(2) {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
  }
}
.wallet-item:last-child {
  padding: 0px;
}
.capital-item {
  height: 1.94rem;
  border: 0.02rem solid rgba(50, 168, 238, 0.3);
  padding: 0.31rem 0.21rem 0.2rem 0.2rem;
  .capital-box {
    padding-bottom: 0.42rem 0.2rem 0.42rem 0.2rem;
    height: 100%;
    display: flex;
    flex: wrap;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}
.item-box {
  position: relative;
  .title {
    height: 0.2rem;
    padding: 0 0.11rem;
    position: absolute;
    z-index: 999;
    top: -0.1rem;
    left: 50%;
    transform: translateX(-50%);
    line-height: 0.2rem;
    font-size: 0.18rem;
    border-left: 2px solid #32a8ee;
    border-right: 2px solid #32a8ee;
    background: rgb(6, 11, 24);
  }
  .content {
    background: rgb(9, 16, 55);
  }
}
.personal-item {
  min-height: 3.79rem;
  border: 0.02rem solid rgba(50, 168, 238, 0.3);
  padding: 0.31rem 0.21rem 0.2rem 0.2rem;
  .personal-box {
    .personal-wrap {
      height: 3.24rem;
      @media screen and (max-width: 700px) {
        height: 2.5rem;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .meal_icon {
        height: 1.33rem;
        img {
          display: block;
          height: 100%;
        }
      }
      .meal_div {
        margin-top: 0.41rem;
        width: 90%;
        background: rgb(13, 23, 67);
        text-align: center;
        padding-top: 0.1rem;
        padding-bottom: 0.2rem;
        div {
          padding-bottom: 0.24rem;
        }
      }
    }
    .personal-box-2 {
      height: 3.28rem;
    }
  }
}
.userInfo-item {
  height: 3.79rem;
  padding: 0.31rem 0.21rem 0.2rem 0.2rem;
  border: 0.02rem solid rgba(50, 168, 238, 0.3);
  .userInfo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .userInfo-img {
      width: 1.24rem;
      height: 1.24rem;
      img {
        display: block;
        height: 100%;
      }
    }
    .title1 {
      padding-top: 0.21rem;
      font-size: 0.18rem;
      font-weight: bold;
    }
    .title2 {
      padding-top: 0.29rem;
      font-size: 0.18rem;
      font-weight: 500;
      color: rgba(137, 155, 196, 1);
    }
  }
}
.profit-item {
  height: 3.79rem;
  .profit-box {
    height: 100%;
  }
}
.mime-item {
  height: 3.79rem;
  padding: 0.31rem 0.21rem 0.2rem 0.2rem;
  border: 0.02rem solid rgba(50, 168, 238, 0.3);
  .mime-box {
    height: 100%;
    .content-top {
      overflow: hidden;
      background: rgb(13, 23, 67);
      p {
        width: 25%;
        text-align: center;
        float: left;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.16rem;
        font-weight: 400;
        color: rgba(137, 155, 196, 1);
      }
    }
    .content-bottom {
      .bottom-img {
        margin: 0 auto;
        margin-top: 0.57rem;
        width: 1.17rem;
        height: 1.33rem;
        img {
          display: block;
          height: 100%;
        }
      }
    }
  }
}
</style>
