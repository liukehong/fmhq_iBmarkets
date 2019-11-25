<template>
  <div class="item_table_box">
    <!-- 请选择 -->
    <el-select
      style="padding-left: 20px; padding-top: 20px; width: 2rem; padding-bottom: .2rem;"
      size="small"
      v-model="params.umLogBehavior"
      :placeholder="$t('form.please')"
      @change="changeType"
    >
      <!-- 购买配套 -->
      <el-option :label="$t('filters.product_type1')" :value="1"></el-option>
      <!-- 配套升级 -->
      <el-option :label="$t('filters.product_type2')" :value="2"></el-option>
      <!-- 配套退款 -->
      <el-option :label="$t('filters.product_type3')" :value="3"></el-option>
      <!-- 提取收益 -->
      <el-option :label="$t('filters.product_type6')" :value="6"></el-option>
    </el-select>
    <el-table
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 购买时间 -->
      <el-table-column width="180" :label="$t('table.orderCreateTime')">
        <template slot-scope="scope">{{ scope.row.umLogCreateTime }}</template>
      </el-table-column>
      <!-- MT4账号 -->
      <el-table-column :label="$t('table.mt4Account')">
        <template slot-scope="scope">{{ scope.row.mt4Account }}</template>
      </el-table-column>
      <!-- 操作前 -->
      <el-table-column :label="$t('user_product.text18')">
        <template slot-scope="scope">{{ scope.row.matchingMoneyBefore|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 配套金额 -->
      <el-table-column :label="$t('user_product.text13')">
        <template slot-scope="scope">{{ scope.row.matchingMoney|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 操作后 -->
      <el-table-column :label="$t('user_product.text19')">
        <template slot-scope="scope">{{ scope.row.matchingMoneyRear|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 操作类型 -->
      <el-table-column :label="$t('user_product.text20')">
        <template slot-scope="scope">{{ TYPE(scope.row.umLogBehavior) }}</template>
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination
        style="overflow: auto;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "admin_feedback_list",
  mixins: [WatchScreen],
  inject: ["p", "$main"],
  components: {},
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
        userMatchingId: "",
        umLogBehavior: 1,
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    TYPE(data) {
      let vm = this;
      return vm.$t(`filters.product_type${data}`);
    },
    // 订单状态
    changeType(val) {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 查看反馈详情
    fnSeeInfo(data, type) {
      let vm = this;
      vm.p.pageType = type;
      vm.p.info = data;
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
      let params = Object.assign({}, vm.params, {
        messageStatus:
          vm.params.messageStatus == -1 ? "" : vm.params.messageStatus
      });
      vm.$main.loading = true;
      vm.$api.LOGGING_USERMATCHINGLOG(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.total;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
