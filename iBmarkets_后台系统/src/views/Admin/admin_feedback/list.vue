<template>
  <div class="item_table_box">
    <!-- 请选择 -->
    <el-select style="padding-left: 20px; padding-bottom: 20px; padding-top: 10px;" size="small" v-model="params.messageStatus" :placeholder="$t('form.please')" @change="changeState">
          <!-- 全部 -->
          <el-option :label="$t('admin_feedback.text4')" :value="-1"></el-option>
          <!-- 未回复 -->
          <el-option :label="$t('admin_feedback.text5')" :value="0"></el-option>
          <!-- 已回复 -->
          <el-option :label="$t('admin_feedback.text6')" :value="1"></el-option>
        </el-select>
    <el-table
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 日期 -->
      <el-table-column width="200" :label="$t('table.orderCreateTime')">
        <template slot-scope="scope">{{ scope.row.messageCreateTime }}</template>
      </el-table-column>
      <!-- 用户ID -->
      <el-table-column :label="$t('table.userId')">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column :label="$t('table.title')">
        <template slot-scope="scope">{{ scope.row.messageHead||'--' }}</template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('table.status')">
        <!-- 未回复0  已回复1 -->
        <template slot-scope="scope">{{ scope.row.messageStatus == 0?$t('admin_feedback.text5'):$t('admin_feedback.text6') }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="80" :label="$t('table.operation')">
        <template slot-scope="scope">
          <!-- 回复 -->
          <el-button v-if="scope.row.messageStatus == 0" @click="fnSeeInfo(scope.row,'replay')" type="success" size="mini">{{ $t('admin_feedback.text7') }}</el-button>
          <!-- 查看 -->
          <el-button v-if="scope.row.messageStatus == 1" @click="fnSeeInfo(scope.row,'info')" type="primary" size="mini">{{ $t('btn.see') }}</el-button>
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
  inject: ['p','$main'],
  components: {
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        messageStatus: -1,
        userid: "",
        pageSize: 10,
        page: 1,
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
      let params = Object.assign({}, vm.params,{
        messageStatus: vm.params.messageStatus == -1?'':vm.params.messageStatus
      });
      vm.$main.loading = true;
      vm.$api.SYSYTEM_GETMESSAGESTATUS(params).then(res => {
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
