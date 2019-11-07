<template>
  <div class="notice_list">
    <!-- 系统公告 -->
    <div class="item_title">{{ $t('title.systemList') }}</div>
    <div class="item_box">
      <div class="item_table_box" style="min-height: 0px;">
        <el-row>
          <el-col
            v-if="tableData.length<1"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
            <div class="noListBox">{{ $t('alert.noData') }}</div>
          </el-col>
          <el-col
            v-if="tableData.length>0"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
          >
            <div class="list_box">
              <!-- <div class="list_item" v-for="item in tableData" :key="item.id">
                <div class="list_left">
                  <img src="../../../lkh_images/notice.png" alt>
                </div>
                <div class="list_right">
                  <div class="right_time">{{ item.announcementCreateTime }}</div>
                  <div class="right_content" v-html="item.announcementBody"></div>
                </div>
              </div> -->
              <el-collapse accordion>
                <el-collapse-item v-for="item in tableData" :key="item.id" style="margin-bottom: .2rem;">
                  <template slot="title">
                    <i class="header-icon el-icon-document" style="padding-right: .1rem;"></i>
                    {{ item.announcementHead }}
                  </template>
                  <div v-html="item.announcementBody"></div>
                  <div>{{ item.announcementCreateTime }}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
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
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
export default {
  name: "notice_list",
  mixins: [WatchScreen],
  inject: ["$main"],
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
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.total;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.notice_list {
  color: #000;
}
.noListBox {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #000;
  font-size: 0.2rem;
}
.list_box {
  overflow: hidden;
  padding: 0.1rem 0.2rem;
  .list_item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 0.3rem;
  }
  .list_left {
    width: 0.17rem;
    padding-top: 2px;
    img {
      display: block;
      width: 0.17rem;
      height: 0.13rem;
    }
  }
  .list_right {
    flex: 1;
    padding-left: 15px;
    .right_time {
      font-size: 0.12rem;
      color: #000;
    }
    .right_content {
      font-size: 0.12rem;
    }
  }
}
</style>
