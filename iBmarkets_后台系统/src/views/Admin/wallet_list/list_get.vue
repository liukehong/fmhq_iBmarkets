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
          <template slot-scope="scope">{{ scope.row.withdrawalApplyCreateTime }}</template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column :label="$t('table.userName')">
          <template slot-scope="scope">{{ scope.row.userAccount||'--' }}</template>
        </el-table-column>
        <!-- 提现金额 -->
        <el-table-column prop="content" :label="$t('table.withdrawalApplyMoney')">
          <template slot-scope="scope">{{ scope.row.withdrawalApplyMoney|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 手续费 -->
        <el-table-column prop="content" :label="$t('table.serviceCharge')">
          <template
            slot-scope="scope"
          >{{ (scope.row.withdrawalApplyMoney-scope.row.withdrawalApplyTransferMoney).toFixed(2) }}</template>
        </el-table-column>
        <!-- 实际金额 -->
        <el-table-column prop="content" :label="$t('table.withdrawalApplyTransferMoney')">
          <template slot-scope="scope">{{ scope.row.withdrawalApplyTransferMoney|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 提现方式 -->
        <el-table-column prop="content" :label="$t('table.withdrawalType')">
          <template slot-scope="scope">
            <!-- 地址出金  银行卡出金 -->
            {{ scope.row.spare1 == 1?$t('filters.withdrawal_type1'):$t('filters.withdrawal_type1') }}
          </template>
        </el-table-column>
        <!-- 地址 -->
        <el-table-column prop="content" :label="$t('table.receiptAddress')">
          <template slot-scope="scope">{{ scope.row.receiptAddress}}</template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column prop="content" :label="$t('table.status')">
          <template slot-scope="scope">{{ STATUS(scope.row.withdrawalApplyStatus) }}</template>
        </el-table-column>
        <!-- 原因 -->
        <el-table-column prop="content" :label="$t('table.reason')">
          <template slot-scope="scope">{{ scope.row.withdrawalApplyDetails||'--' }}</template>
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
  name: "list_get",
  mixins: [WatchScreen],
  inject: ["$main"],
  components: {
    TableDate
  },
  data() {
    return {
      type: "add",
      currentPage: 1,
      tableData: [],
      allTableData: [],
      params: {
        pageSize: 10,
        page: 1,
        withdrawalApplyType: 2,
        withdrawalApplyStatus: "",
        account: "",
        startTime: "",
        endTime: ""
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
          "提现金额",
          "手续费",
          "实际金额",
          "提现方式",
          "地址",
          "状态",
          "原因"
        ];
        let filterVal = [
          "withdrawalApplyCreateTime",
          "userAccount",
          "withdrawalApplyMoney",
          "new_money",
          "withdrawalApplyTransferMoney",
          "new_spare1",
          "receiptAddress",
          "new_withdrawalApplyStatus",
          "withdrawalApplyDetails"
        ];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "提现明细");
      });
    },
    // 导出所有数据
    fnExcelAllData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      params.pageSize = vm.total;
      vm.$main.loading = true;
      vm.$api.SYSTEM_GETWIDTHDRAWALAPPLYS(params).then(res => {
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
              "提现金额",
              "手续费",
              "实际金额",
              "提现方式",
              "地址",
              "状态",
              "原因"
            ];
            let filterVal = [
              "withdrawalApplyCreateTime",
              "userAccount",
              "withdrawalApplyMoney",
              "new_money",
              "withdrawalApplyTransferMoney",
              "new_spare1",
              "receiptAddress",
              "new_withdrawalApplyStatus",
              "withdrawalApplyDetails"
            ];
            let list = vm.fileterData(vm.allTableData); // 数据过滤
            let data = vm.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "提现明细");
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
        item.new_money = (
          item.withdrawalApplyMoney - item.withdrawalApplyTransferMoney
        ).toFixed(2); // 手续费
        item.new_spare1 =
          item.spare1 == 1
            ? vm.$t("filters.withdrawal_type1")
            : vm.$t("filters.withdrawal_type1"); // 提现方式
        item.new_withdrawalApplyStatus = vm.STATUS(item.withdrawalApplyStatus); // 状态
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
    // 审核状态
    STATUS(data) {
      let vm = this;
      let type;
      switch (data) {
        case 0:
          // 申请中
          type = vm.$t("filters.examine_status1");
          break;
        case 1:
          // 审核通过
          type = vm.$t("filters.examine_status2");
          break;
        case 2:
          // 审核驳回
          type = vm.$t("filters.examine_status3");
          break;
        case 3:
          // 取消操作
          type = vm.$t("filters.examine_status4");
          break;
        default:
          // 申请中
          type = vm.$t("filters.examine_status1");
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
      vm.$main.loading = true;
      vm.$api.SYSTEM_GETWIDTHDRAWALAPPLYS(params).then(res => {
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
