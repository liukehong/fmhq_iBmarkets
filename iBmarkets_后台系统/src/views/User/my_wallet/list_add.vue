<template>
  <div style="overflow: hidden;">
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
            <template slot-scope="scope">{{ scope.row.orderCreateTime }}</template>
          </el-table-column>
          <!-- 订单号 -->
          <el-table-column :label="$t('table.orderNum')">
            <template slot-scope="scope">{{ scope.row.orderNum }}</template>
          </el-table-column>
          <!-- 数量 -->
          <el-table-column :label="$t('table.num')">
            <template slot-scope="scope">{{ scope.row.orderMoney }}</template>
          </el-table-column>
          <!-- 货币类型 -->
          <el-table-column :label="$t('table.coinType')">
            <template slot-scope="scope">{{ scope.row.orderType|ORDER_TYPE }}</template>
          </el-table-column>
          <!-- 状态 -->
          <el-table-column :label="$t('table.status')">
            <template slot-scope="scope">{{ ORDER_STATE(scope.row.orderState) }}</template>
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
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
export default {
  name: "FeedbackList",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  filters: {
    ORDER_TYPE(data) {
      let type;
      switch (data) {
        case 0:
          type = "BTC";
          break;
        case 1:
          type = "ETH";
          break;
        case 2:
          type = "USDT";
          break;
        default:
          type = "BTC";
      }
      return type;
    },
  },
  data() {
    return {
      type: "add",
      loading: false,
      currentPage: 1,
      tableData: [],
      params: {
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
    // 状态
    ORDER_STATE (data) {
      let vm = this;
      let type;
      switch (data) {
        case 0:
          type = vm.$t('filters.order_type1');
          break;
        case 1:
          type = vm.$t('filters.order_type2');
          break;
        case 2:
          type = vm.$t('filters.order_type3');
          break;
        case 3:
          type = vm.$t('filters.order_type4');
          break;
        default:
          type = vm.$t('filters.order_type1');
      }
      return type;
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
      vm.$api.LOGGING_SELECTORDERUSER(params).then(res => {
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
