<template>
  <el-form
    :model="ruleForm1"
    :label-position="screenSize == 1?'left':'top'"
    ref="ruleForm1"
    label-width="1.8rem"
    class="demo-ruleForm item_form"
  >
    <!-- 新号码 -->
    <el-form-item :label="$t('form.newPhone')" v-if="type == 1">
      <el-input size="small" :placeholder="$t('form.newPhone')" v-model="ruleForm1.newMobile">
        <el-select
          size="small"
          class="reset_select"
          v-model="phoneCode"
          slot="prepend"
          :placeholder="$t('form.please')"
        >
          <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item :label="$t('form.code')" v-if="type == 1">
      <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm1.newCode">
        <template slot="append">
          <GetCode
            apiUrl="VERIFICATION_SENDCODE"
            :phoneCode="phoneCode"
            :mobile="ruleForm1.newMobile"
            type="1"
          ></GetCode>
        </template>
      </el-input>
    </el-form-item>
    <!-- 新邮箱 -->
    <el-form-item :label="$t('form.newEmail')" v-if="type == 2">
      <el-input size="small" :placeholder="$t('form.newEmail')" v-model="ruleForm.btcAddress"></el-input>
    </el-form-item>
    <!-- 邮箱验证码 -->
    <el-form-item :label="$t('form.code')" v-if="type == 2">
      <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm1.newCode1">
        <template slot="append">
          <GetCode apiUrl="VERIFICATION_SENDCODE" :email="ruleForm1.email" type="2"></GetCode>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <!-- 返回 -->
      <el-button size="small" @click="returnPage">{{ $t('btn.return') }}</el-button>
      <!-- 提交 -->
      <el-button size="small" type="primary" @click="submitForm('ruleForm1')">{{ $t('btn.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "PhoneManageNext",
  mixins: [WatchScreen, MessageBox],
  props: ["oldCode", "type"],
  inject: ["$main"],
  data() {
    return {
      phoneCode: "+86",
      ruleForm1: {
        newMobile: "", // 新手机号
        code: "", // 老手机号验证码
        newCode: "", // 新手机号验证码
        email: "", // 新邮箱
        newCode1: "" // 新邮箱验证码
      },
      list: comData.phone
    };
  },
  components: {
    GetCode
  },
  methods: {
    // 返回上一步
    returnPage() {
      let vm = this;
      vm.$emit("changeNext");
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      if (vm.type == 1) {
        if (!!!vm.ruleForm1.newMobile) {
          // 请输入新手机号
          vm.fnOpenMessageBox(vm.$t("form.newPhone_reg"), "error");
          return false;
        }
        if (!!!vm.ruleForm1.newCode) {
          // 请输入验证码
          vm.fnOpenMessageBox(vm.$t("form.code_reg"), "error");
          return false;
        }
        vm.$refs[formName].validate(valid => {
          if (valid) {
            // 调用修改接口
            vm.$main.loading = true;
            vm.$api
              .USER_UPDATEPHONE({
                newPhoneAreaCode: vm.phoneCode, // 区号
                code: vm.oldCode, // 旧验证码
                newPhone: vm.ruleForm1.newMobile, // 新手机号
                newCode: vm.ruleForm1.newCode // 新验证码
              })
              .then(res => {
                if (res.code == 0) {
                  vm.fnOpenMessageBox(vm.$t("alert.text2"), "success");
                  vm.$emit("changeNext");
                } else {
                  vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
                }
                vm.$main.loading = false;
              });
          } else {
            return false;
          }
        });
      } else {
        if (!!!vm.ruleForm1.email) {
          // 请输入新邮箱
          vm.fnOpenMessageBox(vm.$t("form.newEmail_reg"), "error");
          return false;
        }
        if (!!!vm.ruleForm1.newCode1) {
          // 请输入邮箱验证码
          vm.fnOpenMessageBox(vm.$t("form.code_reg"), "error");
          return false;
        }
        vm.$refs[formName].validate(valid => {
          if (valid) {
            // 调用修改接口
            vm.$main.loading = true;
            vm.$api
              .USER_UPDATEEMAIL({
                code: vm.oldCode, // 旧验证码
                email: vm.ruleForm1.email, // 新邮箱
                newCode: vm.ruleForm1.newCode1 // 新验证码
              })
              .then(res => {
                if (res.code == 0) {
                  vm.fnOpenMessageBox(vm.$t("alert.text2"), "success");
                  vm.$emit("changeNext");
                } else {
                  vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
                }
                vm.$main.loading = false;
              });
          } else {
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.reset_select {
  width: 0.9rem;
}
</style>
