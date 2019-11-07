<template>
  <div class="item_box matching_inquiries_list">
    <div class="item_table_box">
      <div class="sel_label" style="overflow:hidden;">
        <!-- 用户名 -->
        <el-input
          style="width: 1.8rem;"
          size="small"
          class="sel_input"
          v-model="params.userAccount"
          :placeholder="$t('form.userName')"
        ></el-input>
        <!-- 搜索 -->
        <el-button size="small" @click="fnContentFil" class="sel_btn" type="primary">{{ $t('btn.search') }}</el-button>
      </div>
      <el-table
        row-class-name="rowClassName"
        header-row-class-name="headerRowClassName"
        style="width: 100%;"
        :stripe="true"
        :data="tableData"
      >
        <!-- 购买时间 -->
        <el-table-column width="200" :label="$t('matching_inquiries.text8')">
          <template slot-scope="scope">{{ scope.row.matchingCreateTime }}</template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column :label="$t('matching_inquiries.text2')">
          <template slot-scope="scope">{{ scope.row.userAccount }}</template>
        </el-table-column>
        <!-- 配套金额 -->
        <el-table-column :label="$t('matching_inquiries.text3')">
          <template slot-scope="scope">{{ scope.row.isMoney|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- MT4账号 -->
        <el-table-column :label="$t('matching_inquiries.text4')">
          <template slot-scope="scope">{{ scope.row.mt4Account }}</template>
        </el-table-column>
        <!-- MT4密码 -->
        <el-table-column :label="$t('matching_inquiries.text5')">
          <template slot-scope="scope">{{ scope.row.mt4Password }}</template>
        </el-table-column>
        <!-- 状态 -->
        <!-- 成功2 失败1 -->
        <el-table-column :label="$t('table.status')">
          <template slot-scope="scope">{{ STATUS(scope.row.matchingStatus) }}</template>
        </el-table-column>
        <!-- 操作 -->
      <el-table-column width="250" :label="$t('admin_allocation.text4')">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button @click="fnSeeInfo(scope.row,'edit')" type="primary" size="mini">添加</el-button>
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
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "matching_inquiries_list",
  mixins: [WatchScreen],
  inject: ["p","$main"],
  components: {},
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
        userAccount: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 查看反馈详情
    fnSeeInfo (data,type) {
        let vm = this;
        vm.p.pageType = type;
        vm.p.info = data;
    },
      // 状态
      STATUS (data) {
          let vm = this;
        if(data == 1){
            return vm.$t('matching_inquiries.text6'); // 正常
        }else{
            return vm.$t('matching_inquiries.text7'); // 退款中
        }
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
      let params = Object.assign({}, vm.params);
      vm.$main.loading = true;
      vm.$api.MATCHING_GETALLUSERMATCHING(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list;
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
