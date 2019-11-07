<template>
  <div class="home_wallet" style="overflow: hidden;">
    <!-- 我的钱包 -->
    <div class="item_title">{{ $t('title.wallet') }}</div>
    <el-row>
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
        <div class="box_2">
          <div class="box_2_left">
            <div class="left_img">
              <img src="../../../lkh_images/money.png" alt>
            </div>
            <div class="left_money">${{ walletData.walletCp|FORMATTED_NUMBER }}</div>
            <!-- CP钱包当前总额 -->
            <div class="left_title">{{ $t('Home.text1') }}</div>
          </div>
        </div>
      </el-col>
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
        <div class="box_2">
          <div class="box_2_left">
            <div class="left_img">
              <img src="../../../lkh_images/money.png" alt>
            </div>
            <div class="left_money">${{ walletData.walletRp|FORMATTED_NUMBER }}</div>
            <!-- RP钱包当前总额 -->
            <div class="left_title">{{ $t('Home.text15') }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
export default {
  name: "home_wallet",
  mixins: [WatchScreen, GetUserInfo],
  inject: ['$main'],
  data() {
    return {
      walletData: {
        walletCp: 0,
        walletRp: 0,
      }
    };
  },
  components: {},
  mounted: function() {
    let vm = this;
    vm.getUserWallet();
  },
  methods: {
    // 获取用户钱包信息
    getUserWallet() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.WALLET_GETUSERWALLET().then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.walletData.walletCp = res.data.walletCp;
          vm.walletData.walletRp = res.data.walletRp;
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

.home_wallet {
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
  .box_2 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    border-radius: 0.2rem;
    overflow: hidden;
    .box_2_left {
      height: 2.32rem;
      width: 100%;
      // background: rgba(41, 79, 120, 1);
      background: url("../../../lkh_images/wallet_bg.png") no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left_money {
        font-size: 0.3rem;
        padding-bottom: 0.3rem;
        padding-top: 0.1rem;
      }
      .left_title {
        font-size: 0.18rem;
        color: #dcf781;
      }
      .left_img {
        width: 0.31rem;
        height: 0.33rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .box_2_right {
      height: 2.32rem;
      flex: 1;
    }
  }
}
</style>
