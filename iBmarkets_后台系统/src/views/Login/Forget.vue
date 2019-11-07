<template>
  <div>
    <!-- logo -->
    <div class="login_logo_box">
      <div class="login_logo">
        <img src="../../lkh_images/logo.png" alt />
      </div>
      <div class="login_logo_text">
        <!-- 忘记密码 -->
        <div>{{ $t('btn.forget') }}</div>
      </div>
    </div>
    <div class="login_box_bg">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-position="top"
        class="demo-ruleForm item_form"
      >
        <div class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="userName" :label="$t('form.userName')">
            <el-input :placeholder="$t('form.userName')" v-model="ruleForm.userName" clearable></el-input>
          </el-form-item>
          <!-- 手机号码 -->
          <el-form-item prop="phone" :label="$t('form.phone')" v-if="false">
            <el-input class="select_wrap" :placeholder="$t('form.phone')" v-model="ruleForm.phone">
              <el-select
                class="reset_select"
                v-model="phoneCode"
                slot="prepend"
                :placeholder="$t('form.please')"
              >
                <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 手机验证码 -->
          <el-form-item class="codeWrap" prop="code" :label="$t('form.code')">
            <el-input :placeholder="$t('form.code')" v-model="ruleForm.code">
              <template slot="append">
                <GetCode
                  class="codeBtn"
                  apiUrl="VERIFICATION_SENDCODERETRIEVEPASSWORD"
                  :mobile="ruleForm.userName"
                  :errTxt="$t('form.userName_reg')"
                  type="1"
                ></GetCode>
              </template>
            </el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item prop="newPassWord" :label="$t('form.newPassword')">
            <el-input
              type="password"
              :placeholder="$t('form.newPassword')"
              v-model="ruleForm.newPassword"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 再次输入新密码 -->
          <el-form-item prop="password3" :label="$t('form.password1')">
            <el-input
              type="password"
              :placeholder="$t('form.password1')"
              v-model="ruleForm.password3"
              clearable
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="login_btn_box">
        <div class="login_btn">
          <!-- 修改密码 -->
          <el-button
            @click="submitForm('ruleForm')"
            class="login-btn"
            type="primary"
          >{{ $t('title.password') }}</el-button>
        </div>
        <div class="login_back" @click="changePage">
          <!-- 返回 -->
          <a>{{ $t('btn.return') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import GetCode from "../../components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Login_forget",
  inject: ["p"],
  mixins: [MyValidate, MessageBox],
  components: {
    GetCode
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("form.password1_reg"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("form.password1_reg1"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "", // 用户名
        code: "", // 手机验证码
        newPassword: "", // 新密码
        password3: "", // 确认密码
        phone: "", // 手机号码
        codeType: 1,
        passwordType: 1
      },
      rules: {
        userName: [
          { required: true, message: "form.userName_reg", trigger: "blur" }
        ],
        code: [{ required: true, message: "form.code_reg", trigger: "blur" }],
        newPassword: [
          { required: true, message: "form.password_reg", trigger: "blur" }
        ],
        password3: [{ validator: validatePass2, trigger: "blur" }]
      },
      phoneCode: "+86", // 手机类型编码
      list: comData.phone // 手机号码类型
    };
  },
  methods: {
    changePage() {
      let vm = this;
      vm.p.pageType = "login";
    },
    // 找回登录密码
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = {
            account: vm.ruleForm.userName,
            newPassword: vm.ruleForm.newPassword,
            code: vm.ruleForm.code,
            codeType: vm.ruleForm.codeType
          };
          vm.$api.USER_RETRIEVEPASSWORD(params).then(res => {
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text19"), "success");
              vm.p.pageType = "login";
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
.login_logo_box {
  width: 3.65rem;
  padding-top: 20px;
  margin: 0 auto;
  .login_logo {
    width: 1.51rem;
    height: 0.32rem;
    margin: 0 auto;
    margin-bottom: 0.43rem;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .login_logo_text {
    text-align: center;
    color: rgba(36, 69, 124, 1);
    margin-bottom: 0.37rem;
    div {
      font-size: 0.14rem;
      line-height: 0.24rem;
    }
    p {
      font-size: 0.12rem;
      line-height: 0.24rem;
      color: rgba(36, 69, 124, 1);
    }
  }
}
</style>
