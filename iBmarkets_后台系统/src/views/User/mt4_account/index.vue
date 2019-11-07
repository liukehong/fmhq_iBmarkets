<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <el-row>
        <el-col
          style="margin-bottom: 10px; padding-right: 20px;"
          :class="screenSize == 1?'':'p_r'"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="10"
          :xl="10"
        >
          <!-- mt4账号 -->
          <Account></Account>
        </el-col>
        <el-col
          style="margin-bottom: 10px;"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="14"
          :xl="14"
        >
          <!-- MT4提币 -->
          <Money></Money>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- MT4提币明细 -->
          <List></List>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import Account from "./account";
import Money from "./money";
import List from "./list";

export default {
  mixins: [WatchScreen],
  name: "mt4_account",
  provide() {
    return {
      p: this
    };
  },
  data() {
    return {
      matchingData: ""
    };
  },
  components: {
    Account,
    Money,
    List
  },
  methods: {
    // 获取用户配套信息
    fnGetMyMatching() {
      let vm = this;
      vm.$api.MATCHING_GETMYMATCHING().then(res => {
        if (res.code == 0) {
          vm.matchingData =
            res.data.length > 0
              ? res.data[0]
              : {
                  isMoney: 0,
                  mt4Account: "--",
                  mt4Password: "--",
                  userAccount: "--",
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
