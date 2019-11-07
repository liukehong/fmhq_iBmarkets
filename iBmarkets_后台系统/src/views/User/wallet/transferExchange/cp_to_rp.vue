<template>
  <div style="overflow: hidden;" class="cp_to_rp">
    <!-- CP转RP -->
    <div class="item_title">{{ $t('Wallet.text26') }}</div>
    <div class="item_box">
      <div class="item_list_box transfer_bg" style="min-height: 2rem;">
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
          <el-row>
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
              <!-- 金额 -->
              <el-form-item :label="$t('form.money')" prop="money">
                <el-input-number
                  style="width:100%;"
                  size="small"
                  v-model="ruleForm.money"
                  :min="0"
                  :max="p.walletData.walletCp"
                  :label="$t('form.money')"
                ></el-input-number>
              </el-form-item>
              <!-- 确认转换 -->
              <el-form-item>
                <el-button
                  size="small"
                  style="width: 100%;"
                  type="success"
                  @click="submitForm('ruleForm')"
                >{{ $t('btn.sureChange') }}</el-button>
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
  name: "cp_to_rp",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main", "p"],
  data() {
    return {
      walletData: "",
      ruleForm: {
        money: "" // 金额
      },
      rules: {
        money: [
          {
            type: "number",
            required: true,
            message: "form.money_reg",
            trigger: "blur"
          }
        ] //请输入金额
      }
    };
  },
  mounted() {
    let vm = this;
    vm.getUserWallet();
  },
  methods: {
    // 获取用户钱包信息
    getUserWallet() {
      let vm = this;
      vm.$api.WALLET_GETUSERWALLET().then(res => {
        if (res.code == 0) {
          vm.walletData = res.data;
        }
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          // 请输入金额
          if (!!!vm.ruleForm.money) {
            vm.fnOpenMessageBox(vm.$t("form.money_reg"), "error");
            return false;
          }
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.WALLET_CPTORP(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text11"), "success");

              vm.p.newDate = +new Date();
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
