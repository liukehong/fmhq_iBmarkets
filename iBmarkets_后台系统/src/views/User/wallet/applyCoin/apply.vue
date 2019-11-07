<template>
  <div style="overflow: hidden;" class="apply_coin">
    <div class="item_title">
      <!-- 提币申请 -->
      <div style="float:left;">{{ $t('title.applyCoin') }}</div>
      <div v-if="false" class="changeoutType" style="float:right;">
        <!-- 货币 -->
        <span :class="outType=='coin'?'active':''" @click="outType='coin'">{{ $t('Wallet.text11') }}</span>
        <!-- 银行卡 -->
        <span :class="outType=='bank'?'active':''" @click="outType='bank'">{{ $t('Wallet.text18') }}</span>
      </div>
    </div>
    <div class="item_box">
      <div class="item_list_box transfer_bg" style="min-height: 3.2rem;">
        <el-row>
          <el-col
            v-if="outType == 'coin'"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
            <!-- CP钱包当前总 -->
            <el-form class="demo-ruleForm item_form" label-width="1.3rem" label-position="left">
              <el-form-item :label="$t('Home.text16')">
                <div
                  style="color: #000; display:inline-block;"
                >{{ p.walletData.walletCp|FORMATTED_NUMBER }}</div>
              </el-form-item>
            </el-form>
            <el-form
              :label-position="screenSize == 1?'left':'top'"
              :model="ruleForm"
              ref="ruleForm"
              label-width="1.3rem"
              class="demo-ruleForm item_form"
            >
              <!-- 金额 -->
              <el-form-item :label="$t('form.money')" prop="money">
                <el-input-number
                  :step="50"
                  step-strictly
                  style="width: 100%;"
                  size="small"
                  v-model="ruleForm.money"
                  :min="50"
                  :label="$t('form.money')"
                ></el-input-number>
              </el-form-item>
              <el-form-item v-if="false">
                <el-radio-group v-model="ruleForm.receiptType" @change="fnSelectChange">
                  <el-radio :label="1">BTC</el-radio>
                  <el-radio :label="2">ETH</el-radio>
                  <el-radio :label="3">USDT</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 收款地址 -->
              <el-form-item :label="$t('form.coinAddress')" prop="receiptAddress">
                <el-input
                  size="small"
                  :placeholder="$t('form.coinAddress')"
                  v-model="ruleForm.receiptAddress"
                ></el-input>
              </el-form-item>
              <!-- 交易密码 -->
              <el-form-item :label="$t('form.transactionPassword')" prop="payPassword">
                <el-input
                  type="password"
                  size="small"
                  :placeholder="$t('form.transactionPassword')"
                  v-model="ruleForm.payPassword"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div>
                  <!-- 手续费： -->
                  {{ $t('Wallet.text20') }}：
                  <span
                    style="color: rgba(255, 118, 63, 1); padding-right: 15px;"
                  >10%</span>
                </div>
              </el-form-item>
              <!-- 确认提币 -->
              <el-form-item>
                <el-button
                  :disabled="!!!btnFlag?true:false"
                  size="small"
                  style="width: 100%;"
                  type="success"
                  @click="submitForm('ruleForm')"
                >{{ $t('btn.sureMoney') }}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "apply_coin",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main", "p"],
  data() {
    return {
      btnFlag: false,
      outType: "coin", // coin  bank
      radio: 1,
      user: {
        mobile: "" // 手机号
      },
      ruleForm: {
        money: "", // 金额
        receiptType: 3, //类型
        payPassword: "", // 密码
        receiptAddress: "" // 地址
      },
      rules: {
        payPassword: [
          {
            required: true,
            message: "form.transactionPassword_reg",
            trigger: "blur"
          } // 请输入密码
        ],
        receiptAddress: [
          { required: true, message: "form.coinAddress_reg", trigger: "blur" } // 请输入地址
        ],
        money: [
          // 请输入金额
          {
            type: "number",
            required: true,
            message: "form.money_reg",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  mounted: function() {
    let vm = this;
    vm.fnInit();
    vm.fnBtnFlag(2);
  },
  methods: {
    fnBtnFlag(num) {
      let vm = this;
      if (!!window.localStorage.getItem("user_permission")) {
        let flagList = JSON.parse(
          window.localStorage.getItem("user_permission")
        );
        if (flagList.indexOf(num) == -1) {
          vm.btnFlag = false;
        } else {
          vm.btnFlag = true;
        }
      }
    },
    fnInit() {
      let vm = this;
      let infoName = "user_info";
      if (this.$route.matched[0].name == "admin") {
        // 管理员
        infoName = "admin_info";
      } else {
        // 普通用户
        infoName = "user_info";
      }
      let userInfo = JSON.parse(window.localStorage.getItem(infoName));
      if (vm.ruleForm.receiptType == 1) {
        vm.ruleForm.receiptAddress = userInfo.btcAddress;
      } else if (vm.ruleForm.receiptType == 2) {
        vm.ruleForm.receiptAddress = userInfo.ethAddress;
      } else {
        vm.ruleForm.receiptAddress = userInfo.usdtAddress;
      }
    },
    // 类型变化
    fnSelectChange(val) {
      let vm = this;
      vm.fnInit();
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.WALLET_REFOND(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("alert.text7"),
                "success"
              ); // 提币成功
            } else {
              vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            }
          });
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.transfer_bg {
  background: url("../../../../lkh_images/transfer_bg.png") no-repeat;
  background-size: cover;
  border-radius: 0.2rem;
  overflow: hidden;
}
.apply_coin {
  color: #000;
  .changeoutType {
    span {
      font-size: 0.12rem !important;
      padding: 5px 10px;
      margin-left: 5px;
      border-radius: 8px;
      cursor: pointer;
      color: #000;
    }
  }
  .active {
    background: rgba(24, 75, 139, 1);
    color: #fff !important;
  }
}
</style>
