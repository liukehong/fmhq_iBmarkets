<template>
  <div class="list_wallet" style="overflow: hidden;">
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
              v-model="params.userAccount"
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
            <!-- 导出所有原始数据 -->
            <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 0px; margin-top: .1rem;'"
              size="small"
              @click="fnExcelAllData"
              class="sel_btn"
              type="success"
            >{{ $t('btn.ExcelAll') }}</el-button>
            <!-- 导出Excel -->
            <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 10px; margin-top: .1rem;'"
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
        <!-- 日期 -->
        <el-table-column width="200" :label="$t('table.orderCreateTime')">
          <template slot-scope="scope">{{ scope.row.walletLogCreateTime }}</template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column :label="$t('table.userName')">
          <template slot-scope="scope">{{ scope.row.userAccount||'--' }}</template>
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
      allTableData: [],
      params: {
        userAccount: "",
        walletLogType: "",
        behavior: "",
        pageSize: 10,
        page: 1,
        walletType: 3
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
        let tHeader = [
          "日期",
          "用户名",
          "关联用户",
          "金额",
          "操作后金额",
          "出/入金",
          "操作行为"
        ];
        let filterVal = [
          "walletLogCreateTime",
          "userAccount",
          "linkedAccount",
          "walletLogMoney",
          "walletLogMoneyRear",
          "new_walletLogType",
          "new_walletLogBehavior"
        ];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "RP钱包明细");
      });
    },
    // 导出所有数据
    fnExcelAllData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      params.pageSize = vm.total;
      vm.$main.loading = true;
      vm.$api.LOGGING_GETUSERWALLETLOGS(params).then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.allTableData = res.data.list;
          //excel数据导出
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../assets/js/Export2Excel");
            let tHeader = [
              "日期",
              "用户名",
              "关联用户",
              "金额",
              "操作后金额",
              "出/入金",
              "操作行为"
            ];
            let filterVal = [
              "walletLogCreateTime",
              "userAccount",
              "linkedAccount",
              "walletLogMoney",
              "walletLogMoneyRear",
              "new_walletLogType",
              "new_walletLogBehavior"
            ];
            let list = vm.fileterData(vm.allTableData); // 数据过滤
            let data = vm.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "RP钱包明细");
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 导出的数据过滤
    fileterData(data) {
      let vm = this;
      let arrs = [];
      let list = data || vm.tableData;
      list.forEach((item, index) => {
        item.new_walletLogType = vm.$t(
          `filters.walletLog_type${item.walletLogType}`
        ); // 出入金
        item.new_walletLogBehavior = vm.WALLETLOGBEHAVIOR(
          item.walletLogBehavior
        ); // 状态
        arrs.push(item);
      });
      return arrs;
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
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
