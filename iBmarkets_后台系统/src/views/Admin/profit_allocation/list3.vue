<template>
  <div class="item_table_box">
    <el-table
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 配套ID -->
      <el-table-column :label="$t('admin_allocation.text10')">
        <template slot-scope="scope">{{ scope.row.matchingId }}</template>
      </el-table-column>
      <!-- 层数 -->
      <el-table-column :label="$t('admin_allocation.text8')">
        <template slot-scope="scope">{{ scope.row.matchingLevel }}</template>
      </el-table-column>
      <!-- 收益 -->
      <el-table-column :label="$t('admin_allocation.text3')">
        <template slot-scope="scope">{{ scope.row.matchingProfit }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="250" :label="$t('admin_allocation.text4')">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button :disabled="!!!btnFlag?true:false" @click="fnSeeInfo(scope.row,'edit3')" type="primary" size="mini">{{ $t('admin_allocation.text5') }}</el-button>
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
      btnFlag: false,
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
    vm.fnBtnFlag(9);
  },
  methods: {
    fnBtnFlag (num) {
      let vm = this;
      if(!!window.localStorage.getItem('admin_permission')){
        let flagList = JSON.parse(window.localStorage.getItem('admin_permission'));
        if(flagList.indexOf(num) == -1){
          vm.btnFlag = false;
        }else{
          vm.btnFlag = true;
        }
      }
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
      vm.currentPage = val;
      vm.fnGetData();
    },
    // 获取列表数据
    fnGetData() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.SYSTEM_GETMATCHINGPROFITMAPPER(vm.params).then(res => {
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
