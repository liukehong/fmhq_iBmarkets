<template>
  <div style="overflow: hidden;" class="my_account_password">
    <div class="item_title">
      <!-- 修改密码 -->
      <div style="float:left;">{{ $t('title.password') }}</div>
      <div class="changePassType" style="float:right;">
        <!-- 登录密码 -->
        <span
          :class="passType=='enter'?'active':''"
          @click="passType='enter'"
        >{{ $t('btn.enterPassword') }}</span>
        <!-- 交易密码 -->
        <span
          :class="passType=='transaction'?'active':''"
          @click="passType='transaction'"
        >{{ $t('btn.transactionPassword') }}</span>
      </div>
    </div>
    <div class="item_box">
      <div class="item_list_box">
        <el-form
          :label-position="screenSize == 1?'left':'top'"
          :model="ruleForm"
          ref="ruleForm"
          label-width="1.8rem"
          class="demo-ruleForm item_form"
        >
          <el-row>
            <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <!-- 原密码 -->
              <el-form-item :label="$t('form.oldPassword')" prop="oldPwd">
                <el-input
                  type="password"
                  size="small"
                  :placeholder="$t('form.oldPassword')"
                  v-model="ruleForm.oldPwd"
                ></el-input>
              </el-form-item>
              <!-- 新密码 -->
              <el-form-item :label="$t('form.newPassword')" prop="newPassword">
                <el-input
                  type="password"
                  size="small"
                  :placeholder="$t('form.newPassword')"
                  v-model="ruleForm.newPassword"
                ></el-input>
              </el-form-item>
              <!-- 确认密码 -->
              <el-form-item :label="$t('form.password1')" prop="newPassword1">
                <el-input
                  type="password"
                  size="small"
                  :placeholder="$t('form.password1')"
                  v-model="ruleForm.newPassword1"
                ></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item :label="$t('form.code')" prop="code">
                <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm.codePhone">
                  <template slot="append">
                    <GetCode apiUrl="VERIFICATION_SENDCODES" type="1"></GetCode>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <!-- 提交 -->
                <el-button
                  style="width:100%;"
                  size="small"
                  type="success"
                  @click="submitForm('ruleForm')"
                >{{ $t('btn.submit') }}</el-button>
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
import GetUserInfo from "@/mixins/getUserInfo.js";
import GetCode from "@/components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "my_account_password",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      passType: "enter",
      ruleForm: {
        oldPwd: "", // 旧密码
        newPassword: "", // 新密码
        newPassword1: "", // 确认新旧密码
        codePhone: "", // 手机验证码
        type: 1 // 1登录密码 2支付密码
      },
      rules: {
        // 请输入旧密码
        oldPwd: [
          { required: true, message: "form.oldPassword_reg", trigger: "blur" }
        ],
        // 请输入新密码
        newPassword: [
          { required: true, message: "form.newPassword_reg", trigger: "blur" }
        ],
        // 请再次输入密码
        newPassword1: [
          { required: true, message: "form.password1_reg", trigger: "blur" }
        ],
        // 请输入验证码
        codePhone: [
          { required: true, message: "form.code_reg", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    GetCode
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          delete params.newPassword1;
          params.type = vm.passType == "enter" ? 1 : 2;
          vm.$main.loading = true;
          vm.$api.USER_UPDATEPASSWORD(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text2"), "success");
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
.my_account_password {
  .changePassType {
    span {
      font-size: 0.12rem !important;
      padding: 5px 10px;
      margin-left: 5px;
      border-radius: 8px;
      cursor: pointer;
      color: #000;
      background: #dee5f1;
    }
  }
  .active {
    background: rgba(24, 75, 139, 1) !important;
    color: #fff !important;
  }
}
</style>
