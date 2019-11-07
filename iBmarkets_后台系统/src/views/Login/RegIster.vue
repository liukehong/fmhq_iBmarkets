<template>
  <div class="Login_register">
    <!-- logo -->
    <div class="login_logo_box">
      <div class="login_logo">
        <img src="../../lkh_images/logo.png" alt />
      </div>
      <div class="login_logo_text">
        <!-- 注册 -->
        <div>{{ $t('title.register') }}</div>
        <!-- 填写您的详细信息完成注册。 -->
        <p>{{ $t('Login.tips') }}</p>
      </div>
    </div>
    <div class="login_box_bg">
      <el-form class="demo-ruleForm item_form">
        <div class="login_form">
          <el-form-item prop="account" :label="$t('form.recommender')+'：'">
            <div style="color: #000;">{{ account }}</div>
          </el-form-item>
        </div>
      </el-form>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        v-show="step==1"
        label-position="top"
        class="demo-ruleForm item_form"
      >
        <div class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="account" :label="$t('form.userName1')">
            <el-input
              size="small"
              :placeholder="$t('form.userName1')"
              v-model="ruleForm.account"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 昵称 -->
          <el-form-item prop="nickname" :label="$t('form.nickName1')">
            <el-input
              size="small"
              :placeholder="$t('form.nickName1')"
              v-model="ruleForm.nickname"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" :label="$t('form.password')">
            <el-input
              size="small"
              type="password"
              :placeholder="$t('form.password')"
              v-model="ruleForm.password"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 重复密码 -->
          <el-form-item prop="password2" :label="$t('form.password1')">
            <el-input
              size="small"
              type="password"
              :placeholder="$t('form.password1')"
              v-model="ruleForm.password2"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item prop="phone" :label="$t('form.phone')">
            <el-input
              size="small"
              class="select_wrap"
              :placeholder="$t('form.phone')"
              v-model="ruleForm.phone"
            >
              <el-select
                class="reset_select"
                v-model="ruleForm.phoneAreaCode"
                slot="prepend"
                :placeholder="$t('form.please')"
              >
                <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item class="codeWrap" prop="codePhone" :label="$t('form.code')">
            <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm.codePhone">
              <template slot="append">
                <GetCode
                  class="codeBtn"
                  apiUrl="VERIFICATION_SENDCODE"
                  :phoneCode="ruleForm.phoneAreaCode"
                  :mobile="ruleForm.phone"
                  type="1"
                ></GetCode>
              </template>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-form
        :model="ruleForm2"
        ref="ruleForm2"
        v-show="step==2"
        label-position="top"
        class="demo-ruleForm item_form"
      >
        <div class="login_form">
          <!-- 身份证 -->
          <el-form-item :label="$t('form.idCard')">
            <el-input size="small" :placeholder="$t('form.idCard')" v-model="ruleForm2.idCard"></el-input>
          </el-form-item>
          <!-- 微信号 -->
          <el-form-item :label="$t('form.spare2')">
            <el-input size="small" :placeholder="$t('form.spare2')" v-model="ruleForm2.spare2"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item prop="email" :label="$t('form.email')">
            <el-input
              size="small"
              :placeholder="$t('form.email')"
              v-model="ruleForm2.email"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 邮箱验证码 -->
          <el-form-item class="codeWrap" prop="codeEmail" :label="$t('form.code')">
            <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm2.codeEmail">
              <template slot="append">
                <GetCode
                  class="codeBtn"
                  apiUrl="VERIFICATION_SENDCODE"
                  :email="ruleForm2.email"
                  type="2"
                ></GetCode>
              </template>
            </el-input>
          </el-form-item>
          <!-- 支付密码 -->
          <el-form-item prop="securitypassword" v-if="false">
            <el-input
              size="small"
              type="password"
              placeholder="请输入支付密码"
              v-model="ruleForm2.securitypassword"
              clearable
            ></el-input>
          </el-form-item>
          <div style="padding-top: .3rem; text-align:center;">
            <!-- 我已阅读并接受 -->
            <el-checkbox
              style="color: #fff!important; margin-right: 0px;"
              v-model="checked_btn"
            >{{ $t('user_member.text5') }}</el-checkbox>
            <!-- 《风险披露声明》 -->
            <a
              href="../../../../static/IBmarkets协议.pdf"
              target="view_window"
              style="font-size: 14px; color: #409EFF; cursor:pointer; textDecoration:none;"
            >{{ $t('user_member.text6') }}</a>
          </div>
        </div>
      </el-form>
      <!-- 第一步 -->
      <div class="login_btn_box" v-show="step == 1">
        <div class="login_btn">
          <!-- 下一步 -->
          <el-button
            @click="submitForm('ruleForm')"
            class="login-btn"
            type="primary"
          >{{ $t('btn.next') }}</el-button>
          <!-- 注册 -->
          <!-- <el-button @click="fnRegSubmit('ruleForm')" class="login-btn" type="success">{{ $t('btn.register') }}</el-button> -->
        </div>
        <div class="login_back" @click="changePage">
          <!-- 有账号去登录 -->
          <a>{{ $t('btn.exist') }}</a>
        </div>
      </div>
      <!-- 第二步 -->
      <div class="login_btn_box" v-show="step == 2">
        <div class="login_btn">
          <el-button
            :disabled="!checked_btn"
            @click="fnRegSubmit('ruleForm2')"
            class="login-btn"
            type="primary"
          >{{ $t('btn.register') }}</el-button>
        </div>
        <div class="login_back" @click="step=1">
          <a>{{ $t('btn.prve') }}</a>
        </div>
      </div>
    </div>

    <el-dialog
      @close="fnClose"
      center
      :title="$t('dialog.text1')+ruleForm.account+'！'+$t('dialog.text2')"
      :visible.sync="dialogVisible"
      width="3.5rem"
    >
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div style="width: 150px; margin: 0 auto;">
            <img src="../../lkh_images/logo.png" alt />
          </div>
        </el-col>
        <el-col
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
          style="text-align:center; margin-top: 20px;"
        >
          <div style="padding-bottom: .1rem; overflow: hidden;">
            <p
              style="width: 50%; text-align: right; float: left; height: .2rem; line-height: .2rem;"
            >{{ $t('dialog.text3') }}</p>
            <p
              style="width: 50%; float: left; height: .2rem; line-height: .2rem; text-align: left; padding-left: .1rem;"
            >{{ filtername }}</p>
          </div>
          <div style="overflow: hidden;">
            <p
              style="width: 50%; text-align: right; float: left; height: .2rem; line-height: .2rem;"
            >{{ $t('dialog.text4') }}</p>
            <p
              style="width: 50%; float: left; height: .2rem; line-height: .2rem; text-align: left; padding-left: .1rem;"
            >{{ ruleForm.account }}</p>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>
