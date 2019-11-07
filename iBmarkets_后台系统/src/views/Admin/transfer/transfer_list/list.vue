<template>
  <div class="item_box transfer_list_list">
    <div class="item_table_box">
      <el-select
        style="padding-top: .2rem; width: 2rem; padding-left: .2rem;"
        size="small"
        v-model="params.walletType"
        :placeholder="$t('form.please')"
        @change="changeState"
      >
        <!-- 全部 -->
        <el-option label="全部" :value="-1"></el-option>
        <!-- CP -->
        <el-option label="CP" :value="2"></el-option>
        <!-- RP -->
        <el-option label="RP" :value="3"></el-option>
        <!-- MT4 -->
        <el-option label="MT4" :value="5"></el-option>
      </el-select>
      <!-- 时间选择 -->
      <TableDate @changeDate="changeDataByDate"></TableDate>
      <div class="sel_label" style="overflow:hidden;">
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <!-- 用户名 -->
        <el-input
          size="small"
          class="sel_input"
          v-model="params.account"
          :placeholder="$t('table.userName')"
        ></el-input>
        <!-- 搜索 -->
        <el-button
          size="small"
          @click="fnContentFil"
          class="sel_btn"
          type="primary"
        >{{ $t('btn.search') }}</el-button>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!-- 导出Excel -->
            <!-- <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 0px; margin-top: .1rem;'"
              size="small"
              @click="fnExcel"
              class="sel_btn"
              type="success"
            >{{ $t('btn.Excel') }}</el-button>-->
            <!-- 导出原始数据 -->
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
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :stripe="true"
        :data="tableData"
      >
        <!-- 日期 -->
        <el-table-column :label="$t('table.orderCreateTime')" width="200">
          <template slot-scope="scope">{{ scope.row.walletLogCreateTime }}</template>
        </el-table-column>
        <!-- 关联用户 -->
        <el-table-column :label="$t('table.linkedAccount')">
          <template slot-scope="scope">{{ scope.row.linkedAccount||'--' }}</template>
        </el-table-column>
        <!-- 操作行为 -->
        <el-table-column :label="$t('table.walletLogBehavior')" width="200">
          <template slot-scope="scope">{{ BEHAVIOR(scope.row.walletLogBehavior) }}</template>
        </el-table-column>
        <!-- 用户账号 -->
        <el-table-column :label="$t('table.userAccount')">
          <template slot-scope="scope">{{ scope.row.userAccount }}</template>
        </el-table-column>
        <!-- 用户ID -->
        <!-- <el-table-column :label="$t('table.userId')">
          <template slot-scope="scope">{{ scope.row.userId }}</template>
        </el-table-column> -->
        <!-- 金额 -->
        <el-table-column :label="$t('table.money')">
          <template slot-scope="scope">{{ scope.row.walletLogMoney|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 余额 -->
        <el-table-column :label="$t('table.balance')">
          <template slot-scope="scope">{{ scope.row.walletLogMoneyRear|FORMATTED_NUMBER }}</template>
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
  name: "transfer_list_list",
  mixins: [WatchScreen],
  inject: ["p"],
  components: {
    TableDate
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
        account: "",
        walletLogType: "",
        startTime: "",
        endTime: "",
        walletType: -1,
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 导出数据-前端
    fnExcelData() {
      let vm = this;
      //excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../../assets/js/Export2Excel");
        const tHeader = ["日期", "关联用户","操作行为","用户账号",'金额','钱包类型'];
        const filterVal = ["walletLogCreateTime", "linkedAccount",'new_walletLogBehavior','userAccount','walletLogMoney','new_walletType'];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "转账记录");
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
    // 订单状态
    changeState(val) {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      // vm.params.startTime = data.startTime;
      // vm.params.endTime = data.endTime;
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    },
    BEHAVIOR(data) {
      let vm = this;
      let type;
      type = vm.$t(`filters.behavior_type${data}`);
      return type;
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
      let params = Object.assign({}, vm.params,{
        walletType: vm.params.walletType == -1?'':vm.params.walletType
      });
      vm.loading = true;
      vm.$api.LOGGING_SELECTWALLETLOGTRANSFER(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list;
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
