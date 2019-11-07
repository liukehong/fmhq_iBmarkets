<template>
  <div class="item_table_box">
    <el-table
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 购买时间 -->
      <el-table-column :label="$t('user_product.text4')" width="200">
        <template slot-scope="scope">{{ scope.row.matchingCreateTime }}</template>
      </el-table-column>
      <!-- 配套金额 -->
      <el-table-column :label="$t('user_product.text6')">
        <template slot-scope="scope">{{ scope.row.isMoney|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- MT4账户 -->
      <el-table-column :label="$t('user_product.text7')">
        <template slot-scope="scope">{{ scope.row.mt4Account }}</template>
      </el-table-column>
      <!-- MT4密码 -->
      <el-table-column :label="$t('user_product.text8')">
        <template slot-scope="scope">{{ scope.row.mt4Password }}</template>
      </el-table-column>
      <!-- MT4盈利钱包 -->
      <el-table-column :label="$t('user_product.text9')">
        <template slot-scope="scope">{{ scope.row.income|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="300" :label="$t('table.operation')">
        <template slot-scope="scope">
          <!-- 提现 -->
          <el-button :disabled="!!!btnFlag?true:false" @click="fnSeeInfo(scope.row,'withdrawal')" type="success" size="mini">{{ $t('user_product.text10') }}</el-button>
          <!-- 查看 -->
          <el-button @click="fnSeeInfo(scope.row,'upgrade')" type="primary" size="mini">{{ $t('user_product.text11') }}</el-button>
          <!-- 解约 -->
          <el-button :disabled="scope.row.matchingStatus == 2?true:false" @click="fnSeeInfo(scope.row,'rescission')" size="mini">{{ $t('user_product.text21') }}</el-button>
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
    vm.fnBtnFlag(2);
  },
  methods: {
    fnBtnFlag (num) {
      let vm = this;
      if(!!window.localStorage.getItem('user_permission')){
        let flagList = JSON.parse(window.localStorage.getItem('user_permission'));
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
      vm.$api.MATCHING_GETMYMATCHING(params).then(res => {
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
