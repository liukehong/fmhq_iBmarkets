<template>
  <div style="overflow: hidden;" class="my_account_email_phone">
    <!-- 修改邮箱电话 -->
    <div class="item_title">{{ $t('title.emailPhone') }}</div>
    <div class="item_box">
      <div class="item_list_box">
        <el-form
          label-width="1.8rem"
          class="item_form"
          :label-position="screenSize == 1?'left':'left'"
        >
          <!-- 类型 -->
          <el-form-item :label="$t('form.type')">
            <el-radio-group v-model="ruleForm.type">
              <el-radio :label="1">手机</el-radio>
              <el-radio :label="2">邮箱</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 原手机号 -->
          <el-form-item v-if="ruleForm.type == 1" :label="$t('form.oldPhone')">
            <div>{{ user.phoneAreaCode+user.phone }}</div>
          </el-form-item>
          <!-- 原邮箱 -->
          <el-form-item v-if="ruleForm.type == 2" :label="$t('form.oldEmail')">
            <div>{{ user.email||'--' }}</div>
          </el-form-item>
        </el-form>
        <el-form
          :label-position="screenSize == 1?'left':'top'"
          :model="ruleForm"
          ref="ruleForm"
          label-width="1.8rem"
          class="demo-ruleForm item_form"
          v-if="next == 0"
        >
          <el-form-item :label="$t('form.code')" prop="code">
            <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm.code">
              <template slot="append">
                <GetCode apiUrl="VERIFICATION_SENDCODES" :type="ruleForm.type"></GetCode>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <!-- 下一步 -->
            <el-button
              size="small"
              style="width:100%; margin-top: .1rem;"
              type="success"
              @click="submitForm('ruleForm')"
            >{{ $t('btn.next') }}</el-button>
          </el-form-item>
        </el-form>
        <NextPage :oldCode="ruleForm.code" :type="ruleForm.type" @changeNext="fnNext" v-if="next == 1"></NextPage>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import GetCode from "@/components/GetCode";
import GetCode1 from '@/components/GetCode'
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
import NextPage from "./next";
export default {
  name: "my_account_email_phone",
  mixins: [WatchScreen, GetUserInfo, MyValidate,MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      formType: "phone",
      next: 0,
      user: {
        phone: "", // 手机号
        phoneAreaCode: "", // 手机号区号
        email: "" // 邮箱
      },
      ruleForm: {
        code: "", // 验证码
        type: 1 // 验证类型 1手机 2邮箱
      },
      rules: {
        // 请输入验证码
        code: [{ required: true, message: "form.code_reg", trigger: "blur" }]
      }
    };
  },
  components: {
    GetCode,
    NextPage,
    GetCode1
  },
  mounted: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    // 控制进度
    fnNext() {
      let vm = this;
      vm.next = 0;
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 获取个人用户信息
      vm.p.fnGetNewInfo().then(res => {
        function keyObj(name = {}, data = {}) {
          for (let key in vm[name]) {
            vm[name][key] = data[key];
          }
        }
        keyObj("user", res[0]); // 遍历可修改的信息
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.VERIFICATION_CODEVERIFICATIONS(params).then(res => {
            if (res.code == 0) {
              vm.next = 1;
            } else {
              vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            }
            vm.$main.loading = false;
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
.my_account_email_phone {
  color: #000;
  .el-form-item__label {
    color: #000 !important;
  }
}
</style>
