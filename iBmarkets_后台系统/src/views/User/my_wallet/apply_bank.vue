<template>
  <div style="overflow: hidden;" class="apply_bank">
    <el-form
      :label-position="screenSize == 1?'left':'top'"
      :model="ruleForm"
      ref="ruleForm"
      label-width=".8rem"
      class="demo-ruleForm item_form"
    >
      <!-- 银行卡 -->
      <el-form-item :label="$t('form.bank')">
        <!-- 请选择 -->
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
          :min="100"
          :label="$t('form.money')"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ruleForm.receiptType" @change="fnSelectChange" v-if="false">
          <el-radio :label="1">BTC</el-radio>
          <el-radio :label="2">ETH</el-radio>
          <el-radio :label="3">USDT</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 手续费 -->
        <div>
          {{ $t('Wallet.text20') }}：
          <span
            style="color: rgba(255, 118, 63, 1); padding-right: 15px;"
          >{{ ruleForm.money*.1 }}</span>
        </div>
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
      <el-form-item style="margin-top: .3rem;">
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
  name: "apply_bank",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      bankList: "", // 银行卡列表
      outType: "coin", // coin  bank
      radio: 1,
      user: {
        mobile: "" // 手机号
      },
      ruleForm: {
        userBankId: "", // 银行卡ID
        money: 100, // 金额
        receiptType: 4, //类型
        payPassword: "", // 密码
        pVAddress: "" // 地址
      },
      rules: {
        //请输入密码
        payPassword: [
          {
            required: true,
            message: "form.transactionPassword",
            trigger: "blur"
          }
        ],
        //请输入金额
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
          vm.$main.loading = true;
          vm.$api.WALLET_REFONDBANK(params).then(res => {
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
