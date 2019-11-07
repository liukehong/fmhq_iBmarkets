<template>
  <transition name="fade">
    <div class="user_reg" style="overflow: hidden;">
      <div class="item_title">注册会员</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-row>
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <!-- 表单 -->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                class="demo-ruleForm item_form"
                label-width="1.2rem"
                :label-position="screenSize == 1?'left':'top'"
              >
                <el-form-item prop="account" label="选择配套">
                  <el-input size="small" placeholder="选择配套" v-model="ruleForm.account" clearable></el-input>
                </el-form-item>
                <el-form-item prop="account" label="收益比例">
                  <el-input size="small" placeholder="收益比例" v-model="ruleForm.account" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="success" @click="submitForm('ruleForm')">确认</el-button>
                </el-form-item>
              </el-form>
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
  name: "user_reg",
  mixins: [WatchScreen, MessageBox],
  data() {
    return {
      list: comData.phone, // 手机号码类型
      ruleForm: {
        account: "", // 用户名
        nickname: "", // 昵称
        superUserAcount: "", // 推荐账号
        password: "", // 密码
        password2: "", // 再次输入密码
        phone: "", // 手机号
        phoneAreaCode: "+86", // 手机区号
        email: "" // 邮箱
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        codePhone: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        securitypassword: [
          { required: true, message: "请输入支付密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$api.USER_UPDATEUSERINFOSUPER(params).then(res => {
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.success"), "success");
            } else {
              vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
