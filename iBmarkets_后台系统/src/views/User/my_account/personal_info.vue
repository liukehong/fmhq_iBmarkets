<template>
  <div class="personal_info" style="overflow: hidden;">
    <!-- 个人信息 -->
    <div class="item_title">{{ $t('title.personalInfo') }}</div>
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
            <el-col
              :class="screenSize == 1?'':'p_r'"
              style="padding-right: 20px;"
              class="col-item"
              :span="24"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="12"
              :xl="12"
            >
              <!-- 用户名 -->
              <el-form-item :label="$t('form.userName')" prop="account">
                <el-input
                  :disabled="true"
                  size="small"
                  :placeholder="$t('form.userName')"
                  v-model="ruleForm.account"
                ></el-input>
              </el-form-item>
              <!-- 国家 -->
              <el-form-item size="small" :label="$t('form.country')" style="width:100%;">
                <el-select
                  v-model="ruleForm.nation"
                  :placeholder="$t('form.country')"
                  @change="(code)=>{fnChangeCity(1,code)}"
                >
                  <el-option
                    v-for="item in country"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 省份 -->
              <el-form-item :label="$t('form.province')">
                <el-select
                  size="small"
                  v-model="ruleForm.province"
                  :placeholder="$t('form.province')"
                  @change="(code)=>{fnChangeCity(2,code)}"
                >
                  <el-option
                    v-for="item in province"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 城市 -->
              <el-form-item :label="$t('form.city')">
                <el-select v-model="ruleForm.city" :placeholder="$t('form.city')" size="small">
                  <el-option
                    v-for="item in city"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :class="screenSize == 1?'':'p_l'"
              style="padding-left: 20px;"
              class="col-item"
              :span="24"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="12"
              :xl="12"
            >
              <!-- btc地址 -->
              <el-form-item v-if="false" :label="$t('form.btc')" prop="btcAddress">
                <el-input size="small" :placeholder="$t('form.btc')" v-model="ruleForm.btcAddress"></el-input>
              </el-form-item>
              <!-- eth地址 -->
              <el-form-item v-if="false" :label="$t('form.eth')" prop="ethAddress">
                <el-input size="small" :placeholder="$t('form.eth')" v-model="ruleForm.ethAddress"></el-input>
              </el-form-item>
              <!-- 身份证 -->
              <el-form-item :label="$t('form.idCard')" prop="idCard">
                <el-input size="small" :placeholder="$t('form.idCard')" v-model="ruleForm.idCard"></el-input>
              </el-form-item>
              <!-- 微信号 -->
              <el-form-item v-if="phoneAreaCode == '+86'" :label="$t('form.spare2')">
                <el-input size="small" :placeholder="$t('form.spare2')" v-model="ruleForm.spare2"></el-input>
              </el-form-item>
              <!-- usdt地址 -->
              <el-form-item :label="$t('form.usdt')" prop="usdtAddress">
                <el-input
                  size="small"
                  :placeholder="$t('form.usdt')"
                  v-model="ruleForm.usdtAddress"
                ></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item :label="$t('form.code')" prop="code">
                <el-input size="small" :placeholder="$t('form.code')" v-model="ruleForm.code">
                  <template slot="append">
                    <GetCode apiUrl="VERIFICATION_SENDCODES" type="1"></GetCode>
                  </template>
                </el-input>
              </el-form-item>
              <!-- 更改信息 -->
              <el-form-item>
                <el-button
                  size="small"
                  style="width: 100%;"
                  type="success"
                  @click="submitForm('ruleForm')"
                >{{ $t('btn.changeInfo') }}</el-button>
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
import GetCode from "@/components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "personal_info",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      phoneAreaCode: "",
      ruleForm: {
        account: "", // 用户名
        idCard: "", // 身份证
        spare2: "", // 微信号
        nation: "", // 国家
        province: "", // 省份
        city: "", // 城市
        btcAddress: "", // btc地址
        ethAddress: "", // eth地址
        usdtAddress: "", // usdt地址
        code: "" // 验证码
      },
      rules: {
        // 请输入用户名
        account: [
          { required: true, message: "form.userName_reg", trigger: "blur" }
        ],
        // 请输入身份证
        idCard: [
          { required: true, message: "form.idCard_reg", trigger: "blur" }
        ],
        // 请输入验证码
        code: [{ required: true, message: "form.code_reg", trigger: "blur" }]
      },
      country: [], // 国家列表
      province: [], // 省份列表
      city: [], // 城市列表
      langType: "zh"
    };
  },
  components: {
    GetCode
  },
  mounted: function() {
    let vm = this;
    // 判断是中文还是英文
    if (window.localStorage.getItem("locale")) {
      vm.langType = window.localStorage.getItem("locale");
    }
    vm.fnInit();
  },
  methods: {
    // 页面初始化
    fnInit() {
      let vm = this;
      // 先获取国家信息
      vm.fnGetCityList(0);
      // 获取个人用户信息
      vm.p.fnGetNewInfo().then(res => {
        function keyObj(name = {}, data = {}) {
          for (let key in vm[name]) {
            vm[name][key] = data[key];
          }
        }
        keyObj("ruleForm", res[0]); // 遍历可修改的信息

        vm.phoneAreaCode = res[0].phoneAreaCode; // 手机区间号

        // 省份
        if (!!res[0].nation) {
          vm.fnGetCityList(1, res[0].nation);
        }
        // 城市
        if (!!res[0].province) {
          vm.fnGetCityList(2, res[0].province);
        }
      });
    },
    // 获取城市列表数据  type 0 国家 1省份 2城市  code 编码  查询国家不需要编码
    fnGetCityList(type, code = "") {
      let vm = this;
      let arrs = ["country", "province", "city"];
      let ajaxData = {
        code: code,
        type: vm.langType == "zh" ? 1 : 2
      };
      vm.$api.EXHIBITION_GETCOUNTRY(ajaxData).then(res => {
        if (res.code == 0) {
          vm[arrs[type]] = res.data;
        }
      });
    },
    // 城市三级联动select
    fnChangeCity(type, code) {
      // type代表要更新的列表 0国家 1省份 2城市  code 其中获取国家不需要
      let vm = this;
      if (type == 1) {
        vm.province = [];
        vm.city = [];
        vm.ruleForm.province = "";
        vm.ruleForm.city = "";
      } else if (type == 2) {
        vm.city = [];
        vm.ruleForm.city = "";
      }
      vm.fnGetCityList(type, code);
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.USER_UPDATEUSERINFO(params).then(res => {
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text2"), "success");
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
</style>
