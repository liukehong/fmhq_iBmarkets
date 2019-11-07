<template>
  <div style="overflow: hidden;" class="mt4_account_bank">
    <el-form
      :label-position="screenSize == 1?'left':'top'"
      :model="ruleForm"
      ref="ruleForm"
      label-width=".8rem"
      class="demo-ruleForm item_form"
    >
      <!-- 银行卡 -->
      <el-form-item :label="$t('form.bank')">
        <el-select
          v-model="ruleForm.userBankId"
          size="small"
          style="width: 100%;"
          :placeholder="$t('form.please')"
        >
          <el-option
            v-for="item in bankList"
            :key="item.userBankId"
            :label="item.userBankName"
            :value="item.userBankId"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 金额 -->
      <el-form-item :label="$t('form.money')" prop="money">
        <el-input-number
          style="width: 100%;"
          size="small"
          v-model="ruleForm.money"
          :min="0"
          :label="$t('form.money')"
        ></el-input-number>
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
        <!-- 提交 -->
        <el-button
          size="small"
          style="width: 100%;"
          type="success"
          @click="submitForm('ruleForm')"
        >{{ $t('btn.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "mt4_account_bank",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main", "p"],
  data() {
    return {
      bankList: "", // 银行卡列表
      outType: "coin", // coin  bank
      radio: 1,
      user: {
        mobile: "" // 手机号
      },
      ruleForm: {
        userMatchingId: "", // 配套ID
        money: "", // 金额
        userBankId: "", // 银行卡ID
        receiptType: 4, //类型
        payPassword: "" // 密码
      },
      rules: {
        // 请输入密码
        payPassword: [
          {
            required: true,
            message: "form.transactionPassword_reg",
            trigger: "blur"
          }
        ],
        // 请输入金额
        money: [
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
  mounted: function() {
    let vm = this;
    vm.fnGetBankList();
  },
  methods: {
    // 获取银行卡
    fnGetBankList() {
      let vm = this;
      vm.$api.BANK_GETUSERBANKS().then(res => {
        vm.bankList = res.data;
      });
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
          params.userMatchingId = vm.p.matchingData.userMatchingId;
          vm.$main.loading = true;
          vm.$api.MATCHING_REFUNDBANK(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text7"), "success");
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
</style>
