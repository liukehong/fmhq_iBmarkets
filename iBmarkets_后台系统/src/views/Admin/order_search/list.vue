<template>
  <div class="item_box order_search_list">
    <div class="item_table_box">
      <!-- 支付类型 -->
      <el-select
        style="padding-top: .2rem; width: 2rem; padding-left: .2rem;"
        size="small"
        v-model="params.status"
        :placeholder="$t('form.please')"
        @change="changeState"
      >
        <!-- 支付失败 -->
        <el-option :label="$t('admin_orderList.text1')" :value="0"></el-option>
        <!-- 支付成功 -->
        <el-option :label="$t('admin_orderList.text2')" :value="100"></el-option>
      </el-select>
      <el-select
        style="padding-top: .2rem; width: 2rem; padding-left: .2rem;"
        size="small"
        v-model="params.type"
        :placeholder="$t('form.please')"
        @change="changeState"
      >
        <!-- 默认 -->
        <el-option :label="$t('admin_orderList.text4')" :value="0"></el-option>
        <!-- 直推 -->
        <el-option :label="$t('admin_orderList.text5')" :value="1"></el-option>
        <!-- 伞下 -->
        <el-option :label="$t('admin_orderList.text6')" :value="2"></el-option>
      </el-select>
      <el-select
        style="padding-top: .2rem; width: 2rem; padding-left: .2rem;"
        size="small"
        v-model="params.orderCurrencyType"
        :placeholder="$t('form.please')"
        @change="changeState"
      >
        <!-- 全部 -->
        <el-option label="全部" :value="-1"></el-option>
        <!-- BTC -->
        <el-option label="BTC" :value="1"></el-option>
        <!-- ETH -->
        <el-option label="ETH" :value="2"></el-option>
        <!-- USDT -->
        <el-option label="USDT" :value="3"></el-option>
      </el-select>
      <!-- 时间选择 -->
      <TableDate style="padding-top: .2rem;" @changeDate="changeDataByDate"></TableDate>
      <div class="sel_label" style="overflow:hidden;">
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!-- 用户名 -->
            <el-input
              style="width: 1.8rem;"
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
              type="primary"
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
            <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 10px; margin-top: .1rem;'"
              size="small"
              @click="fnExcelData"
              class="sel_btn"
              type="success"
            >{{ $t('btn.Excel') }}</el-button>
          </el-col>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div style="color: #000; font-size: .18rem; padding-top: .15rem;">{{ $t('admin_orderList.text7') }}：{{ monthData }}</div>
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
          <template slot-scope="scope">{{ scope.row.order_create_time }}</template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column width="200" :label="$t('table.userName')">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <!-- 订单编号 -->
        <el-table-column :label="$t('table.order_num')">
          <template slot-scope="scope">{{ scope.row.order_num }}</template>
        </el-table-column>
        <!-- 获得CP数量 -->
        <el-table-column :label="$t('table.CP')" width="180">
          <template slot-scope="scope">{{ scope.row.order_system_money }}</template>
        </el-table-column>
        <!-- 金额 -->
        <el-table-column width="180" :label="$t('table.money')">
          <template slot-scope="scope">{{ scope.row.order_money|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 币种 -->
        <el-table-column width="180" :label="$t('admin_orderList.text3')">
          <template
            slot-scope="scope"
          >{{ scope.row.order_currency_type == 1?'BTC':scope.row.order_currency_type == 2?'ETH':'USDT' }}</template>
        </el-table-column>
        <!-- 状态 -->
        <!-- 成功2 失败1 -->
        <el-table-column width="180" :label="$t('table.status')">
          <template
            slot-scope="scope"
          >{{ scope.row.order_state == 100?$t('admin_orderList.text2'):$t('admin_orderList.text1') }}</template>
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
  name: "order_search_list",
  mixins: [WatchScreen],
  inject: ["p", "$main"],
  components: {
    TableDate,
  },
  data() {
    return {
      monthData: '', // 当月业绩
      currentPage: 1,
      tableData: [],
      allTableData: [],
      params: {
        orderCurrencyType: -1,
        pageSize: 10,
        page: 1,
        status: 0,
        userId: "",
        startTime: "",
        endTime: "",
        account: "",
        type: 0
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
          "订单编号",
          "CP",
          "金额",
          "币种",
          "状态"
        ];
        let filterVal = [
          "order_create_time",
          "account",
          "order_num",
          "order_system_money",
          "order_money",
          "new_order_currency_type",
          "new_order_state"
        ];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "订单记录");
      });
    },
    // 导出所有数据
    fnExcelAllData() {
      let vm = this;
      let params = Object.assign({}, vm.params, {
        orderCurrencyType:
          vm.params.orderCurrencyType == -1 ? "" : vm.params.orderCurrencyType
      });
      params.pageSize = vm.total;
      vm.$main.loading = true;
      vm.$api.LOGGING_SELECTSUPERORDERUSER(params).then(res => {
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
              "订单编号",
              "CP",
              "金额",
              "币种",
              "状态"
            ];
            let filterVal = [
              "order_create_time",
              "account",
              "order_num",
              "order_system_money",
              "order_money",
              "new_order_currency_type",
              "new_order_state"
            ];
            debugger;
            let list = vm.fileterData(vm.allTableData); // 数据过滤
            let data = vm.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "订单记录");
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
        item.new_order_currency_type =
          item.order_currency_type == 2 ? "ETH" : "USDT"; // 币种
        item.new_order_state =
          item.order_state == 100
            ? vm.$t("admin_orderList.text2")
            : vm.$t("admin_orderList.text1"); // 状态
        arrs.push(item);
      });
      return arrs;
    },
    // 订单状态
    changeState(val) {
      let vm = this;
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
      vm.$main.loading = true;
      let params = Object.assign({}, vm.params, {
        orderCurrencyType:
          vm.params.orderCurrencyType == -1 ? "" : vm.params.orderCurrencyType
      });
      vm.$api.LOGGING_SELECTSUPERORDERUSER(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list;
          vm.total = res.data.total;
          vm.monthData = res.datas.totalAmount;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