<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import axios from "axios";
import GetCode from "../../components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Login_register",
  inject: ["p"],
  mixins: [MyValidate, MessageBox],
  components: {
    GetCode
  },
  computed: {
    filtername: function() {
      let vm = this;
      let name = vm.account;
      return name[0] + "***" + name[name.length - 1];
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // 请再次输入密码
        callback(new Error(this.$t("form.password1_reg")));
      } else if (value !== this.ruleForm.password) {
        // 两次密码输入不一致
        callback(new Error(this.$t("form.password1_reg1")));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      checked_btn: false,
      account: "",
      step: 1,
      // phoneCode: '+86', // 手机类型编码
      list: comData.phone, // 手机号码类型
      ruleForm: {
        account: "", // 用户名
        password: "", // 密码
        password2: "", // 再次输入密码
        phone: "", // 手机号
        phoneAreaCode: "+86", // 手机区号
        codePhone: "", // 验证码
        email: "" // 邮箱
      },
      userCode: this.p.inviteSuper, // 注册码
      ruleForm2: {
        email: "", // 邮箱
        securitypassword: "", // 支付密码
        codeEmail: "", // 邮箱验证码
        idCard: "", // 身份证
        spare2: "" // 微信号
      },
      rules: {
        // 请输入用户名
        account: [
          { required: true, message: "form.userName_reg", trigger: "blur" }
        ],
        // 请输入昵称
        nickname: [
          { required: true, message: "form.nickname_reg", trigger: "blur" }
        ],
        // 请输入密码
        password: [
          { required: true, message: "form.password_reg", trigger: "blur" }
        ],
        // 请再次输入密码
        password2: [{ validator: validatePass2, trigger: "blur" }],
        // 请输入手机号
        phone: [{ required: true, message: "form.phone_reg", trigger: "blur" }],
        // 请输入验证码
        codePhone: [
          { required: true, message: "form.code_reg", trigger: "blur" }
        ],
        // 请输入邮箱验证码
        codeEmail: [
          { required: true, message: "form.code_reg", trigger: "blur" }
        ],
        // 邮箱
        email: [{ required: true, message: "form.email_reg", trigger: "blur" }],
        securitypassword: [
          { required: true, message: "请输入支付密码", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    let vm = this;
    if (!!!vm.p.account) {
      this.fnGetInvite();
    } else {
      vm.account = vm.p.account;
    }
  },
  methods: {
    // 获取推荐人
    fnGetInvite() {
      let vm = this;
      vm.$api
        .USER_GETCODEUSER({
          code: vm.userCode
        })
        .then(res => {
          vm.account = res.data.account;
        });
    },
    changePage() {
      let vm = this;
      vm.p.pageType = "login";
    },
    // 下一步 step=2
    submitForm(formName) {
      let vm = this;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          vm.step = 2;
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    },
    // 关闭模态框
    fnClose() {
      let vm = this;
      vm.p.pageType = "login";
    },
    // 注册提交
    fnRegSubmit(formName) {
      let vm = this;
      let params = {};
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = {
            account: vm.ruleForm.account,
            password: vm.ruleForm.password,
            phoneAreaCode: vm.ruleForm.phoneAreaCode,
            phone: vm.ruleForm.phone,
            codePhone: vm.ruleForm.codePhone,
            userCode: vm.userCode,
            nickname: vm.ruleForm.nickname,
            email: vm.ruleForm2.email,
            codeEmail: vm.ruleForm2.codeEmail,
            idCard: vm.ruleForm2.idCard,
            spare2: vm.ruleForm2.spare2
          };
          vm.p.loading = true;
          vm.$api.USER_RECOMMENDREDISTERED(params).then(res => {
            vm.p.loading = false;
            if (res.code == 0) {
              // vm.fnOpenMessageBox(vm.$t("alert.text9"), "success");
              vm.dialogVisible = true;
              // vm.p.pageType = "login";
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
.el-input-group__prepend {
  // padding-top: 1px;
  height: 32px;
}
.Login_register {
  .el-dialog__footer {
    padding: 0px !important;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #dbe2ec !important;
  }
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
  .remenberBtn {
    margin-top: 0.18rem;
  }
  .regBtn {
    overflow: hidden;
    margin-top: 0.43rem !important;
  }
}
</style>
