<template>
  <div class="item_box">
    <div class="item_table_box">
      <!-- 时间选择 -->
      <TableDate @changeDate="changeDataByDate"></TableDate>
      <!-- 请选择 -->
      <el-select
        style="padding-left: 20px; padding-top: 20px; width: 2rem;"
        size="small"
        v-model="params.type"
        :placeholder="$t('form.please')"
        @change="changeType"
      >
        <!-- 个人查询 -->
        <el-option :label="$t('admin_memberList.text7')" :value="1"></el-option>
        <!-- 团队查询 -->
        <el-option :label="$t('admin_memberList.text8')" :value="2"></el-option>
      </el-select>
      <div class="sel_label" ref="loadElement" style="overflow:hidden;">
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!--用户名  -->
            <el-input
              size="small"
              class="sel_input"
              v-model="params.account"
              :placeholder="$t('form.userName')"
            ></el-input>
            <!-- 搜索 -->
            <el-button
              size="small"
              @click="fnContentFil"
              class="sel_btn"
              type="success"
            >{{ $t('btn.search') }}</el-button>
          </el-col>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <!-- 导出Excel -->
            <!-- <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 0px; margin-top: .1rem;'"
              size="small"
              @click="fnExcel"
              class="sel_btn"
              type="success"
            >{{ $t('btn.Excel') }}</el-button>-->
            <!-- 导出所有原始数据 -->
            <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 0px; margin-top: .1rem;'"
              size="small"
              @click="fnExcelAllData"
              class="sel_btn"
              type="success"
            >{{ $t('btn.ExcelAll') }}</el-button>
            <!-- 导出原始数据 -->
            <el-button
              :style="screenSize == 1?'float: right':'float:left; margin-left: 10px; margin-top: .1rem;'"
              size="small"
              @click="fnExcelData"
              class="sel_btn"
              type="success"
            >{{ $t('btn.Excel') }}</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        row-class-name="rowClassName"
        header-row-class-name="headerRowClassName"
        style="width: 100%;"
        :stripe="true"
        :data="tableData"
      >
        <!-- 用户名 -->
        <el-table-column :label="$t('table.userName')">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column prop="create_time" :label="$t('form.phone')">
          <template slot-scope="scope">{{ scope.row.phone_area_code+scope.row.phone }}</template>
        </el-table-column>
        <!-- 微信号 -->
        <el-table-column prop="spare2" :label="$t('form.spare2')">
          <template slot-scope="scope">{{ scope.row.spare2||'--' }}</template>
        </el-table-column>
        <!-- 注册时间 -->
        <el-table-column width="160" prop="create_time" :label="$t('table.create_time')">
          <template slot-scope="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <!-- 推荐账号 -->
        <el-table-column prop="superUserAccount" :label="$t('table.recommend')">
          <template slot-scope="scope">{{ scope.row.superUserAccount||'--' }}</template>
        </el-table-column>
        <!-- CP余额 -->
        <el-table-column prop="superUserAccount" :label="$t('table.cpMoney')">
          <template slot-scope="scope">{{ (scope.row.wallet_cp||0)|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- RP余额 -->
        <el-table-column prop="superUserAccount" :label="$t('table.rpMoney')">
          <template slot-scope="scope">{{ (scope.row.wallet_rp||0)|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 等级 -->
        <el-table-column width="60" prop="superUserAccount" :label="$t('table.grade')">
          <template slot-scope="scope">{{ scope.row.grade_id }}</template>
        </el-table-column>
        <!-- 直推收益 -->
        <el-table-column width="60" prop="superUserAccount" :label="$t('table.profit')">
          <template slot-scope="scope">{{ scope.row.profit }}</template>
        </el-table-column>
        <!-- 当前投资金额 -->
        <el-table-column prop="superUserAccount" :label="$t('table.nowAmount')">
          <template slot-scope="scope">{{ (scope.row.sumIsMoney||0)|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 个人总业绩 -->
        <el-table-column prop="superUserAccount" :label="$t('table.aitemTotal')">
          <template slot-scope="scope">{{ (scope.row.isPerformance||0)|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 团队总业绩 -->
        <el-table-column prop="superUserAccount" :label="$t('table.allTotal')">
          <template slot-scope="scope">{{ (scope.row.performance||0)|FORMATTED_NUMBER }}</template>
        </el-table-column>
        <!-- 最高配套等级 -->
        <el-table-column prop="superUserAccount" :label="$t('table.highest_matching_id')">
          <template slot-scope="scope">{{ scope.row.highest_matching_id }}</template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column prop="superUserAccount" :label="$t('table.status')" width="80">
          <template slot-scope="scope">{{ USER_STATUS(scope.row.user_status) }}</template>
        </el-table-column>
        <!-- 权限分组 -->
        <el-table-column prop="superUserAccount" :label="$t('table.jdg_id')" width="80">
          <template slot-scope="scope">{{ JDG_ID(scope.row.jdg_id) }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column prop="user_id" :label="$t('table.operation')" width="400">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              :disabled="!!!btnFlag?true:false"
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row)"
            >{{ $t('btn.change') }}</el-button>
            <!-- 登录会员系统 -->
            <el-button
              size="small"
              type="primary"
              @click="fnEnterUserManage(scope.row)"
            >{{ $t('btn.enterMember1') }}</el-button>
            <el-button
              :disabled="!!!btnFlag?true:false"
              type="primary"
              size="mini"
              @click="fnPassord(scope.row)"
            >{{ $t('btn.password') }}</el-button>
            <!-- 修改权限 -->
            <el-button
              :disabled="!!!btnFlag1?true:false"
              type="primary"
              size="mini"
              @click="fnPermissions(scope.row)"
            >{{ $t('title.permissions') }}</el-button>
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
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "member_list_list",
  mixins: [WatchScreen],
  inject: ["p", "$main"],
  components: {
    TableDate
  },
  data() {
    return {
      btnFlag: false,
      btnFlag1: false,
      loading: false,
      currentPage: 1,
      tableData: [],
      allTableData: [],
      params: {
        pageSize: 10,
        page: 1,
        account: "",
        type: 1,
        startTime: "",
        endTime: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
    vm.fnBtnFlag(8);
    vm.fnBtnFlag1(10);
  },
  methods: {
    // 登录会员系统
    fnEnterUserManage(data) {
      let vm = this;
      let params = {
        account: data.account
      };
      vm.$api.USER_LOGINTEST(params).then(res => {
        if (res.code == 0) {
          window.localStorage.setItem(
            "user_token",
            JSON.stringify(res.data.token)
          ); // 保存token
          window.localStorage.setItem(
            "user_info",
            JSON.stringify(res.data.user)
          ); // 保存用户信息
          window.localStorage.setItem(
            "user_permission",
            JSON.stringify(vm.arrs)
          ); // 保存用户权限
          vm.$router.push({ path: "/user/home" });
        } else {
          vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
        }
      });
    },
    fnBtnFlag(num) {
      let vm = this;
      if (!!window.localStorage.getItem("admin_permission")) {
        let flagList = JSON.parse(
          window.localStorage.getItem("admin_permission")
        );
        if (flagList.indexOf(num) == -1) {
          vm.btnFlag = false;
        } else {
          vm.btnFlag = true;
        }
      }
    },
    fnBtnFlag1(num) {
      let vm = this;
      if (!!window.localStorage.getItem("admin_permission")) {
        let flagList = JSON.parse(
          window.localStorage.getItem("admin_permission")
        );
        if (flagList.indexOf(num) == -1) {
          vm.btnFlag1 = false;
        } else {
          vm.btnFlag1 = true;
        }
      }
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      // vm.params.startTime = data.startTime;
      // vm.params.endTime = data.endTime;
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    },
    // 订单状态
    changeType(val) {
      let vm = this;
      vm.params.page = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 导出数据-后端
    fnExcel() {
      let vm = this;
      let params = {
        token: window.localStorage.getItem("admin_token")
      };
      vm.$api
        .FILE_DOWNLOADUSEREXCE(params)
        .then(res => {
          // debugger
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        })
        .catch(err => {});
    },
    // 导出数据-前端
    fnExcelData() {
      let vm = this;
      vm.$main.loading = true;
      //excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../../assets/js/Export2Excel");
        let tHeader = [
          "用户名",
          "手机号码",
          "微信号",
          "注册时间",
          "推荐账号",
          "CP余额",
          "RP余额",
          "团队等级",
          "直推收益",
          "当前投资金额",
          "个人总业绩",
          "团队总业绩",
          "最高配套等级",
          "状态",
          "权限分组"
        ];
        let filterVal = [
          "account",
          "new_phone",
          "spare2",
          "create_time",
          "superUserAccount",
          "wallet_cp",
          "wallet_rp",
          "grade_id",
          "profit",
          "sumIsMoney",
          "isPerformance",
          "performance",
          "highest_matching_id",
          "new_user_status",
          "new_jdg_id"
        ];
        let list = vm.fileterData(); // 数据过滤
        let data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "用户数据");
        setTimeout(function() {
          vm.$main.loading = false;
        }, 200);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 导出的数据过滤
    fileterData(data) {
      let vm = this;
      let arrs = [];
      let list = data || vm.tableData;
      list.forEach((item, index) => {
        item.new_phone = item.phone_area_code + item.phone; // 手机号码
        item.new_user_status = vm.USER_STATUS(item.user_status); // 状态
        item.new_jdg_id = vm.JDG_ID(item.jdg_id); // 权限分组
        arrs.push(item);
      });
      return arrs;
    },
    // 导出所有数据
    fnExcelAllData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      params.pageSize = vm.total;
      vm.$main.loading = true;
      vm.$api.USER_GETUSERINFOALLS(params).then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.allTableData = res.data.list;
          //excel数据导出
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../../assets/js/Export2Excel");
            let tHeader = [
              "用户名",
              "手机号码",
              "微信号",
              "注册时间",
              "推荐账号",
              "CP余额",
              "RP余额",
              "团队等级",
              "直推收益",
              "当前投资金额",
              "个人总业绩",
              "团队总业绩",
              "最高配套等级",
              "状态",
              "权限分组"
            ];
            let filterVal = [
              "account",
              "new_phone",
              "spare2",
              "create_time",
              "superUserAccount",
              "wallet_cp",
              "wallet_rp",
              "grade_id",
              "profit",
              "sumIsMoney",
              "isPerformance",
              "performance",
              "highest_matching_id",
              "new_user_status",
              "new_jdg_id"
            ];
            let list = vm.fileterData(vm.allTableData); // 数据过滤
            let data = vm.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "用户数据");
          });
        }
      });
    },
    // 会员状态
    USER_STATUS(data) {
      let vm = this;
      if (data == 0) {
        return vm.$t("admin_memberList.text1"); // 未激活
      } else if (data == 1) {
        return vm.$t("admin_memberList.text2"); // 已激活
      } else {
        return vm.$t("admin_memberList.text3"); // 封号
      }
    },
    // 权限分组
    JDG_ID(data) {
      let vm = this;
      return vm.$t(`filters.user_type${data}`);
    },
    // 查看会员信息
    fnSeeMemberInfo(data) {
      let vm = this;
      vm.p.pageType = "info";
      vm.p.info = data;
    },
    // 修改密码
    fnPassord(data) {
      let vm = this;
      vm.p.pageType = "password";
      vm.p.info = data;
    },
    // 修改权限
    fnPermissions(data) {
      let vm = this;
      vm.p.pageType = "permissions";
      vm.p.info = data;
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
      vm.$api.USER_GETUSERINFOALLS(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list;
          vm.total = res.data.total;
        } else {
          vm.tableData = [];
          vm.total = 0;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
