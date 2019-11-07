<template>
  <transition name="fade">
    <div class="cash_review" style="overflow: hidden;">
      <!-- 入金审核 -->
      <div class="item_title">{{ $t('title.enterCash') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <div class="sel_label" style="overflow:hidden;">
            <!-- 用户名 -->
            <el-input
              size="small"
              class="sel_input"
              v-model="params.userAccount"
              :placeholder="$t('form.userName')"
            ></el-input>
            <!-- 搜索 -->
            <el-button
              size="small"
              @click="fnGetData"
              class="sel_btn"
              type="primary"
            >{{ $t('btn.search') }}</el-button>
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
            <el-table-column :label="$t('table.orderCreateTime')">
              <template slot-scope="scope">{{ scope.row.depositApplicationCreateTime }}</template>
            </el-table-column>
            <!-- 用户名 -->
            <el-table-column :label="$t('table.userName')">
              <template slot-scope="scope">{{ scope.row.userAccount }}</template>
            </el-table-column>
            <!-- 金额 -->
            <el-table-column :label="$t('table.money')">
              <template slot-scope="scope">{{ scope.row.depositApplicationSystemMoney||0 }}</template>
            </el-table-column>
            <!-- 人民币 -->
            <el-table-column :label="$t('table.rmb')">
              <template slot-scope="scope">{{ scope.row.depositApplicationMoney||0 }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column :label="$t('table.status')">
              <template
                slot-scope="scope"
              >{{ scope.row.depositApplicationStatus == 0?$t('filters.examine_status1'):scope.row.depositApplicationStatus == 1?$t('filters.examine_status2'):$t('filters.examine_status3') }}</template>
            </el-table-column>
            <!-- 原因 -->
            <el-table-column :label="$t('table.reason')">
              <template slot-scope="scope">{{ scope.row.depositApplicationDetails||'--' }}</template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column :label="$t('table.operation')" width="250">
              <template slot-scope="scope">
                <div v-if="scope.row.depositApplicationStatus == 0">
                  <!-- 通过 -->
                  <el-button
                    @click="fnChangeType(1,scope.row)"
                    type="success"
                    size="mini"
                  >{{ $t('btn.pass') }}</el-button>
                  <!-- 驳回 -->
                  <el-button
                    @click="fnChangeType(2,scope.row)"
                    type="danger"
                    size="mini"
                  >{{ $t('btn.refuse') }}</el-button>
                  <!-- 支付凭证 -->
                  <el-button
                    @click="fnImg(scope.row)"
                    type="primary"
                    size="mini"
                  >{{ $t('btn.paymentVoucher') }}</el-button>
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
      <!-- 支付凭证 -->
      <el-dialog
        :title="$t('btn.paymentVoucher')"
        :visible.sync="dialogVisible"
        :width="screenSize == 1?'30%':'90%'"
      >
        <img :src="imgSrc" alt style="width: 100%; height: 100%; display:block; min-height: 3rem;" />
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
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
  components: {
    TableDate
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      tableData: [],
      imgSrc: "",
      dialogVisible: false,
      params: {
        depositApplicationStatus: "",
        userAccount: "",
        pageSize: 10,
        page: 1
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 查看支付凭证
    fnImg(data) {
      let vm = this;
      vm.imgSrc = "";
      vm.imgSrc = data.depositApplicationImageAddress;
      vm.dialogVisible = true;
    },
    // 列表操作
    fnChangeType(status, data) {
      let vm = this;
      let obj = {
        "2": vm.$t("admin_enter.text1"), // 驳回该入金
        "1": vm.$t("admin_enter.text2") // 通过该入金
      };
      if (status == 2) {
        //请输入原因 提示
        this.$prompt(vm.$t("admin_cash.text9"), vm.$t("admin_cash.text10"), {
          confirmButtonText: vm.$t("btn.sure"), // 确定
          cancelButtonText: vm.$t("btn.cancel") // 取消
        })
          .then(({ value }) => {
            // 驳回
            vm.$api
              .SYSTEM_DEPOSITREVIEW({
                depositApplicationId: data.depositApplicationId,
                depositApplicationStatus: 2,
                depositApplicationDetails: value
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
        // 此操作将会 是否继续? 提示
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
            // 通过
            vm.$api
              .SYSTEM_DEPOSITREVIEW({
                depositApplicationId: data.depositApplicationId,
                depositApplicationStatus: 1,
                depositApplicationDetails: ""
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
      vm.$api.LOGGING_GETDEPOSITAPPLICATIONS(params).then(res => {
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
