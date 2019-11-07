<template>
  <div class="item_box user_manage_password">
    <div class="item_list_box">
      <el-form
        :label-position="screenSize == 1?'left':'top'"
        :model="ruleForm"
        ref="ruleForm"
        label-width="1.8rem"
        class="demo-ruleForm item_form"
      >
        <el-row>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <!-- 密码类型 -->
            <el-form-item :label="$t('form.passwordType')">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <!-- 登录密码 -->
                <el-option :label="$t('btn.enterPassword')" :value="1"></el-option>
                <!-- 交易密码 -->
                <el-option :label="$t('btn.transactionPassword')" :value="2"></el-option>
              </el-select>
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
            <el-form-item>
              <!-- 提交 -->
              <el-button
                size="small"
                type="primary"
                @click="submitForm('ruleForm')"
              >{{ $t('btn.submit') }}</el-button>
              <!-- 返回 -->
              <el-button size="small" @click="p.pageType = 'list'">{{ $t('btn.return') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "user_manage_password",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main", "p"],
  data() {
    return {
      passType: "enter",
      ruleForm: {
        newPassword: "", // 新密码
        newPassword1: "", // 确认新旧密码
        type: 1 // 1登录密码 2支付密码
      },
      rules: {
        // 请输入新密码
        newPassword: [
          { required: true, message: "form.newPassword_reg", trigger: "blur" }
        ],
        // 请再次输入密码
        newPassword1: [
          { required: true, message: "form.password1_reg", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = {
            userId: vm.p.info.user_id,
            pw: vm.ruleForm.newPassword,
            type: vm.ruleForm.type
          };
          vm.$main.loading = true;
          vm.$api.USER_RESETPASSWORD(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text13"), "success");
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
.user_manage_password {
  .active {
    background: rgba(24, 75, 139, 1) !important;
    color: #fff !important;
  }
}
</style>
