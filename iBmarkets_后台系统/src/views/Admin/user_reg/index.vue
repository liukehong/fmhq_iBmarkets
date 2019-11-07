<template>
  <transition name="fade">
    <div class="admin_user_reg" style="overflow: hidden;">
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
                <!-- 推荐账号 -->
                <el-form-item prop="parentAccount" :label="$t('form.recommender')">
                  <el-input
                    size="small"
                    :placeholder="$t('form.recommender')"
                    v-model="ruleForm.parentAccount"
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
                <!-- 证件号码 -->
                <el-form-item :label="$t('form.idCard')">
                  <el-input size="small" :placeholder="$t('form.idCard')" v-model="ruleForm.idCard"></el-input>
                </el-form-item>
                <!-- 微信号 -->
                <el-form-item :label="$t('form.spare2')">
                  <el-input size="small" :placeholder="$t('form.spare2')" v-model="ruleForm.spare2"></el-input>
                </el-form-item>
                <!-- 账号类型 -->
                <el-form-item :label="$t('form.accountType')">
                  <el-select
                    size="small"
                    v-model="ruleForm.jdgId"
                    @change="fnChangeSelect"
                    :placeholder="$t('form.please')"
                  >
                    <el-option :label="$t('filters.user_type0')" :value="0"></el-option>
                    <el-option :label="$t('filters.user_type1')" :value="1"></el-option>
                    <el-option :label="$t('filters.user_type2')" :value="2"></el-option>
                    <el-option :label="$t('filters.user_type3')" :value="3"></el-option>
                    <el-option :label="$t('filters.user_type4')" :value="4"></el-option>
                    <el-option :label="$t('filters.user_type5')" :value="5"></el-option>
                    <el-option :label="$t('filters.user_type100')" :value="100"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 配套选择 -->
                <el-form-item
                  :label="$t('user_member.text1')"
                  prop="matchingId"
                  v-if="ruleForm.jdgId == 3||ruleForm.jdgId == 4"
                >
                  <el-select
                    size="small"
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
                <el-form-item>
                  <!-- 提交 -->
                  <el-button
                    size="small"
                    type="primary"
                    @click="submitForm('ruleForm')"
                  >{{ $t('btn.submit') }}</el-button>
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
  name: "admin_user_reg",
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
      ruleForm: {
        account: "", // 用户名
        nickname: "", // 昵称
        parentAccount: "", // 推荐账号
        password: "", // 密码
        password2: "", // 再次输入密码
        phone: "", // 手机号
        phoneAreaCode: "+86", // 手机区号
        email: "", // 邮箱
        jdgId: 0, // 账号类型
        idCard: "", //身份证
        spare2: "", // 微信号
        matchingId: "" // 配套ID
      },
      rules: {
        account: [
          { required: true, message: "form.userName_reg", trigger: "blur" }
        ],
        email: [{ required: true, message: "form.email_reg", trigger: "blur" }],
        parentAccount: [
          { required: true, message: "form.recommender_reg", trigger: "blur" }
        ],
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
  },
  methods: {
    // 选择用户改变
    fnChangeSelect(data) {
      let vm = this;
      vm.ruleForm.matchingId = "";
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
          params = Object.assign({}, vm.ruleForm);
          delete params.password2;
          vm.$main.loading = true;
          vm.$api.USER_REGISTERED(params).then(res => {
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
.admin_user_reg {
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #dbe2ec !important;
  }
}
</style>
