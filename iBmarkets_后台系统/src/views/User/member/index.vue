<template>
  <transition name="fade">
    <div class="user_member" style="overflow: hidden;">
      <!-- 注册会员 -->
      <div class="item_title">{{ $t('title.regMember') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-row>
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
              <!-- 表单 -->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                class="demo-ruleForm item_form"
                label-width="1.6rem"
                :label-position="screenSize == 1?'left':'top'"
              >
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
                <!-- 登录密码 -->
                <el-form-item prop="password" :label="$t('form.password')">
                  <el-input
                    size="small"
                    type="password"
                    :placeholder="$t('form.password')"
                    v-model="ruleForm.password"
                    clearable
                  ></el-input>
                </el-form-item>
                <!-- 再次输入新密码 -->
                <el-form-item prop="password2" :label="$t('form.password1')">
                  <el-input
                    size="small"
                    type="password"
                    :placeholder="$t('form.password1')"
                    v-model="ruleForm.password2"
                    clearable
                  ></el-input>
                </el-form-item>

                <!-- 手机号码 -->
                <el-form-item prop="phone" :label="$t('form.phone')">
                  <el-input
                    size="small"
                    class="select_wrap"
                    :placeholder="$t('form.phone')"
                    v-model="ruleForm.phone"
                  >
                    <!-- 请选择 -->
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
                <!-- 邮箱 -->
                <el-form-item prop="email" :label="$t('form.email')">
                  <el-input
                    size="small"
                    :placeholder="$t('form.email')"
                    v-model="ruleForm.email"
                    clearable
                  ></el-input>
                </el-form-item>
                <!-- 配套选择 -->
                <el-form-item :label="$t('user_member.text1')" prop="matchingId">
                  <el-select
                    size="small"
                    @change="fnSelectChange"
                    v-model="ruleForm.matchingId"
                    :placeholder="$t('user_member.text1')"
                  >
                    <el-option
                      v-for="item in matchingList"
                      :key="item.matchingId"
                      :value="item.matchingId"
                      :label="item.matchingName+'  '+item.matchingMoneyLowest"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 金额 -->
                <el-form-item :label="$t('user_product.text13')">
                  <div style="color: #000;">{{ ruleForm.rp||'--' }}</div>
                </el-form-item>
                <!-- cp 现金钱包 -->
                <el-form-item v-if="false" prop="account" :label="$t('user_member.text3')">
                  <el-input-number
                    size="small"
                    v-model="ruleForm.cp"
                    controls-position="left"
                    :min="0"
                    :max="+cp"
                  ></el-input-number>
                  <span class="moneyBox">{{ cp|FORMATTED_NUMBER }}</span>
                </el-form-item>
                <!-- rp 钱包余额 -->
                <el-form-item prop="account" :label="$t('user_member.text7')">
                  <!-- <el-input-number
                    size="small"
                    v-model="ruleForm.rp"
                    controls-position="left"
                    :min="0"
                    :max="+rp"
                  ></el-input-number>
                  <span class="moneyBox">{{ rp|FORMATTED_NUMBER }}</span>-->
                  <div style="color: #000;">{{ rp|FORMATTED_NUMBER }}</div>
                </el-form-item>
                <!-- 支付密码 -->
                <el-form-item prop="password" :label="$t('admin_transfer.text4')">
                  <el-input
                    size="small"
                    type="password"
                    :placeholder="$t('admin_transfer.text4')"
                    v-model="ruleForm.payPassword"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
              <!-- 提交 -->
              <el-button
                size="small"
                type="primary"
                @click="submitForm('ruleForm')"
              >{{ $t('btn.submit') }}</el-button>
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
  name: "user_member",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("form.password1_reg")));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t("form.password1_reg1")));
      } else {
        callback();
      }
    };
    return {
      matchingList: [], // 配套列表
      list: comData.phone, // 手机号码类型
      cp: 0,
      rp: 0,
      ruleForm: {
        account: "", // 用户名
        password: "", // 密码
        password2: "", // 再次输入密码
        phone: "", // 手机号
        phoneAreaCode: "+86", // 手机区号
        matchingId: "", // 配套ID
        // cp: "",
        rp: "",
        payPassword: "", // 支付密码
        nickname: "", // 昵称
        email: "" // 邮箱
      },
      rules: {
        account: [
          { required: true, message: "form.userName_reg", trigger: "blur" }
        ],
        // 请输入昵称
        nickname: [
          { required: true, message: "form.nickname_reg", trigger: "blur" }
        ],
        // 请输入邮箱
        email: [{ required: true, message: "form.email_reg", trigger: "blur" }],
        password: [
          { required: true, message: "form.password_reg", trigger: "blur" }
        ],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ required: true, message: "form.phone_reg", trigger: "blur" }],
        // 请选择配套
        matchingId: [
          {
            type: "number",
            required: true,
            message: "user_member.text2",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    let vm = this;
    vm.getMatchingList(); // 获取所有配套
    vm.fnGetWallet(); // 获取用户钱包信息
  },
  methods: {
    // 获取用户钱包信息
    fnGetWallet() {
      let vm = this;
      vm.$api.WALLET_GETUSERWALLET().then(res => {
        if (res.code == 0) {
          vm.cp = res.data.walletCp;
          vm.rp = res.data.walletRp;
        }
      });
    },
    // 选中对应配套
    fnSelectChange(data) {
      let vm = this;
      for (var i = 0; i < vm.matchingList.length; i++) {
        if (vm.matchingList[i].matchingId == data) {
          vm.ruleForm.rp = vm.matchingList[i].matchingMoneyLowest;
        }
      }
    },
    // 获取所有配套信息
    getMatchingList() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.MATCHING_GETMATCHINGS().then(res => {
        vm.$main.loading = false;
        vm.matchingList = res.data;
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          // 判断是否有足够的余额
          if (parseInt(vm.rp) < parseInt(vm.ruleForm.rp)) {
            // RP钱包余额不足
            vm.fnOpenMessageBox(vm.$t("user_member.text8"), "error");
            return false;
          }
          params = Object.assign({}, vm.ruleForm);
          delete params.password2;
          vm.$main.loading = true;
          vm.$api.USER_REGISTERRDS(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text9"), "success");
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
.user_member {
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #dbe2ec !important;
  }
  .moneyBox {
    background: #32a8ee;
    display: inline-block;
    height: 32px;
    width: 1.2rem;
    text-align: center;
    line-height: 30px;
  }
}
</style>
