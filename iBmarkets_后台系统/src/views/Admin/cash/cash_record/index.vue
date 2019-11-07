<template>
  <transition name="fade">
    <div class="cash_record" style="overflow: hidden;">
      <!-- 出金记录 -->
      <div class="item_title">{{ $t('title.cashRecord') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <div class="sel_label" style="overflow:hidden;">
            <el-row>
              <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!-- 用户名 -->
            <el-input size="small" style="width: 1.8rem;" class="sel_input" v-model="params.account" :placeholder="$t('form.userName')"></el-input>
            <!-- 搜索 -->
            <el-button size="small" @click="fnGetData" class="sel_btn" type="primary">{{ $t('btn.search') }}</el-button>
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
            :stripe="true"
            :data="tableData"
          >
            <!-- 日期 -->
            <el-table-column width="180" :label="$t('table.orderCreateTime')">
              <template slot-scope="scope">{{ scope.row.withdrawalApplyCreateTime }}</template>
            </el-table-column>
            <!-- 用户名 -->
            <el-table-column :label="$t('table.userName')">
              <template slot-scope="scope">{{ scope.row.userAccount }}</template>
            </el-table-column>
            <!-- MT4结余金额 -->
            <el-table-column :label="params.spare1 == 1?$t('table.num'):$t('table.money1')">
              <template slot-scope="scope">{{ !!scope.row.withdrawalApplyMoney?FORMATTED_NUMBER(scope.row.withdrawalApplyMoney):'--' }}</template>
            </el-table-column>
            <!-- 配套金额 -->
            <el-table-column :label="params.spare1 == 1?$t('table.num'):$t('table.money2')">
              <template slot-scope="scope">{{ scope.row.withdrawalApplyDeductionMoney|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 手续费 -->
            <el-table-column :label="$t('table.serviceCharge')">
              <template
                slot-scope="scope"
              >{{ (scope.row.withdrawalApplyMoney-scope.row.withdrawalApplyTransferMoney).toFixed(2) }}</template>
            </el-table-column>
            <!-- 提现类型 -->
            <el-table-column :label="$t('table.withdrawalApplyType')" v-if="params.spare1 == 1">
              <template slot-scope="scope">{{ APPLY_TYPE(scope.row.withdrawalApplyType) }}</template>
            </el-table-column>
            <!-- 币种 -->
            <el-table-column :label="$t('table.coinType')">
              <template slot-scope="scope">{{ RECEIPT_TYPE(scope.row.receiptType) }}</template>
            </el-table-column>
            <!-- 钱包地址 -->
            <el-table-column :label="$t('table.receiptAddress')">
              <template
                slot-scope="scope"
              >{{ scope.row.receiptAddress == 'null'?'--':!!!scope.row.receiptAddress?'--':scope.row.receiptAddress }}</template>
            </el-table-column>
            <!-- 银行名称 -->
            <el-table-column :label="$t('table.bankName')" v-if="params.spare1 == 2">
              <template slot-scope="scope">{{ scope.row.bankName||'--' }}</template>
            </el-table-column>
            <!-- 银行账号 -->
            <el-table-column :label="$t('table.bankNumber')" v-if="params.spare1 == 2">
              <template slot-scope="scope">{{ scope.row.bankNumber||'--' }}</template>
            </el-table-column>
            <!-- 银行卡持有人 -->
            <el-table-column :label="$t('table.bankUserName')" v-if="params.spare1 == 2">
              <template slot-scope="scope">{{ scope.row.bankUserName||'--' }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column :label="$t('table.status')">
              <template slot-scope="scope">{{ STATUS(scope.row.withdrawalApplyStatus) }}</template>
            </el-table-column>
            <!-- 原因 -->
            <el-table-column :label="$t('table.reason')">
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
    </div>
  </transition>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
export default {
  name: "cash_record",
  mixins: [WatchScreen],
  inject: ["$main"],
  components: {
    TableDate
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        withdrawalApplyType: 0,
        withdrawalApplyStatus: '', // 0申请中 1审核通过 2审核驳回 3取消操作
        account: "",
        pageSize: 10,
        page: 1,
        spare1: '',
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    FORMATTED_NUMBER (money) {
      if(money && money!=null){
        money = String(money);
        var left=money.split('.')[0],right=money.split('.')[1];
        right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
    }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0.00';
    }else{
        return "";
    }
    },
    // 导出数据-前端
    fnExcelData() {
      let vm = this;
      //excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../../assets/js/Export2Excel");
        const tHeader = ["日期","用户名","MT4结余金额",'配套金额',"手续费",'币种',"钱包地址","状态","原因"];
        const filterVal = ["withdrawalApplyCreateTime","userAccount", "withdrawalApplyMoney",'withdrawalApplyDeductionMoney','new_money','new_receiptType','receiptAddress','new_withdrawalApplyStatus',"withdrawalApplyDetails"];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "出金记录");
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
        item.new_money = (item.withdrawalApplyMoney-item.withdrawalApplyTransferMoney).toFixed(2); // 手续费
        item.new_receiptType = vm.RECEIPT_TYPE(item.receiptType); // 币种
        item.new_withdrawalApplyStatus = vm.STATUS(item.withdrawalApplyStatus); // 币种
        arrs.push(item);
      });
      return arrs;
    },
    STATUS: function (data) {
      let vm = this;
      let obj = {
        "0": vm.$t('filters.examine_status1'), // 申请中
        "1": vm.$t('filters.examine_status2'), // 审核通过
        "2": vm.$t('filters.examine_status3'), // 审核驳回
        "3": vm.$t('filters.examine_status4') // 取消操作
      };
      return obj[+data];
    },
    APPLY_TYPE: function (data) {
      let vm = this;
      let obj = {
        "0": vm.$t('admin_cash.text3'), // 配套退款
        "1": vm.$t('admin_cash.text4'), // 收益提现
        "2": vm.$t('admin_cash.text5') // 钱包提现
      };
      return obj[+data];
    },
    RECEIPT_TYPE: function (data) {
      let vm = this;
      let obj = {
        "1": "BTC",
        "2": "ETH",
        "3": "USDT",
        "4": vm.$t('admin_cash.text6') // 美元
      };
      return obj[+data];
    },
    // 回复状态查看
    changeState(val) {
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
      vm.$api.SYSTEM_GETWITHDRAWALAPPLYS(params).then(res => {
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
