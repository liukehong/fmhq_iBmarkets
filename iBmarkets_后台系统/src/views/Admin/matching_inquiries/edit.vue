<template>
  <transition name="fade">
    <div class="item_box">
      <div class="product_withdrawal" style="overflow: hidden;">
        <div class="item_list_box">
          <el-row>
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
              <!-- 表单 -->
              <el-form
                style="margin-bottom: .2rem;"
                :model="ruleForm"
                ref="ruleForm"
                class="demo-ruleForm item_form"
                label-width="1.6rem"
                :label-position="screenSize == 1?'left':'top'"
              >
                <!-- 金额 -->
                <el-form-item prop="account" :label="$t('form.money')">
                  <el-input-number
                    style="margin-bottom: .1rem;"
                    v-model="ruleForm.money"
                    :min="0"
                    :label="$t('form.money')"
                  ></el-input-number>
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
          </el-row>
        </div>
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
  name: "product_withdrawal",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      ruleForm: {
        money: 0
      },
      rules: {}
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      if (vm.ruleForm.money > 0) {
      } else {
        vm.fnOpenMessageBox(vm.$t("form.money_reg"), "error");
        return false;
      }
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = {
            userMatchingId: vm.p.info.userMatchingId,
            money: vm.ruleForm.money
          };
          vm.$main.loading = true;
          vm.$api.MATCHING_ADDMT4PROFIT(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text3"), "success");
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
.product_withdrawal {
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #dbe2ec !important;
  }
}
</style>
