<template>
  <div class="cash_review" style="overflow: hidden;">
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
          <!-- 日期 -->
          <el-table-column :label="$t('table.orderCreateTime')">
            <template slot-scope="scope">{{ scope.row.depositApplicationCreateTime }}</template>
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
              <el-button
                @click="fnImg(scope.row)"
                type="primary"
                size="mini"
              >{{ $t('btn.paymentVoucher') }}</el-button>
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
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
export default {
  name: "cash_review",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  data() {
    return {
      imgSrc: "",
      dialogVisible: false,
      loading: false,
      currentPage: 1,
      tableData: [],
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
