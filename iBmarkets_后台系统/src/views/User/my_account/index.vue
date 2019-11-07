<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <el-row style="margin-bottom: 10px;" v-if="false">
        <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- 配套管理 -->
          <Product></Product>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col class="col-item" :class="screenSize == 1?'':'p_l p_r m_b_10 m_t_10'" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">
          <!-- 个人信息 -->
          <PersonalInfo></PersonalInfo>
        </el-col>
        <el-col
          style="padding-right: 20px;"
          :class="screenSize == 1?'':'p_l p_r m_b_10 m_t_10'"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="12"
        >
          <!-- 修改邮箱电话 -->
          <EmailPhone></EmailPhone>
        </el-col>
        <el-col
          :class="screenSize == 1?'':'p_l'"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="12"
        >
          <!-- 修改密码 -->
          <Password></Password>
        </el-col>
      </el-row>
       <!-- 我的银行卡 -->
      <el-row style="margin-bottom: 10px;" v-if="false">
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <Bank></Bank>
        </el-col>
      </el-row>
      <!-- 邀请注册 -->
      <el-row style="margin-bottom: 10px;">
        <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <Invite></Invite>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import PersonalInfo from "./personal_info";
import EmailPhone from "./email_phone";
import Password from "./password";
import Invite from "./invite";
import Product from "./product"
import Bank from './bank';
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
export default {
  mixins: [WatchScreen,GetUserInfo],
  name: "my_account",
  inject: ['$main'],
  provide () {
      return {
          p: this,
      }
  },
  data() {
    return {
      walletData: {},
      matchingData: '',
    };
  },
  components: {
    PersonalInfo,
    EmailPhone,
    Password,
    Invite,
    Product,
    Bank
  },
  mounted: function () {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    // 初始化
    fnInit () {
      let vm = this;
      vm.getUserWallet();
    },
    // 获取用户钱包信息
    getUserWallet () {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.WALLET_GETUSERWALLET().then(res=>{
        vm.$main.loading = false;
          if(res.code == 0){
            vm.walletData = res.data;
          }
      })
    },
    // 获取当前用户配套信息
    getMatching () {
      let vm = this;
      vm.$api.MATCHING_GETMYMATCHING().then(res=>{
          if(res.code == 0){
            vm.matchingData = res.data.length>0?res.data[0]:{
              isMoney: 0,
              userMatchingId: '',
            };
          }
      })
    },
  }
};
</script>

<style lang="scss">
.p_l{
    padding-left: 0px;
}
.m_b_10{
    margin-bottom: 10px;
}
.m_t_10{
    margin-top: 10px;
}
</style>
