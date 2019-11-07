<template>
  <div class="home_rp" style="overflow: hidden;">
    <!-- 系统公告 -->
    <div class="item_title">{{ $t('title.ap') }}</div>
    <div class="list_box">
      <el-row>
            <!-- box2 -->
            <el-col style="padding-left: .2rem;" :class="screenSize == 1?'':'p_l'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <!-- 表单 -->
              <AppAddType></AppAddType>
            </el-col>
        </el-row>
    </div>
    <div class="pagination_box" v-if="false">
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
import AppAddType from './app_add_type';
export default {
  name: "home_rp",
  mixins: [WatchScreen],
  components: {
    TableDate,
    AppAddType
  },
  data() {
    return {
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
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = data.startTime;
      vm.params.endTime = data.endTime;
      vm.fnGetData();
    },
    // type类型变化
    fnTypeChange(val) {
      let vm = this;
      vm.params.type = val;
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
      vm.loading = true;
      vm.$api.SYSTEM_GETSYSTEMANNOUNCEMENTS(params).then(res => {
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
.home_rp {
  .list_box {
      height: auto;
    padding: 0.1rem 0.1rem 0.1rem 0.3rem;
    background:linear-gradient(270deg,rgba(20,37,94,0.73),rgba(78,176,208,0.73));
    border-radius: 20px;
    .list_item {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 0.2rem;
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
        // color: rgba(178, 212, 255, 1);
        color: #fff;
      }
      .right_content {
        font-size: 0.12rem;
      }
    }
  }
}
</style>
