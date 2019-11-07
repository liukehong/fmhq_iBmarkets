<template>
  <div class="app_add" style="overflow: hidden;">
    <!-- RP充值 -->
    <div class="item_title">{{ $t('title.ap') }}</div>
    <div class="item_box">
      <div class="item_list_box">
        <el-row>
            <!-- box1 -->
            <el-col style="padding-right: 10px;" :class="screenSize == 1?'':'p_r'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="4">
                <div class="box1">
                    <div class="box1_content">
                        <div class="box1_img">
                            <img src="../../../lkh_images/wallet.png" alt="">
                        </div>
                        <div class="box1_money">${{ p.walletData.walletRp|FORMATTED_NUMBER }}</div>
                        <!-- RP钱包当前总额 -->
                        <div class="box1_title">{{ $t('Home.text15') }}</div>
                    </div>
                </div>
            </el-col>
            <!-- box2 -->
            <el-col style="padding-left: 10px;" :class="screenSize == 1?'':'p_l'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="16" :xl="8">
              <!-- 表单 -->
              <AppAddType></AppAddType>
            </el-col>
            <!-- box3 -->
            <el-col style="padding-left: 40px;" :class="screenSize == 1?'':'p_l'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
              <div class="box3">
                <!-- 注意事项 -->
                <div>{{ $t('Wallet.text2') }}</div>
                <div>
                  <!-- 一、支付宝入金时客户扫码时间需在 2 分钟内，如超过 2 分钟，请重新在平台上请求生成二维码。 -->
                  <p>{{ $t('Wallet.text3') }}</p>
                  <!-- 二、所有充值渠道都会收取3%的手续费。 -->
                  <p>{{ $t('Wallet.text29') }}</p>


                  <!-- 二、入金时使用网银或快捷支付的用户，快捷支付额度在人民币 5000 元以内，网银支付额度在人民币 2 万元以内。 -->
                  <!-- <p>{{ $t('Wallet.text4') }}</p> -->
                  <!-- 三、出金操作时间为 9：00 至 18：00，且同一张卡同一金额出金，请间隔 10 分钟再申请。 -->
                  <!-- <p>{{ $t('Wallet.text5') }}</p> -->
                  <!--  四、单笔交易出金时，不超过人民币 5 万元，且同一账户需不同数额出款。 -->
                  <!-- <p>{{ $t('Wallet.text6') }}</p> -->
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
import AppAddType from './app_add_type'
export default {
  name: "app_add",
  mixins: [WatchScreen],
  inject: ['p'],
  data() {
    return {
      walletData: '',
    };
  },
  components: {
    AppAddType
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
  }
};
</script>
<style lang="scss">
.p_r{
  padding-right: 0px;
}
.p_l{
  padding-left: 0px;
}
.app_add{
    .box1{
        overflow: hidden;
        .box1_content{
            height: 2.52rem;
            // background: rgba(35, 96, 166, .6);
            background: url('../../../lkh_images/wallet_bg.png') no-repeat;
            background-size: cover;
            border-radius: .2rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .box1_img{
                width: .31rem;
                height: .33rem;
                margin-bottom: .2rem;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }     
            .box1_money{
                margin-bottom: .33rem;
                font-size: .3rem;
            }   
            .box1_title{
                font-size: .18rem;
                color: #515254;
                text-align: center;
            } 
        }
    }
    .box3{
      overflow: hidden;
      padding-top: .2rem;
      div{
        color: rgba(255, 118, 63, 1);
        font-size: .12rem;
        padding-bottom: .1rem;
      }
      p{
        font-size: .12rem;
        color: #000;
        padding-bottom: .1rem;
      }
    }
}
</style>
