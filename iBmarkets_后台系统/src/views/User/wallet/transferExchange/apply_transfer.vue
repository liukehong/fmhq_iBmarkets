<template>
  <div style="overflow: hidden;" class="apply_transfer">
    <!-- 转账申请 -->
    <div class="item_title">{{ $t('title.applyTransfer') }}</div>
    <div class="item_box">
      <div class="item_list_box transfer_bg">
        <el-form
          :label-position="screenSize == 1?'left':'top'"
          :model="ruleForm"
          ref="ruleForm"
          label-width="1.3rem"
          class="demo-ruleForm item_form"
        >
          <el-row>
            <!-- 用户名 -->
            <el-col
              class="col-item"
              :span="24"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              style="padding-right: 20px;"
              :class="screenSize == 1?'':'p_r'"
            >
              <el-form-item :label="$t('table.walletType')">
                <el-radio-group v-model="ruleForm.walletType">
                  <el-radio :label="2">CP</el-radio>
                  <el-radio :label="3">RP</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('form.userName')" prop="toAccount">
                <el-input
                  size="small"
                  :placeholder="$t('form.userName')"
                  v-model="ruleForm.toAccount"
                ></el-input>
              </el-form-item>
              <!-- 金额 -->
              <el-form-item :label="$t('form.money')" prop="transferMoney">
                <el-input-number
                  style="width:100%;"
                  size="small"
                  v-model="ruleForm.transferMoney"
                  :min="50"
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
              <!-- 确认转账 -->
              <el-form-item>
                <el-button
                  :disabled="!!!btnFlag?true:false"
                  size="small"
                  style="width: 100%;"
                  type="success"
                  @click="submitForm('ruleForm')"
                >{{ $t('btn.sureSend') }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "apply_transfer",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      btnFlag: false,
      ruleForm: {
        transferMoney: "", // 转账金额
        payPassword: "", // 转账密码
        toAccount: "", // 转账账号
        walletType: 2 // 2cp 3rp
      },
      rules: {
        transferMoney: [
          {
            type: "number",
            required: true,
            message: "form.money_reg",
            trigger: "blur"
          }
        ], //请输入转账金额
        payPassword: [
          {
            required: true,
            message: "form.transactionPassword_reg",
            trigger: "blur"
          }
        ], // 请输入密码
        toAccount: [
          { required: true, message: "form.userName_reg", trigger: "blur" }
        ] // 请输入账号
      }
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnBtnFlag(3);
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
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.WALLET_TRANSFERACCOUNTS(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text10"), "success");
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

<style scoped lang="scss">
.transfer_bg {
  background: url("../../../../lkh_images/transfer_bg.png") no-repeat;
  background-size: cover;
  border-radius: 0.2rem;
  overflow: hidden;
}
</style>
