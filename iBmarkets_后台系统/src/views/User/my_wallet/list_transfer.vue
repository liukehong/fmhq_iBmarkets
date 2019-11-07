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
          <!--  日期-->
          <el-table-column :label="$t('table.orderCreateTime')">
            <template slot-scope="scope">{{ scope.row.walletLogCreateTime }}</template>
          </el-table-column>
          <!-- 关联用户 -->
           <el-table-column :label="$t('table.linkedAccount')">
            <template slot-scope="scope">{{ scope.row.linkedAccount }}</template>
          </el-table-column>
          <!-- 操作行为 -->
           <el-table-column :label="$t('table.walletLogBehavior')">
            <template slot-scope="scope">{{ BEHAVIOR(scope.row.walletLogBehavior) }}</template>
          </el-table-column>
          <!-- 金额 -->
          <el-table-column :label="$t('table.money')">
            <template slot-scope="scope">{{ scope.row.walletLogMoney }}</template>
          </el-table-column>
          <!-- 余额 -->
          <el-table-column :label="$t('table.balance')">
            <template slot-scope="scope">{{ scope.row.walletLogMoneyRear }}</template>
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
        account: "",
        walletLogType: "",
        startTime: '',
        endTime: '',
        walletType: '',
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    BEHAVIOR (data) {
      let vm = this;
      let type;
      type = vm.$t(`filters.behavior_type${data}`)
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
      vm.$api.LOGGING_SELECTWALLETLOGTRANSFER(params).then(res => {
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
