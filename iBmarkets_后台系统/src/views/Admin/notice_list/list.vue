<template>
  <div class="item_table_box">
    <!-- 时间选择 -->
    <TableDate @changeDate="changeDataByDate" v-if="false"></TableDate>
    <div class="sel_label" style="overflow:hidden;" v-if="false">
      <!-- 请选择 -->
      <el-select v-model="params.state" :placeholder="$t('form.please')" @change="changeState">
        <!-- 未支付 -->
        <el-option :label="$t('admin_notice.text4')" :value="0"></el-option>
        <!-- 已支付 -->
        <el-option :label="$t('admin_notice.text5')" :value="1"></el-option>
      </el-select>
    </div>
    <!-- 添加公告 -->
    <el-button
      size="small"
      style="margin-bottom: .2rem; margin-top: .2rem; margin-left:.2rem;"
      @click="fnAdd"
      class="sel_btn"
      type="success"
    >{{ $t('admin_notice.text6') }}</el-button>
    <el-table
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 日期 -->
      <el-table-column width="200" :label="$t('table.orderCreateTime')">
        <template slot-scope="scope">{{ scope.row.announcementCreateTime }}</template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column :label="$t('table.title')">
        <template slot-scope="scope">{{ scope.row.announcementHead }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="150" :label="$t('table.operation')">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <!-- <el-button @click="fnEdit(scope.row)" type="primary" size="mini">编辑</el-button> -->
          <!-- 删除 -->
          <el-button @click="fnDelete(scope.row)" type="danger" size="mini">{{ $t('btn.delete') }}</el-button>
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
import TableDate from "@/components/TableDate.vue";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "notice_list_list",
  mixins: [WatchScreen],
  inject: ["p", "$main"],
  components: {
    TableDate
  },
  data() {
    return {
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
    // 支付状态选择
    changeState(val) {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = data.startTime;
      vm.params.endTime = data.endTime;
      vm.fnGetData();
    },
    // 添加新闻
    fnAdd() {
      this.p.pageType = "add";
    },
    // 删除新闻
    fnDelete(data) {
      let vm = this;
      // 此操作将会删除该公告, 是否继续?   提示
      vm.$confirm(vm.$t("admin_notice.text7"), vm.$t("admin_notice.text8"), {
        confirmButtonText: vm.$t("btn.sure"), // 确定
        cancelButtonText: vm.$t("btn.cancel"), // 取消
        type: "warning"
      })
        .then(() => {
          // 调删除接口
          vm.$api
            .SYSTEM_DELETESYSTEMANNOUNCEMENT({
              announcementId: data.announcementId
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
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 编辑新闻
    fnEdit(data) {
      let vm = this;
      vm.p.pageType = "edit";
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
      let params = Object.assign({}, vm.params);
      vm.$main.loading = true;
      vm.$api.SYSTEM_GETSYSTEMANNOUNCEMENTS(params).then(res => {
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
