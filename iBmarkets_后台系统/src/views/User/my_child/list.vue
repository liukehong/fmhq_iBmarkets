<template>
  <div class="my_child_grade" style="overflow: hidden;">
    <div class="item_title" v-if="false">
      <div style="float:left;">{{ $t('other.text3') }}</div>
    </div>
    <div class="item_box">
      <div class="item_list_box">
        <el-row v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24">
            <div
              class="item_table_box"
              style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; min-height: 200px;"
            >
              <el-row style="padding-top: 20px;">
                <el-col :span="24" :xs="24" :sm="11" :md="8" :lg="6">
                  <el-select
                    size="small"
                    v-model="type"
                    placeholder="请选择"
                    @change="fnChange"
                    style="width: 100%;"
                  >
                    <el-option :label="$t('admin_orderList.text5')" :value="1"></el-option>
                    <el-option :label="$t('admin_orderList.text7')" :value="2"></el-option>
                  </el-select>
                </el-col>
              </el-row>

              <!-- 时间选择 -->
              <TableDate @changeDate="changeDataByDate" :sm="11" :md="8" :lg="6"></TableDate>

              <div style="color: #000; padding-top: .2rem; font-size: .14rem;">
                <div style="padding-bottom: .2rem;">
                  <span>{{ $t('other.text1') }}：</span>
                  <span>{{ totalDeposit }}</span>
                </div>
                <div>
                  <span>{{ $t('other.text2') }}：</span>
                  <span>{{ Hedging }}</span>
                </div>
              </div>

              <!-- 列表 -->
              <el-table
                row-class-name="rowClassName"
                header-row-class-name="headerRowClassName"
                style="width: 100%; margin-top: .2rem;"
                :stripe="true"
                :data="tableData"
              >
                <!-- 类型 -->
                <el-table-column :label="$t('form.type')">
                  <template
                    slot-scope="scope"
                  >{{ scope.row.walletLogBehavior == 2?$t('menu.productBuy'):$t('filters.product_type2') }}</template>
                </el-table-column>
                <!-- 用户名 -->
                <el-table-column :label="$t('form.userName')">
                  <template slot-scope="scope">{{ scope.row.userAccount }}</template>
                </el-table-column>
                <!-- 金额 -->
                <el-table-column :label="$t('form.money')">
                  <template slot-scope="scope">{{ scope.row.walletLogMoney|FORMATTED_NUMBER }}</template>
                </el-table-column>
                <!-- 业绩 -->
                <el-table-column :label="$t('admin_orderList.text7')">
                  <template slot-scope="scope">{{ scope.row.walletLogCash|FORMATTED_NUMBER }}</template>
                </el-table-column>
                <!-- 对冲金额 -->
                <el-table-column :label="$t('other.text2')">
                  <template slot-scope="scope">{{ scope.row.walletLogHedging|FORMATTED_NUMBER }}</template>
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
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
// 格式化金额
const FORMATTED_NUMBER = money => {
  if (money && money != null) {
    money = String(money);
    var left = money.split(".")[0],
      right = money.split(".")[1];
    right = right
      ? right.length >= 2
        ? "." + right.substr(0, 2)
        : "." + right + "0"
      : ".00";
    var temp = left
      .split("")
      .reverse()
      .join("")
      .match(/(\d{1,3})/g);
    return (
      (Number(money) < 0 ? "-" : "") +
      temp
        .join(",")
        .split("")
        .reverse()
        .join("") +
      right
    );
  } else if (money === 0) {
    //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
    return "0.00";
  } else {
    return "";
  }
};
export default {
  name: "my_child_grade",
  mixins: [WatchScreen, MessageBox],
  inject: ["$main"],
  components: {
    TableDate
  },
  data() {
    return {
      loading: false,
      account: "",
      totalDeposit: "",
      Hedging: "",
      type: 1,
      startTime: "",
      endTime: "",
      btnFlag: false,
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
    vm.fnGetListData();
    vm.fnGetData();
  },
  methods: {
    // 每页要展示多少条
    handleSizeChange(val) {
      let vm = this;
      vm.params.pageSize = val;
      vm.fnGetListData();
    },
    // 当前第几页
    handleCurrentChange(val) {
      let vm = this;
      vm.params.page = val;
      vm.fnGetListData();
      vm.currentPage = val;
    },
    // 获取列表数据
    fnGetListData() {
      let vm = this;
      let params = {
        account: vm.account,
        type: vm.type,
        date: "",
        startTime: vm.startTime,
        endTime: vm.endTime,
        pageNum: vm.params.page,
        pageSize: vm.params.pageSize
      };
      vm.$main.loading = true;
      vm.$api.LOGGING_GETPERFORMANCEDETAIL(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.total;
        }
        vm.$main.loading = false;
      });
    },
    fnGetData() {
      let vm = this;
      let params = {
        account: vm.account,
        type: vm.type,
        date: "",
        startTime: vm.startTime,
        endTime: vm.endTime
      };
      vm.$main.loading = true;
      vm.$api
        .LOGGING_GETMONTHSUPERUSERPERFORMANCE(params)
        .then(res => {
          vm.$main.loading = false;
          console.log(params);
          if (res.code == 0) {
            vm.totalDeposit = FORMATTED_NUMBER(res.data.totalDeposit);
            vm.Hedging = FORMATTED_NUMBER(res.data.Hedging);
          } else {
            vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
          }
        })
        .catch(err => {
          vm.$main.loading = false;
          console.log(err);
        });
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.startTime = formDate(data.startTime, 2);
      vm.endTime = formDate(data.endTime, 2);
      vm.fnGetListData();
      vm.fnGetData();
    },
    // 下拉框变化
    fnChange(val) {
      let vm = this;
      vm.fnGetListData();
      vm.fnGetData();
    }
  }
};
</script>
<style lang="scss">
.my_child_grade {
  .el-table {
    min-height: 0px !important;
  }
  .item_box .item_table_box .time_label {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .item_list_box {
    padding: 0.05rem;
  }
  color: #fff;
  .grade_bg {
    background: url("../../../lkh_images/mygrade_bg.png") no-repeat;
    background-size: cover;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .grade_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img_box {
      width: 0.66rem;
      height: 0.78rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .img_member {
      font-size: 0.16rem;
      padding-bottom: 0.05rem;
      padding-top: 0.05rem;
    }
    .img_demand {
      font-size: 0.14rem;
      color: rgba(178, 212, 255, 1);
      height: 0.22rem;
      line-height: 0.22rem;
    }
  }
}
</style>
