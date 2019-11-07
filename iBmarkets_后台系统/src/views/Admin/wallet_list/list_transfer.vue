<template>
  <div style="overflow: hidden;">
    <div class="item_table_box">
      <!-- 时间选择 -->
      <TableDate style="padding-top: 0px; padding-bottom: .2rem;" @changeDate="changeDataByDate"></TableDate>
      <div class="sel_label" ref="loadElement" style="overflow:hidden; padding-top: 0px;">
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!--用户名  -->
            <el-input
              size="small"
              class="sel_input"
              v-model="params.account"
              :placeholder="$t('form.userName')"
            ></el-input>
            <!-- 搜索 -->
            <el-button
              size="small"
              @click="fnContentFil"
              class="sel_btn"
              type="success"
            >{{ $t('btn.search') }}</el-button>
          </el-col>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!-- 导出Excel -->
            <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 0px; margin-top: .1rem;'"
              size="small"
              @click="fnExcelData"
              class="sel_btn"
              type="success"
            >{{ $t('btn.Excel') }}</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        row-class-name="rowClassName"
        header-row-class-name="headerRowClassName"
        style="width: 100%;"
        :stripe="true"
        :data="tableData"
      >
        <!--  日期-->
        <el-table-column width="200" :label="$t('table.orderCreateTime')">
          <template slot-scope="scope">{{ scope.row.walletLogCreateTime }}</template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column :label="$t('table.userName')">
          <template slot-scope="scope">{{ scope.row.userAccount||'--' }}</template>
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
        <!-- 钱包类型 -->
        <el-table-column :label="$t('table.walletType')">
          <template slot-scope="scope">{{ fnWalletType(scope.row.walletType) }}</template>
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
  name: "list_transfer",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  inject: ["$main"],
  data() {
    return {
      type: "add",
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
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 导出数据-前端
    fnExcelData() {
      let vm = this;
      //excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../assets/js/Export2Excel");
        const tHeader = [
          "日期",
          "用户名",
          "关联用户",
          "操作行为",
          "金额",
          "余额",
          "钱包类型",
        ];
        const filterVal = [
          "walletLogCreateTime",
          "userAccount",
          "linkedAccount",
          "new_walletLogBehavior",
          "walletLogMoney",
          "walletLogMoneyRear",
          "new_walletType",
        ];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "转账明细");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 导出的数据过滤
    fileterData() {
      let vm = this;
      let arrs = [];
      vm.tableData.forEach((item, index) => {
        item.new_walletLogBehavior = vm.BEHAVIOR(item.walletLogBehavior); // 操作行为
        item.new_walletType = vm.fnWalletType(item.walletType); // 钱包类型
        arrs.push(item);
      });
      return arrs;
    },
    // 钱包类型
    fnWalletType (data) {
      let vm = this;
      return vm.$t(`filters.wallet_type${data}`)
    },
    BEHAVIOR(data) {
      let vm = this;
      let type;
      type = vm.$t(`filters.behavior_type${data}`);
      return type;
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      vm.params.endTime = formDate(data.endTime, 2);
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
      vm.$main.loading = true;
      vm.$api.LOGGING_SELECTWALLETLOGTRANSFER(params).then(res => {
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
