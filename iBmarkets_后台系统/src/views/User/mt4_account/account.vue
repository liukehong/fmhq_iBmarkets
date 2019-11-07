<template>
  <div class="mt4_account_account" style="overflow: hidden;">
    <!-- MT4账号 -->
    <div class="item_title">{{ $t('title.MT4Account') }}</div>
    <div class="item_box">
      <div class="item_list_box">
        <el-row>
          <el-col
            class="col-item"
            :class="screenSize == 1?'':'p_r m_b_10'"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
            style="padding-right: 10px;"
          >
            <div class="box">
              <div class="box_img">
                <div
                  style="margin-bottom: .33rem; font-size: .3rem;"
                >${{ p.matchingData.isMoney|FORMATTED_NUMBER }}</div>
              </div>
              <div class="box_text">
                <!-- 服务器名字 -->
                <div class="box_text text1">
                  <div class="fl">{{ $t('mt4Account.text7') }}</div>
                  <div class="fr">{{ p.matchingData.serverAddress||'--' }}</div>
                </div>
                <div class="box_text text2">
                  <!-- MT4-A账号 -->
                  <div class="fl">{{ $t('mt4Account.text1') }}</div>
                  <div class="fr">{{ p.matchingData.mt4Account }}</div>
                </div>
                <!-- MT4-A用户名 -->
                <!--
                <div class="box_text text2">
                  <div class="fl">{{ $t('mt4Account.text2') }}</div>
                  <div class="fr">{{ p.matchingData.userAccount }}</div>
                </div>
                -->
                <div class="box_text text1">
                  <!-- MT4-A密码 -->
                  <div class="fl">{{ $t('mt4Account.text3') }}</div>
                  <div class="fr">{{ p.matchingData.mt4Password }}</div>
                </div>
                <div class="box_text text2">
                  <!-- MT4-A本金 -->
                  <div class="fl">{{ $t('mt4Account.text4') }}</div>
                  <div class="fr">{{ p.matchingData.isMoney|FORMATTED_NUMBER }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "mt4_account_account",
  mixins: [WatchScreen],
  inject: ['p'],
  data() {
    return {
    };
  },
  mounted: function() {
    let vm = this;
    vm.p.fnGetMyMatching();
  },
};
</script>

<style lang="scss">
.p_r {
  padding-right: 0px !important;
}
.p_l {
  padding-left: 0px !important;
}
.m_b_10 {
  margin-bottom: 20px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.mt4_account_account {
  .box {
    background: rgba(36, 73, 118, 1);
    // height: 3.14rem;
    border-radius: 20px 20px 20px 20px;
    overflow: hidden;
    .box_img {
      height: 1.52rem;
      width: 100%;
      background: url("../../../lkh_images/mt4_bg.png");
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .box_text {
      line-height: 0.405rem;
      height: 0.405rem;
      font-size: 0.12rem;
      .fl {
        text-align: right;
        width: 50%;
        color: rgba(178, 212, 255, 1);
      }
      .fr {
        text-align: left;
        width: 50%;
        padding-left: 15px;
      }
    }
    .text1 {
      background: rgba(30, 56, 89, 1);
    }
    .text2 {
      background: rgba(32, 52, 77, 1);
    }
  }
}
</style>
