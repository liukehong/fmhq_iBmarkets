<template>
  <div class="list_wallet" style="overflow: hidden;">
    <div class="item_table_box">
      <!-- 时间选择 -->
      <TableDate style="padding-top: 0px; padding-bottom: .2rem;" @changeDate="changeDataByDate"></TableDate>
      <el-table
        row-class-name="rowClassName"
        header-row-class-name="headerRowClassName"
        style="width: 100%;"
        :stripe="true"
        :data="tableData"
      >
        <!-- 日期 -->
        <el-table-column width="200" :label="$t('table.orderCreateTime')">
          <template slot-scope="scope">{{ scope.row.walletLogCreateTime }}</template>
        </el-table-column>
        <!-- 关联用户 -->
        <el-table-column :label="$t('table.linkedAccount')">
          <template slot-scope="scope">{{ scope.row.linkedAccount||'--' }}</template>
        </el-table-column>
        <!-- 金额 -->
        <el-table-column :label="$t('table.money')">
          <template slot-scope="scope">{{ scope.row.walletLogMoney|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 操作后金额 -->
        <el-table-column :label="$t('table.oldMoney')">
          <template slot-scope="scope">{{ scope.row.walletLogMoneyRear|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 钱包类型 -->
        <el-table-column :label="$t('table.walletType')">
          <template slot-scope="scope">{{ WALLETTYPE(scope.row.walletType) }}</template>
        </el-table-column>
        <!-- 出/入金 -->
        <el-table-column :label="$t('table.outEnter')">
          <template slot-scope="scope">{{ $t(`filters.walletLog_type${scope.row.walletLogType}`) }}</template>
        </el-table-column>
        <!-- 操作行为 -->
        <el-table-column :label="$t('table.walletLogBehavior')">
          <template slot-scope="scope">{{ WALLETLOGBEHAVIOR(scope.row.walletLogBehavior) }}</template>
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
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "list_wallet",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  inject: ["$main"],
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        userAccount: "",
        walletLogType: "",
        behavior: "",
        pageSize: 10,
        page: 1,
        walletType: '',
        startTime: '',
        endTime: '',
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    },
    WALLETTYPE (data) {
      let vm = this;
      if(data == 1){
        return 'ap';
      }else if(data == 2){
        return 'cp';
      }else if(data == 3){
        return 'rp';
      }else if(data == 5){
        return 'mt4';
      }else {
        return 'cp';
      }
    },
    // 操作行为 walletLogBehavior
    WALLETLOGBEHAVIOR(data) {
      let vm = this;
      return vm.$t(`filters.behavior_type${data}`);
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
      vm.$main.loading = true;
      vm.$api.LOGGING_GETUSERWALLETLOGS(params).then(res => {
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
