<template>
  <div style="overflow: hidden;">
    <div class="item_title">{{ $t('menu.walletLog') }}</div>
    <div class="item_box">
      <el-select size="small" v-model="listType" placeholder="请选择" style="margin-left: .2rem; margin-top: .2rem; margin-bottom: .2rem;">
        <!-- 钱包流水 -->
        <el-option
          :label="$t('Wallet.text25')"
          value="wallet"
        ></el-option>
        <!-- 充值明细 -->
        <el-option
          :label="$t('Wallet.text21')"
          value="add"
        ></el-option>
        <!-- 提现明细 -->
        <el-option
          :label="$t('Wallet.text22')"
          value="get"
        ></el-option>
        <!-- 转账明细 -->
        <el-option
          :label="$t('Wallet.text23')"
          value="transfer"
        ></el-option>
        <!-- MT4钱包 -->
        <el-option
          :label="$t('Wallet.text27')"
          value="mt4"
        ></el-option>
        <!-- RP钱包 -->
        <el-option
          :label="$t('Wallet.text28')"
          value="rp"
        ></el-option>
        <!-- CP钱包 -->
        <el-option
          :label="$t('Wallet.text30')"
          value="cp"
        ></el-option>
      </el-select>
      <ListAdd v-if="listType == 'add'"></ListAdd>
      <ListGet v-if="listType == 'get'"></ListGet>
      <ListTransfer v-if="listType == 'transfer'"></ListTransfer>
      <ListWallet v-if="listType=='wallet'"></ListWallet>
      <ListMt4 v-if="listType=='mt4'"></ListMt4>
      <ListRp v-if="listType=='rp'"></ListRp>
      <ListCp v-if="listType=='cp'"></ListCp>
    </div>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import ListAdd from "./list_add.vue";
import ListGet from "./list_get.vue";
import ListTransfer from "./list_transfer.vue";
import ListWallet from './list_wallet.vue';
import ListMt4 from './list_mt4';
import ListRp from './list_rp';
import ListCp from './list_cp';
export default {
  name: "wallet_index",
  mixins: [WatchScreen],
  components: {
    TableDate,
    ListAdd,
    ListGet,
    ListTransfer,
    ListWallet,
    ListMt4,
    ListRp,
    ListCp
  },
  data() {
    return {
      listType: 'wallet',
      loading: false,
      currentPage: 1,
      tableData: [],
      params: {
        withdrawalApplyType: 0,
        withdrawalApplyStatus: "",
        account: "",
        pageSize: 10,
        page: 1
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 审核状态
    STATUS(data) {
      let vm = this;
      if (data == 0) {
        // 申请中
        return vm.$t("filters.examine_status1");
      } else if (data == 1) {
        // 审核通过
        return vm.$t("filters.examine_status2");
      } else if (data == 2) {
        // 审核驳回
        return vm.$t("filters.examine_status3");
      } else {
        // 取消操作
        return vm.$t("filters.examine_status4");
      }
    },
    // 每页要展示多少条
    handleSizeChange(val) {
      let vm = this;
      vm.params.pageSize = val;
      vm.fnGetData();
    },
    // 当前第几页
    handleCurrentChange(val) {
      let vm = this;
      vm.params.page = val;
      vm.fnGetData();
      vm.currentPage = val;
    },
    // 获取列表数据
    fnGetData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      vm.loading = true;
      vm.$api.SYSTEM_GETWIDTHDRAWALAPPLYS(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.total;
        }
        vm.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
