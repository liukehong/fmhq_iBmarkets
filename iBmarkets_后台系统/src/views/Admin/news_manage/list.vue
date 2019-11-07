<template>
  <div class="item_table_box">
    <!-- 添加新闻 -->
    <el-button
      size="small"
      style="margin-bottom: .2rem; margin-left: 20px; margin-top: 10px;"
      @click="fnAdd"
      class="sel_btn"
      type="primary"
    >{{ $t('admin_newsManage.text2') }}</el-button>
    <el-table
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 标题 -->
      <el-table-column :label="$t('form.title')">
        <template slot-scope="scope">{{ scope.row.newsTitle }}</template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column :label="$t('form.type')">
        <template slot-scope="scope">{{ scope.row.newsLanguage|LANGUAGE }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="200" :label="$t('table.operation')">
        <template slot-scope="scope">
          <!-- <el-button @click="fnEdit(scope.row)" type="primary" size="mini">编辑</el-button> -->
          <!-- 查看 -->
          <el-button @click="fnSee(scope.row)" type="primary" size="mini">{{ $t('btn.see') }}</el-button>
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
import WatchScreen from "../../../mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "news_managet_list",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {},
  filters: {
    LANGUAGE: function(data) {
      if (data == "zh") {
        return "中文";
      } else {
        return "English";
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        newsLanguage: "",
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
    // 添加新闻
    fnAdd() {
      this.p.pageType = "add";
    },
    // 查看新闻
    fnSee(data) {
      let vm = this;
      window.open(`${data.newsAddress}`);
    },
    // 删除新闻
    fnDelete(data) {
      let vm = this;
      // 此操作将会删除该新闻, 是否继续?   提示
      vm.$confirm(vm.$t("admin_newsManage.text4"), vm.$t("common.alert"), {
        confirmButtonText: vm.$t("btn.sure"), // 确定
        cancelButtonText: vm.$t("btn.cancel"), // 取消
        type: "warning"
      })
        .then(() => {
          // 调删除接口
          vm.$api
            .SYSTEM_DELETENEWS({
              newsId: data.newsId
            })
            .then(res => {
              if (res.code == 0) {
                vm.fnOpenMessageBox(
                  vm.$t("alert.text4"),
                  "success"
                );
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
              }
            });
        })
        .catch(() => {});
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
      vm.$api.SYSTEM_GETNEWS(params).then(res => {
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
