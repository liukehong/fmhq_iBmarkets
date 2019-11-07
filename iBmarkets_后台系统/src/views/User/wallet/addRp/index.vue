<template>
  <transition name="fade">
    <div class="my_wallet_index" style="overflow: hidden;">
      <div style="overflow: hidden;" v-show="pageType == 'index'">
        <el-row>
          <el-col
            style="margin-bottom: 10px;"
            :class="screenSize == 1?'':'p_r'"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
            <!-- RP充值 -->
            <Add></Add>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import Add from "./add";
export default {
  mixins: [WatchScreen],
  name: "my_wallet_index",
  data() {
    return {
      pageType: "index",
      bankMoney: 100,
      exchangeRate: "",
      walletData: {
        walletCp: 0,
        walletRp: 0,
      },
      newDate: +(new Date())
    };
  },
  inject: ['$main'],
  provide() {
    return {
      p: this
    };
  },
  components: {
    Add,
  },
  mounted: function() {
    let vm = this;
    vm.getRate();
    vm.getUserWallet();
  },
  methods: {
    // 获取用户钱包信息
    getUserWallet () {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.WALLET_GETUSERWALLET().then(res=>{
        vm.$main.loading = false;
          if(res.code == 0){
            vm.walletData.walletCp = res.data.walletCp;
            vm.walletData.walletRp = res.data.walletRp;
          }
      })
    },
    getRate: function() {
      let vm = this;
      vm.$api.SYSTEM_EXCHANGERATERMB().then(res => {
        vm.exchangeRate = res.data.exchangeRate;
      });
    }
  },
  watch: {
    newDate: function (nel,old) {
      let vm = this;
      vm.getUserWallet();
    }
  }
};
</script>
<style lang="scss">
.p_l {
  padding-left: 0px;
}
.p_r {
  padding-right: 0px !important;
}
.m_b_10 {
  margin-bottom: 10px;
}
.m_t_10 {
  margin-top: 10px;
}
</style>
