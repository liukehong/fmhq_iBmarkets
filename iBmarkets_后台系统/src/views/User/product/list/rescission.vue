<template>
  <transition name="fade">
    <div class="product_rescission" style="overflow: hidden;">
      <div class="item_list_box">
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <!-- 表单 -->
            <el-form
              style="margin-bottom: .2rem;"
              :model="ruleForm"
              ref="ruleForm"
              class="demo-ruleForm item_form"
              label-width="1.6rem"
              :label-position="screenSize == 1?'left':'top'"
            >
              <!-- 配套ID -->
              <el-form-item v-if="false" prop="account" :label="$t('user_product.text23')">
                <div style="color: #000;">{{ p.info.userMatchingId }}</div>
              </el-form-item>
              <!-- 配套金额 -->
              <el-form-item prop="account" :label="$t('user_product.text6')">
                <div style="color: #000;">{{ p.info.isMoney|FORMATTED_NUMBER }}</div>
              </el-form-item>
              <!-- 类型 -->
              <el-form-item v-if="false" :label="$t('form.type')">
                <el-radio-group v-model="ruleForm.receiptType" @change="fnSelectChange">
                  <el-radio :label="1">BTC</el-radio>
                  <el-radio :label="2">ETH</el-radio>
                  <el-radio :label="3">USDT</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 收款地址 -->
              <el-form-item v-if="false" :label="$t('form.coinAddress')" prop="receiptAddress">
                <el-input
                  size="small"
                  :placeholder="$t('form.coinAddress')"
                  v-model="ruleForm.receiptAddress"
                ></el-input>
              </el-form-item>
              <!-- 支付密码 -->
              <el-form-item prop="password" :label="$t('user_product.text16')">
                <el-input
                  size="small"
                  type="password"
                  :placeholder="$t('user_product.text16')"
                  v-model="ruleForm.payPassword"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
            <!-- 提交 -->
            <el-button
              size="small"
              type="primary"
              @click="submitForm('ruleForm')"
            >{{ $t('btn.submit') }}</el-button>
            <!-- 返回 -->
            <el-button size="small" @click="p.pageType = 'list'">{{ $t('btn.return') }}</el-button>
          </el-col>
          <!-- box3 -->
          <el-col
            style="padding-left: 0px;"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
            <div class="box3">
              <!-- 注意事项 -->
              <div>{{ $t('Wallet.text2') }}</div>
              <div>
                <!-- 一、支付宝入金时客户扫码时间需在 2 分钟内，如超过 2 分钟，请重新在平台上请求生成二维码。 -->
                <p>{{ $t('Wallet.text31') }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
<script>
import comData from "@/utils/data.js";
import MyValidate from "@/mixins/myValidate.js";
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "product_rescission",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      ruleForm: {
        userMatchingId: this.p.info.userMatchingId,
        receiptType: 3,
        payPassword: "",
        receiptAddress: ""
      },
      rules: {}
    };
  },
  mounted() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
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
          vm.$api.MATCHING_REFUND(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("user_product.text24"), "success");
              vm.p.pageType = "list";
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
.product_rescission {
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #dbe2ec !important;
  }
  .box3 {
    padding-top: 0.3rem;
    overflow: hidden;
    div {
      color: rgba(255, 118, 63, 1);
      font-size: 0.12rem;
      padding-bottom: 0.1rem;
    }
    p {
      font-size: 0.12rem;
      color: #000;
      padding-bottom: 0.1rem;
    }
  }
}
</style>
