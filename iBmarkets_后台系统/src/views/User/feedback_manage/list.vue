<template>
  <div style="overflow: hidden;">
    <!-- 反馈列表 -->
    <div class="item_title">{{ $t('title.feedbackList') }}</div>
    <div class="item_box">
      <div class="item_table_box">
        <el-table
          row-class-name="rowClassName"
          header-row-class-name="headerRowClassName"
          style="width: 100%;"
          :stripe="true"
          :data="tableData"
        >
          <!-- 日期 -->
          <el-table-column :label="$t('table.orderCreateTime')" width="200">
            <template slot-scope="scope">{{ scope.row.messageCreateTime }}</template>
          </el-table-column>
          <!-- 内容概览 -->
          <el-table-column prop="messageBody" :label="$t('table.content')"></el-table-column>
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
  inject: ["$main"],
  props:['time'],
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        pageSize: 10,
        page: 1,
        userid: "",
        messageStatus: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
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
      vm.$api.SYSTEM_GETMESSAGESTATUS(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.total;
        }
        vm.$main.loading = false;
      });
    }
  },
  watch: {
    time: {
        handler: function (n,o) {
            this.fnGetData();
        },
        deep: true
    }
  }
};
</script>
<style lang="scss">
</style>
