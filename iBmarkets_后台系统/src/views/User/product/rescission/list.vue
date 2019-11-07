<template>
  <div class="item_table_box">
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
      <!-- MT4账号 -->
      <el-table-column :label="$t('matching_inquiries.text4')">
        <template slot-scope="scope">{{ scope.row.mt4Account }}</template>
      </el-table-column>
      <!-- MT4结余金额 -->
      <el-table-column :label="$t('table.money1')">
        <template slot-scope="scope">{{ scope.row.withdrawalApplyMoney|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 配套金额 -->
      <el-table-column :label="$t('user_product.text6')">
        <template slot-scope="scope">{{ scope.row.withdrawalApplyDeductionMoney|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('table.status')">
        <template slot-scope="scope">{{ TYPE(scope.row.withdrawalApplyStatus) }}</template>
      </el-table-column>
      <!-- 备注 -->
      <el-table-column :label="$t('table.remarks')">
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
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "admin_feedback_list",
  mixins: [WatchScreen],
  inject: ['p',"$main"],
  components: {
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
        withdrawalApplyType: 0,
        withdrawalApplyStatus: '',
        account: '',
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
      TYPE (data) {
          let vm = this;
          return vm.$t(`filters.examine_status${data+1}`)
      },
    // 查看反馈详情
    fnSeeInfo (data,type) {
        let vm = this;
        vm.p.pageType = type;
        vm.p.info = data;
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
        messageStatus: vm.params.messageStatus == -1?'':vm.params.messageStatus
      });
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
