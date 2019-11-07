<template>
  <div class="Login_enter">
    <!-- logo -->
    <div class="login_logo_box">
      <div class="login_bogo" style="text-align:center;">
        <img src="../../lkh_images/logo.png" alt>
        <div style="padding-top: .12rem;">INTEGRATED BROKERS</div>
      </div>
    </div>
    <div class="login_box_bg">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-position="top"
        class="demo-ruleForm item_form"
        @keydown.enter.native="submitForm('ruleForm')"
      >
        <div class="login_form">
          <!-- 账号 -->
          <el-form-item :label="$t('form.account')" prop="account">
            <el-input
              size="small"
              :placeholder="$t('form.account')"
              v-model="ruleForm.account"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item :label="$t('form.password')" prop="password">
            <el-input
              size="small"
              type="password"
              :placeholder="$t('form.password')"
              v-model="ruleForm.password"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item :label="$t('form.code')" prop="capText">
            <el-input
              size="small"
              class="el-input-mixin"
              type="code"
              :placeholder="$t('form.code')"
              v-model="ruleForm.capText"
            ></el-input>
            <div class="img-box" @click="fnCaptcha">
              <img :src="captchaImg" alt>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="login_btn_box">
        <div class="login_btn">
          <!-- 登录 -->
          <el-button
            @click="submitForm('ruleForm')"
            class="login-btn"
            type="success"
          >{{ $t('btn.signIn') }}</el-button>
          <!-- 记住登录状态 -->
          <el-checkbox class="remenberBtn" v-model="checked">{{ $t('Login.remember') }}</el-checkbox>
          <!-- 注册 -->
          <el-button
            v-if="false"
            @click="fnOpenDialog"
            class="login-btn regBtn"
            type="primary"
          >{{ $t('btn.register') }}</el-button>
        </div>
        <div v-if="fnLoginType() != 1">
          <div class="login_a">
            <!-- 忘记密码 -->
            <a @click="changePage">{{ $t('btn.forget') }}</a>
            <!-- 注册 -->
            <a @click="fnOpenDialog">{{ $t('btn.register') }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐人id 模态框 -->
    <el-dialog
      class="myDialog"
      :title="$t('Login.recommender')"
      :visible.sync="dialogVisible"
      center
      width="3rem"
    >
      <el-form
        label-position="top"
        label-width="1.6rem"
        class="demo-ruleForm item_form reg_form"
        @keydown.enter.native="fnGoReg"
      >
        <!-- 推荐人 -->
        <el-form-item :label="$t('form.recommender')">
          <el-input size="small" :placeholder="$t('form.recommender_reg')" v-model="superUserId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- 去注册 -->
        <el-button size="small" type="primary" @click="fnGoReg">{{ $t('btn.toRegister') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import axios from "axios";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Login_enter",
  inject: ["p"],
  mixins: [MyValidate,MessageBox],
  data() {
    return {
      checked: false,
      loginType: this.fnLoginType(), // 0 用户  1管理员  2管理员2
      dialogVisible: false, // 模态框控制
      d: "", // 时间戳
      superUserId: "", // 推荐人ID
      value: "zh", // 语言种类
      captchaImg: "", // 验证码图片路径
      ruleForm: {
        account: "", // 用户名
        password: "", // 密码
        capText: "", // 图片验证码
        // type: 1, // 登录类型
        timestamp: "" // 时间戳
      },
      rules: {
        // 请输入验证码
        capText: [
          { required: true, message: "form.code_reg", trigger: "blur" }
        ],
        // 请输入密码
        password: [
          { required: true, message: "form.password_reg", trigger: "blur" }
        ],
        // 请输入账号
        account: [
          { required: true, message: "form.account_reg", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnCaptcha();
    vm.fnInit();
  },
  methods: {
    fnInit() {
      let vm = this;
      let storageName = vm.fnLoginType() == 1 ? "adminEnter" : "userEnter";
      if (!!window.localStorage.getItem(storageName)) {
        let data = JSON.parse(window.localStorage.getItem(storageName));
        vm.ruleForm.account = data.account;
        vm.ruleForm.password = data.password;
        vm.checked = data.checked;
      }
    },
    fnLoginType() {
      let type;
      if (this.$route.matched[0].name == "admin") {
        type = 1;
      } else {
        type = 0;
      }
      return type;
    },
    changePage() {
      let vm = this;
      vm.p.pageType = "forget";
    },
    // 打开模态框
    fnOpenDialog() {
      let vm = this;
      this.dialogVisible = true;
      vm.superUserId = ""; // 清空父级ID
    },
    // 去注册
    fnGoReg() {
      let vm = this;
      // vm.p.pageType = 'register';
      if (!!!vm.superUserId) {
        // 请输入推荐人
        vm.fnOpenMessageBox(vm.$t("form.recommender_reg"), "error");
        return false;
      }
      vm.p.loading = true;
      vm.$api
        .USER_GETUSERCODE(vm.superUserId)
        .then(res => {
          vm.p.loading = false;
          if (res.code == 0) {
            vm.p.inviteSuper = res.data.userCode;
            vm.p.pageType = "register";
            vm.dialogVisible = false;
          } else {
            vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
          }
        })
        .catch(err => {
          // 内部错误
          vm.fnOpenMessageBox(vm.$t("alert.error"), "error");
        });
    },
    // 登录
    submitForm(formName) {
      let vm = this;
      let params; // 参数
      let pathName = vm.loginType == 0 ? "USER_LOGIN" : "USER_LOGINADMIN"; //请求接口路径 0 用户 1管理员
      let tokenName = "user_token"; // 根据不同身份保存token user_token 普通用户  admin_token 管理员
      let infoName = "user_info"; // 用户详情

      let permissionName = "user_permission"; // 权限   user_permission 普通用户 admin_permission 管理员

      let _url = "/user/home"; // 登录之后的跳转页面地址
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm, {
            timestamp: vm.d + ""
          });
          if (vm.loginType == 1) {
            // 管理员
            delete params.type;
            tokenName = "admin_token";
            infoName = "admin_info";
            permissionName = "admin_permission";
            _url = "/admin/user_manage";
          }
          vm.p.loading = true;
          vm.$api[pathName](params).then(res => {
            vm.p.loading = false;
            if (res.code == 0) {
              window.localStorage.setItem(
                tokenName,
                JSON.stringify(res.data.token)
              ); // 保存token
              window.localStorage.setItem(
                infoName,
                JSON.stringify(res.data.user)
              ); // 保存用户信息
              window.localStorage.setItem(
                "novice",
                JSON.stringify(res.data.novice)
              ); // 保存新手指南
              window.localStorage.setItem(
                permissionName,
                JSON.stringify(res.data.userPermissions)
              ); // 保存权限
              axios.defaults.headers.token = res.data.token; // 设置请求头
              let storageName = vm.loginType == 1 ? "adminEnter" : "userEnter"; // 判断类型
              if (!!vm.checked) {
                // 记住登录状态
                window.localStorage.setItem(
                  storageName,
                  JSON.stringify({
                    account: vm.ruleForm.account,
                    password: vm.ruleForm.password,
                    checked: vm.checked
                  })
                );
              } else {
                window.localStorage.removeItem(storageName);
              }
              vm.$router.push({ path: _url });
            } else {
              vm.fnCaptcha();
              vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            }
          });
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    },
    // 获取图片验证码
    fnCaptcha() {
      let vm = this;
      vm.d = +new Date();
      vm.ruleForm.capText = "";
      vm.captchaImg = `${comData.path}/exhibition/getVC?timestamp=${vm.d}`;
    }
  }
};
</script>
<style lang="scss">
.Login_enter {
  .myDialog {
    .item_form .el-form-item__label {
      color: #fff !important;
    }
  }
  .login_logo_box {
    // width: 3.65rem;
    padding-top: 30px;
    .login_bogo {
      margin: 0 auto;
      margin-bottom: 0.43rem;
      overflow: hidden;
      img {
        margin: 0 auto;
        display: block;
        width: 1.51rem;
        height: 0.32rem;
        overflow: hidden;
      }
      div {
        color: rgba(138, 138, 138, 1);
        font-size: 0.12rem;
      }
    }
  }
  .remenberBtn {
    margin-top: 0.18rem;
  }
  .regBtn {
    overflow: hidden;
    margin-top: 0.43rem !important;
  }
}
</style>
