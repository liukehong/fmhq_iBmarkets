<template>
  <div class="home_product" style="overflow: hidden;">
    <div class="item_title">
      <!-- 我的配套 -->
      <div style="float:left;">{{ $t('title.product') }}</div>
    </div>
    <div class="box_1">
      <div class="box_1_left">
        <div class="left_img">
          <img :src="matchingData.isMoney|URLTYPE" alt>
        </div>
        <div class="left-title">{{ isMoney1 }}</div>
        <div class="left-num">{{ MONEY }}</div>
      </div>
      <div class="box_1_right">
        <div class="right_money">${{ matchingData.isMoney|FORMATTED_NUMBER }}</div>
        <!-- 当前投资金额 -->
        <div class="right_title">{{ $t('Home.text2') }}</div>
        <!-- 继续投资 -->
        <el-button @click="fnRouteChange" size="small" type="success">{{ $t('btn.continue') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
export default {
  name: "home_product",
  mixins: [WatchScreen, GetUserInfo],
  data() {
    return {
      matchingData: ""
    };
  },
  computed: {
    isMoney1: function() {
      let data = this.matchingData.isMoney;
      if (data <= 4999) {
        // 初始流量
        return this.$t("Home.text3");
      } else if (data <= 9999) {
        // 优化流量
        return this.$t("Home.text4");
      } else if (data <= 49999) {
        // 精深流量
        return this.$t("Home.text5");
      } else {
        // 无限流量
        return this.$t("Home.text6");
      }
    },
    MONEY: function () {
      let data = this.matchingData.isMoney;
      if (data <= 4999) {
        return "1,000-4,999USD";
      } else if (data <= 9999) {
        return "5,000-9,999USD";
      } else if (data <= 49999) {
        return "10,000-49,999USD";
      } else {
        return `50,000USD${this.$t('Home.text11')}`; // 或以上
      }
    }
  },
  filters: {
    URLTYPE: function(data) {
      if (data <= 4999) {
        return "../../../../static/image/money1.png";
      } else if (data <= 9999) {
        return "../../../../static/image/money2.png";
      } else if (data <= 49999) {
        return "../../../../static/image/money3.png";
      } else {
        return "../../../../static/image/money4.png";
      }
    },
  },
  mounted: function() {
    let vm = this;
    vm.getMatching();
  },
  methods: {
    // 路由跳转
    fnRouteChange() {
      let vm = this;
      vm.$router.push("my_account");
    },
    // 获取当前用户配套信息
    getMatching() {
      let vm = this;
      vm.$api.MATCHING_GETMYMATCHING().then(res => {
        if (res.code == 0) {
          vm.matchingData =
            res.data.length > 0
              ? res.data[0]
              : {
                  isMoney: 0,
                  userMatchingId: ""
                };
        }
      });
    }
  }
};
</script>

<style lang="scss">
.p_l {
  padding-left: 0px !important;
}

.home_product {
  .left_box {
    height: 1.63rem;
    width: 1.63rem;
  }
  .right_box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 1.63rem;
    justify-content: space-evenly;
  }
  .box_3 {
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  .box_1 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    background: rgba(76, 87, 106, 1);
    border-radius: 20px;
    .box_1_left {
      // width: 1.88rem;
      height: 2.32rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left_img {
        // width: 0.87rem;
        // height: 0.81rem;
      }
      .left-title {
        margin-top: 0.04rem;
        font-size: 0.18rem;
      }
      .left-num {
        font-size: 0.12rem;
        line-height: 0.2rem;
        color: rgba(145, 141, 133, 1);
      }
    }
    .box_1_right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 2.4rem;
      height: 2.32rem;
      background: url("../../../lkh_images/product1.png");
      background-size: cover;
      .right_money {
        font-size: 0.3rem;
        margin-bottom: 0.33rem;
      }
      .right_title {
        font-size: 0.18rem;
        padding-bottom: 0.2rem;
      }
    }
  }
}
</style>
