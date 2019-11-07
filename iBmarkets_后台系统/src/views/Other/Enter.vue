<template>
  <transition name="fade">
    <el-col class="ohter_box" style="overflow: hidden;">
      <!-- 财务盘点 -->
      <!-- <div class="item_title">{{ $t('title.financialInventory') }}</div> -->
      <el-col class="item_box">
        <el-scrollbar style="height: 100%;">
          <el-col class="item_list_box">
            <el-row>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="login_bogo" style="text-align:center;">
                  <!-- 切换语言 -->
                  <div class="langBox">
                    <el-select
                      @change="fnLanguageChange"
                      style="width: 100%;"
                      v-model="value"
                      :placeholder="$t('form.please')"
                    >
                      <el-option
                        v-for="item in languageList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <img src="../../lkh_images/logo.png" alt />
                  <div style="padding-top: .12rem;">INTEGRATED BROKERS</div>
                </div>
              </el-col>
              <!-- <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="langBox">
                  <el-select
                    @change="fnLanguageChange"
                    style="width: 100%;"
                    v-model="value"
                    :placeholder="$t('form.please')"
                  >
                    <el-option
                      v-for="item in languageList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>-->
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 历史总入金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text1') }}</div>
                  <div class="box_bottom">
                    <p>{{ (totalDeposit||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 上月总入金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text2') }}</div>
                  <div class="box_bottom">
                    <p>{{ (lastMonthDeposit||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 本月总入金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text3') }}</div>
                  <div class="box_bottom">
                    <p>{{(thisMonthDeposit||0)|FORMATTED_NUMBER}}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 历史总出金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text4') }}</div>
                  <div class="box_bottom">
                    <p>{{(totalWithdrawal||0)|FORMATTED_NUMBER}}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 上月总出金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text5') }}</div>
                  <div class="box_bottom">
                    <p>{{(lastMonthWithdrawal||0)|FORMATTED_NUMBER}}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 本月总出金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text6') }}</div>
                  <div class="box_bottom">
                    <p>{{(thisMonthWithdrawal||0)|FORMATTED_NUMBER}}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 历史总佣金 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text7') }}</div>
                  <div class="box_bottom">
                    <p>{{ (totalCommission||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 上月总佣金 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text8') }}</div>
                  <div class="box_bottom">
                    <p>{{ (lastMonthCommission||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 本月总佣金 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text9') }}</div>
                  <div class="box_bottom">
                    <p>{{ (thisMonthCommission||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 历史总收益 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text10') }}</div>
                  <div class="box_bottom">
                    <p>{{ (totalIncome||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 上月总收益 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text11') }}</div>
                  <div class="box_bottom">
                    <p>{{ (lastMonthIncome||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 本月总收益 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text12') }}</div>
                  <div class="box_bottom">
                    <p>{{ (thisMonthIncome||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- 时间选择 -->
            <el-row>
              <el-col
                style="padding:0px 10px 0px;"
                :span="24"
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24"
              >
                <TableDate format="yyyy-MM-dd" @changeDate="changeDataByDate"></TableDate>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 自定义周期总入金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text13') }}</div>
                  <div class="box_bottom">
                    <p>{{ (dateToDateDeposit||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 自定义周期总出金量 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text14') }}</div>
                  <div class="box_bottom">
                    <p>{{ (DateToDateTotaWithdrawal||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 自定义周期总佣金 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text15') }}</div>
                  <div class="box_bottom">
                    <p>{{ (dateToDateCommission||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
              <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <div class="box">
                  <!-- 自定义周期总收益 -->
                  <div class="box_top">{{ $t('admin_financialInventory.text16') }}</div>
                  <div class="box_bottom">
                    <p>{{ (dateToDateIncome||0)|FORMATTED_NUMBER }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-scrollbar>
      </el-col>
    </el-col>
  </transition>
</template>
<script>
import comData from "@/utils/data.js";
import MyValidate from "@/mixins/myValidate.js";
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
export default {
  name: "ohter_box",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  data() {
    return {
      value: "zh", // 语言种类
      languageList: [
        {
          name: "中文简体",
          value: "zh"
        },
        {
          name: "English",
          value: "en"
        }
      ],
      startTime: "",
      endTime: "",
      totalDeposit: "", // 总入金
      lastMonthDeposit: "", // 上月总入金
      thisMonthDeposit: "", // 本月总入金
      dateToDateDeposit: "", // 时间段总入金
      totalWithdrawal: "", // 总出金
      lastMonthWithdrawal: "", // 上月总出金
      thisMonthWithdrawal: "", // 本月总出金
      DateToDateTotaWithdrawal: "", // 时间段总出金
      totalCommission: "", // 总佣金
      lastMonthCommission: "", // 上月总佣金
      thisMonthCommission: "", // 本月总佣金
      dateToDateCommission: "", // 时间段总佣金
      totalIncome: "", // 总收益
      lastMonthIncome: "", // 上月总收益
      thisMonthIncome: "", // 本月总收益
      dateToDateIncome: "" // 时间段总收益
    };
  },
  mounted: function() {
    let vm = this;
    if (window.localStorage.getItem("locale")) {
      vm.value = window.localStorage.getItem("locale");
    } else {
      window.localStorage.setItem("locale", vm.value);
    }
    vm.fnGetData(1);
  },
  methods: {
    // 语言切换
    fnLanguageChange(val) {
      let vm = this;
      vm.value = val;
      window.localStorage.setItem("locale", vm.value);
      vm.$i18n.locale = val;
    },
    // 获取数据
    fnGetData(type) {
      let vm = this;
      let params = {
        startTime: vm.startTime,
        endTime: vm.endTime,
        type: type
      };
      vm.$api.LOGGIN_GETDEPOSIT(params).then(res => {
        if (res.code == 0) {
          if (type == 1) {
            // 非自定义周期
            vm.totalDeposit = res.data.totalDeposit;
            vm.lastMonthDeposit = res.data.lastMonthDeposit;
            vm.thisMonthDeposit = res.data.thisMonthDeposit;
            vm.totalWithdrawal = res.data.totalWithdrawal;
            vm.lastMonthWithdrawal = res.data.lastMonthWithdrawal;
            vm.thisMonthWithdrawal = res.data.thisMonthWithdrawal;
            vm.totalCommission = res.data.totalCommission;
            vm.lastMonthCommission = res.data.lastMonthCommission;
            vm.thisMonthCommission = res.data.thisMonthCommission;
            vm.totalIncome = res.data.totalIncome;
            vm.lastMonthIncome = res.data.lastMonthIncome;
            vm.thisMonthIncome = res.data.thisMonthIncome;
          } else {
            // 自定义周期
            vm.dateToDateDeposit = res.data.dateToDateDeposit;
            vm.DateToDateTotaWithdrawal = res.data.DateToDateTotaWithdrawal;
            vm.dateToDateCommission = res.data.dateToDateCommission;
            vm.dateToDateIncome = res.data.dateToDateIncome;
          }
        }
      });
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.startTime = data.startTime;
      vm.endTime = data.endTime;
      vm.fnGetData(2);
    }
  }
};
</script>
<style lang="scss">
.ohter_box {
  .history_to {
    color: #fff !important;
  }
  .login_bogo {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    img {
      margin: 0 auto;
      display: block;
      width: 1.51rem;
      height: 0.32rem;
      overflow: hidden;
    }
    div {
      color: rgba(138, 138, 138, 1);
      font-size: 0.12rem;
    }
  }
  .langBox {
    // float: right;
    position: absolute!important;
    top: 0.1rem!important;
    right: 0px!important;
    width: 1.3rem!important;
    height: 0.3rem!important;
    input.el-input__inner {
      background: rgba(1, 11, 33, 0.6);
      color: #fff;
    }
  }
  .item_box {
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: 0px;
  }
  .item_list_box {
    padding-top: 0.1rem !important;
  }
  width: 100%;
  .box {
    background: rgba(29, 113, 175, 0.8) !important;
    font-size: 0.14rem;
    .box_top {
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
    .box_bottom {
      height: 60px;
      width: 100%;
      p {
        text-align: center;
        line-height: 60px;
        color: #fa7951;
      }
    }
  }
}
</style>
