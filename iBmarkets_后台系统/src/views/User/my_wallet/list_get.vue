<template>
  <div style="overflow: hidden;">
    <div class="item_box">
      <div class="item_table_box">
        <el-table
          row-class-name="rowClassName"
          header-row-class-name="headerRowClassName"
          style="width: 100%;"
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :stripe="true"
          :data="tableData"
        >
          <!-- 日期 -->
          <el-table-column :label="$t('table.orderCreateTime')">
            <template slot-scope="scope">{{ scope.row.withdrawalApplyCreateTime }}</template>
          </el-table-column>
          <!-- 提现金额 -->
          <el-table-column prop="content" :label="$t('table.withdrawalApplyMoney')">
            <template slot-scope="scope">{{ scope.row.withdrawalApplyMoney||'--' }}</template>
          </el-table-column>
          <!-- 手续费 -->
          <el-table-column prop="content" :label="$t('table.serviceCharge')">
            <template
              slot-scope="scope"
            >{{ (scope.row.withdrawalApplyMoney-scope.row.withdrawalApplyTransferMoney).toFixed(2) }}</template>
          </el-table-column>
          <!-- 实际金额 -->
          <el-table-column prop="content" :label="$t('table.withdrawalApplyTransferMoney')">
            <template slot-scope="scope">{{ scope.row.withdrawalApplyTransferMoney||'--' }}</template>
          </el-table-column>
          <!-- 提现方式 -->
          <el-table-column prop="content" :label="$t('table.withdrawalType')">
            <template slot-scope="scope">
              <!-- 地址出金  银行卡出金 -->
              {{ scope.row.spare1 == 1?$t('filters.withdrawal_type1'):$t('filters.withdrawal_type2') }} 
            </template>
          </el-table-column>
          <!-- 地址 -->
          <el-table-column prop="content" :label="$t('table.receiptAddress')">
            <template slot-scope="scope">
              {{ scope.row.spare1 == 1?scope.row.receiptAddress:'--' }}
            </template>
          </el-table-column>
          <!-- MT4账号 -->
          <el-table-column prop="content" :label="$t('table.mt4Account')">
            <template slot-scope="scope">{{ scope.row.mt4Account||'--' }}</template>
          </el-table-column>
          <!-- 状态 -->
          <el-table-column prop="content" :label="$t('table.status')">
            <template slot-scope="scope">{{ STATUS(scope.row.withdrawalApplyStatus) }}</template>
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
    </div>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
export default {
  name: "FeedbackList",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  data() {
    return {
      type: "add",
      loading: false,
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
        withdrawalApplyType: 2,
        withdrawalApplyStatus: "",
        account: ""
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
    STATUS (data) {
      let vm = this;
      let type;
      switch (data) {
        case 0:
          // 申请中
          type = vm.$t('filters.examine_status1');
          break;
        case 1:
          // 审核通过
          type = vm.$t('filters.examine_status2');
          break;
        case 2:
          // 审核驳回
          type = vm.$t('filters.examine_status3');
          break;
        case 3:
          // 取消操作
          type = vm.$t('filters.examine_status4');
          break;
        default:
          // 申请中
          type = vm.$t('filters.examine_status1');
      }
      return type;
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = data.startTime;
      vm.params.endTime = data.endTime;
      vm.fnGetData();
    },
    // type类型变化
    fnTypeChange(val) {
      let vm = this;
      vm.params.type = val;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
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
