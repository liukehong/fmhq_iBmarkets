<template>
  <el-button class="codeBtn" :disabled="codeType" @click="fnGetCode">{{ codeContent }}</el-button>
</template>

<script>
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "GetCode",
  props: ["mobile", "apiUrl", "type", "phoneCode", "errTxt", "email"],
  mixins: [MessageBox],
  data() {
    return {
      codeType: false,
      codeContent: this.$t("btn.getCode") // 获取验证码
    };
  },
  methods: {
    // 参数
    fnGetParams() {
      let vm = this;
      let params;
      if (vm.apiUrl == "VERIFICATION_SENDCODES") {
        params = {
          type: vm.type
        };
      } else if (vm.apiUrl == "VERIFICATION_SENDCODE") {
        if (vm.type == 2) {
          // 邮箱
          params = {
            phoneAreaCode: "",
            key: vm.email,
            type: vm.type
          };
        } else {
          // 手机号
          params = {
            phoneAreaCode: vm.phoneCode.replace("+", "%2B"),
            type: vm.type,
            // key : phone.replace('+','%2B')
            key: vm.mobile
          };
        }
      } else if (vm.apiUrl == "VERIFICATION_SENDCODERETRIEVEPASSWORD") {
        params = {
          userAccount: vm.mobile,
          type: vm.type
        };
      }
      return params;
    },
    // 是否要输入手机号或者邮箱
    fnReg () {
      let vm = this;
      if (vm.type == 1) {
        if (!!!vm.mobile) {
          //请输入手机号码
          vm.fnOpenMessageBox(vm.errTxt || vm.$t("form.phone_reg"), "error");
          return false;
        }
      } else {
        if (!!!vm.email) {
          // 请输入邮箱
          vm.fnOpenMessageBox(vm.errTxt || vm.$t("form.email_reg"), "error");
          return false;
        }
      }
      return true
    },
    // 获取验证码
    fnGetCode() {
      let vm = this;
      let flag = true;
      if(vm.apiUrl == 'VERIFICATION_SENDCODE'||vm.apiUrl == 'VERIFICATION_SENDCODERETRIEVEPASSWORD'){
        flag = vm.fnReg();
        if(!!!flag){
          return false;
        }
      }
      let num = 60;
      let timer = null;
      function fnCountDown() {
        vm.codeType = true;
        vm.codeContent = num;
        timer = setInterval(function() {
          if (num == 0) {
            window.clearInterval(timer);
            vm.codeContent = vm.$t("btn.getCode");
            vm.codeType = false;
          } else {
            num = num - 1;
            vm.codeContent = num;
          }
        }, 1000);
      }
      // 调用接口 获取验证码
      let ajaxData = vm.fnGetParams();
      fnCountDown();
      vm.$api[vm.apiUrl](ajaxData).then(res => {
        if (res.code == 0) {
          // 倒计时操作
          // fnCountDown();
        } else {
          vm.fnOpenMessageBox(res.msg, "error");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
