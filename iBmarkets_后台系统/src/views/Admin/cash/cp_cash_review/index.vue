<template>
  <transition name="fade">
    <div class="cash_review" style="overflow: hidden;">
      <!-- 出金审核 -->
      <div class="item_title">{{ $t('title.cpCashReview') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 请选择 -->
          <el-select
            v-if="false"
            style="padding-left: 20px; padding-top: 20px; width: 2rem;"
            size="small"
            v-model="params.spare1"
            :placeholder="$t('form.please')"
            @change="changeState"
          >
            <!-- 冷钱包 -->
            <el-option :label="$t('admin_cash.text1')" :value="1"></el-option>
            <!-- 银行卡 -->
            <el-option :label="$t('admin_cash.text2')" :value="2"></el-option>
          </el-select>
          <div class="sel_label" style="overflow:hidden;">
            <el-row>
              <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                <!-- 用户名 -->
                <el-input
                  size="small"
                  class="sel_input"
                  style="width: 1.8rem;"
                  v-model="params.account"
                  :placeholder="$t('form.userName')"
                ></el-input>
                <!-- 搜索 -->
                <el-button
                  size="small"
                  @click="fnGetData"
                  class="sel_btn"
                  type="primary"
                >{{ $t('btn.search') }}</el-button>
              </el-col>
              <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                <!-- 驳回 -->
                <el-button
                  :disabled="!!!btnFlag?true:false"
                  :style="screenSize == 1?'float: right':'float:left; margin-left: 0px; margin-top: .1rem;'"
                  size="small"
                  @click="fnNo"
                  class="sel_btn"
                  type="danger"
                >{{ $t('btn.batchRefuse') }}</el-button>
                <!-- 通过 -->
                <el-button
                  :disabled="!!!btnFlag?true:false"
                  :style="screenSize == 1?'float: right':'float:left; margin-top: .1rem;'"
                  size="small"
                  @click="fnPass"
                  class="sel_btn"
                  type="success"
                >{{ $t('btn.batchPass') }}</el-button>
              </el-col>
            </el-row>
          </div>
          <div style="overflow:hidden;">
            <el-button
              style="margin-left: .2rem; margin-bottom: .2rem;"
              size="small"
              @click="fnExcelData"
              class="sel_btn"
              type="success"
            >{{ $t('btn.Excel') }}</el-button>
          </div>
          <el-table
            row-class-name="rowClassName"
            header-row-class-name="headerRowClassName"
            style="width: 100%;"
            :stripe="true"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- 日期 -->
            <el-table-column width="180" :label="$t('table.orderCreateTime')">
              <template slot-scope="scope">{{ scope.row.withdrawalApplyCreateTime }}</template>
            </el-table-column>
            <!-- 用户名 -->
            <el-table-column :label="$t('table.userName')">
              <template slot-scope="scope">{{ scope.row.userAccount }}</template>
            </el-table-column>
            <!-- 手续费 -->
            <el-table-column :label="$t('table.serviceCharge')">
              <template
                slot-scope="scope"
              >{{ (scope.row.withdrawalApplyMoney-scope.row.withdrawalApplyTransferMoney).toFixed(2) }}</template>
            </el-table-column>
            <!-- 数量 金额 -->
            <el-table-column :label="params.spare1 == 1?$t('table.num'):$t('table.money')">
              <template slot-scope="scope">{{ scope.row.withdrawalApplyMoney|FORMATTED_NUMBER }}</template>
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
            <!-- 开户行 -->
            <el-table-column :label="$t('table.bankDetails')" v-if="params.spare1 == 2">
              <template slot-scope="scope">{{ scope.row.bankDetails||'--' }}</template>
            </el-table-column>
            <!-- 银行账号 -->
            <el-table-column :label="$t('table.bankNumber')" v-if="params.spare1 == 2">
              <template slot-scope="scope">{{ scope.row.bankNumber||'--' }}</template>
            </el-table-column>
            <!-- 银行卡持有人 -->
            <el-table-column :label="$t('table.bankUserName')" v-if="params.spare1 == 2">
              <template slot-scope="scope">{{ scope.row.bankUserName||'--' }}</template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column :label="$t('table.operation')" width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.withdrawalApplyStatus == 0">
                  <!-- 通过 -->
                  <el-button
                    :disabled="!!!btnFlag?true:false"
                    @click="fnChangeType(1,scope.row)"
                    type="success"
                    size="mini"
                  >{{ $t('btn.pass') }}</el-button>
                  <!-- 驳回 -->
                  <el-button
                    :disabled="!!!btnFlag?true:false"
                    @click="fnChangeType(2,scope.row)"
                    type="danger"
                    size="mini"
                  >{{ $t('btn.refuse') }}</el-button>
                </div>
                <div v-else>--</div>
              </template>
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
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "cash_review",
  mixins: [WatchScreen, MessageBox],
  inject: ["$main"],
  components: {
    TableDate
  },
  data() {
    return {
      btnFlag: false,
      idArrs: [],
      currentPage: 1,
      tableData: [],
      params: {
        withdrawalApplyType: 2,
        withdrawalApplyStatus: 0, // 0申请中 1审核通过 2审核驳回 3取消操作
        account: "",
        pageSize: 10,
        page: 1,
        spare1: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
    vm.fnBtnFlag(5);
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
        const tHeader = [
          "日期",
          "用户名",
          "手续费",
          "金额",
          "币种",
          "钱包地址"
        ];
        const filterVal = [
          "withdrawalApplyCreateTime",
          "userAccount",
          "new_money",
          "withdrawalApplyMoney",
          "new_receiptType",
          "receiptAddress"
        ];
        const list = vm.fileterData(); // 数据过滤
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "CP出金审核记录");
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
        item.new_money = (
          item.withdrawalApplyMoney - item.withdrawalApplyTransferMoney
        ).toFixed(2); // 手续费
        item.new_receiptType = vm.RECEIPT_TYPE(item.receiptType); // 币种
        arrs.push(item);
      });
      return arrs;
    },
    fnBtnFlag(num) {
      let vm = this;
      if (!!window.localStorage.getItem("admin_permission")) {
        let flagList = JSON.parse(
          window.localStorage.getItem("admin_permission")
        );
        if (flagList.indexOf(num) == -1) {
          vm.btnFlag = false;
        } else {
          vm.btnFlag = true;
        }
      }
    },
    // 批量通过
    fnPass() {
      let vm = this;
      if (!!!vm.idArrs.length) {
        vm.fnOpenMessageBox(vm.$t("alert.text14"), "error");
        return false;
      }
      // 此操作将会  是否继续?  提示
      vm.$confirm(
        `${vm.$t("admin_cash.text11")}${vm.$t("admin_cash.text8")}, ${vm.$t(
          "admin_cash.text12"
        )}`,
        vm.$t("admin_cash.text10"),
        {
          confirmButtonText: vm.$t("btn.sure"), // 确定
          cancelButtonText: vm.$t("btn.cancel"), // 取消
          type: "warning"
        }
      )
        .then(() => {
          vm.$api
            .SYSTEM_WITHDRAWALREVIEW({
              withdrawalApplyId: JSON.stringify(vm.idArrs),
              status: 1,
              details: "",
              type: 1
            })
            .then(res => {
              if (res.code == 0) {
                vm.fnOpenMessageBox(vm.$t("alert.success"), "success");
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
              }
            });
        })
        .catch(() => {});
    },
    // 批量驳回
    fnNo() {
      let vm = this;
      if (!!!vm.idArrs.length) {
        vm.fnOpenMessageBox(vm.$t("alert.text14"), "error");
        return false;
      }
      // 请输入原因  提示
      this.$prompt(vm.$t("admin_cash.text9"), vm.$t("admin_cash.text10"), {
        confirmButtonText: vm.$t("btn.sure"), // 确定
        cancelButtonText: vm.$t("btn.cancel") // 取消
      })
        .then(({ value }) => {
          vm.$api
            .SYSTEM_WITHDRAWALREVIEW({
              withdrawalApplyId: JSON.stringify(vm.idArrs),
              status: 2,
              details: value,
              type: 1
            })
            .then(res => {
              if (res.code == 0) {
                vm.fnOpenMessageBox(vm.$t("alert.success"), "success");
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
              }
            });
        })
        .catch(() => {});
    },
    handleSelectionChange(list) {
      let vm = this;
      let arrs = [];
      list.forEach((item, index) => {
        arrs.push(item.withdrawalApplyId);
      });
      vm.idArrs = arrs;
    },
    APPLY_TYPE: function(data) {
      let vm = this;
      let obj = {
        "0": vm.$t("admin_cash.text3"), // 配套退款
        "1": vm.$t("admin_cash.text4"), // 收益提现
        "2": vm.$t("admin_cash.text5") // 钱包提现
      };
      return obj[+data];
    },
    RECEIPT_TYPE: function(data) {
      let vm = this;
      let obj = {
        "1": "BTC",
        "2": "ETH",
        "3": "USDT",
        "4": vm.$t("admin_cash.text6") // 美元
      };
      return obj[+data];
    },
    // 列表操作
    fnChangeType(status, data) {
      let vm = this;
      let obj = {
        "2": vm.$t("admin_cash.text7"), // 驳回该出金
        "1": vm.$t("admin_cash.text8") // 通过该出金
      };
      if (status == 2) {
        // 请输入原因  提示
        this.$prompt(vm.$t("admin_cash.text9"), vm.$t("admin_cash.text10"), {
          confirmButtonText: vm.$t("btn.sure"), // 确定
          cancelButtonText: vm.$t("btn.cancel") // 取消
        })
          .then(({ value }) => {
            vm.$api
              .SYSTEM_WITHDRAWALREVIEW({
                withdrawalApplyId: JSON.stringify([data.withdrawalApplyId]),
                status: status,
                details: value,
                type: 1
              })
              .then(res => {
                if (res.code == 0) {
                  vm.fnOpenMessageBox(vm.$t("alert.success"), "success");
                  vm.fnGetData();
                } else {
                  vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
                }
              });
          })
          .catch(() => {});
      } else {
        // 此操作将会  是否继续?  提示
        vm.$confirm(
          `${vm.$t("admin_cash.text11")}${obj[status + ""]}, ${vm.$t(
            "admin_cash.text12"
          )}`,
          vm.$t("admin_cash.text10"),
          {
            confirmButtonText: vm.$t("btn.sure"), // 确定
            cancelButtonText: vm.$t("btn.cancel"), // 取消
            type: "warning"
          }
        )
          .then(() => {
            vm.$api
              .SYSTEM_WITHDRAWALREVIEW({
                withdrawalApplyId: JSON.stringify([data.withdrawalApplyId]),
                status: status,
                details: "",
                type: 1
              })
              .then(res => {
                if (res.code == 0) {
                  vm.fnOpenMessageBox(
                    vm.$t("alert.success"),
                    "success"
                  );
                  vm.fnGetData();
                } else {
                  vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
                }
              });
          })
          .catch(() => {});
      }
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
