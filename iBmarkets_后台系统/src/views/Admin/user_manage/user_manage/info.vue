<template>
  <div class="item_box member_list_info">
    <div class="item_list_box">
      <el-row>
        <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
          <el-form
            :model="ruleForm"
            :rules="rules"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 用户名 -->
            <el-form-item :label="$t('form.userName')">
              <div style="color: #000;">{{ ruleForm.userAccount }}</div>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item :label="$t('form.email')">
              <el-input size="small" :placeholder="$t('form.email')" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item :label="$t('form.sex')">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio :label="1">{{ $t('form.sex_boy') }}</el-radio>
                <el-radio :label="2">{{ $t('form.sex_girl') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 证件号码 -->
            <el-form-item :label="$t('form.idCard')">
              <el-input size="small" :placeholder="$t('form.idCard')" v-model="ruleForm.idCard"></el-input>
            </el-form-item>
            <!-- 微信号 -->
            <el-form-item :label="$t('form.spare2')">
              <el-input size="small" :placeholder="$t('form.spare2')" v-model="ruleForm.spare2"></el-input>
            </el-form-item>
            <!-- 国家 -->
            <el-form-item :label="$t('form.country')">
              <el-select
                size="small"
                style="width:100%;"
                v-model="ruleForm.nation"
                :placeholder="$t('form.country')"
                @change="(code)=>{fnChangeCity(1,code)}"
              >
                <el-option
                  v-for="item in nation"
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
                style="width:100%;"
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
              <el-select
                size="small"
                style="width:100%;"
                v-model="ruleForm.city"
                :placeholder="$t('form.city')"
              >
                <el-option
                  v-for="item in city"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item :label="$t('form.address')">
              <el-input
                size="small"
                :placeholder="$t('form.address')"
                v-model="ruleForm.residentialAddress"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="证件正面">
          <Upload
            parentName="member_list_info"
            pathName="ruleForm.cardUrlJust"
            :imageUrl="ruleForm.cardUrlJust"
          ></Upload>
        </el-form-item>
        <el-form-item label="证件反面">
          <Upload
            parentName="member_list_info"
            pathName="ruleForm.cardUrlBack"
            :imageUrl="ruleForm.cardUrlBack"
          ></Upload>
            </el-form-item>-->
            <!-- BTC地址 -->
            <el-form-item v-if="false" :label="$t('form.btc')">
              <el-input size="small" :placeholder="$t('form.btc')" v-model="ruleForm.btcAddress"></el-input>
            </el-form-item>
            <!-- ETH地址 -->
            <el-form-item v-if="false" :label="$t('form.eth')">
              <el-input size="small" :placeholder="$t('form.eth')" v-model="ruleForm.ethAddress"></el-input>
            </el-form-item>
            <!-- USDT地址 -->
            <el-form-item :label="$t('form.usdt')">
              <el-input size="small" :placeholder="$t('form.usdt')" v-model="ruleForm.usdtAddress"></el-input>
            </el-form-item>
            <!-- 团队等级 -->
            <el-form-item :label="$t('table.grade')">
              <el-input-number
                style="width:100%;"
                size="small"
                v-model="ruleForm.gradeId"
                controls-position="right"
                :min="0"
                :max="3"
              ></el-input-number>
            </el-form-item>
            <!-- 团队等级状态 -->
            <el-form-item :label="$t('table.gradeType')">
              <el-radio-group v-model="ruleForm.gradeStatus">
                <el-radio :label="0">{{ $t('form.grade_type0') }}</el-radio>
                <el-radio :label="1">{{ $t('form.grade_type1') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 用户状态 -->
            <el-form-item :label="$t('form.userStatus')">
              <el-select
                size="small"
                style="width:100%;"
                v-model="ruleForm.userStatus"
                :placeholder="$t('form.userStatus')"
              >
                <!-- 未激活 -->
                <el-option :label="$t('admin_memberList.text1')" :value="0"></el-option>
                <!-- 已激活 -->
                <el-option :label="$t('admin_memberList.text2')" :value="1"></el-option>
                <!-- 封号 -->
                <el-option :label="$t('admin_memberList.text3')" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <!-- 直推收益 -->
            <el-form-item :label="$t('table.profit')">
              <el-input-number
                :step="0.01"
                :step-strictly="true"
                style="width:100%;"
                size="small"
                v-model="ruleForm.profit"
                controls-position="right"
                :min="0"
                :max="0.05"
              ></el-input-number>
            </el-form-item>
            <!-- 收益层次 -->
            <el-form-item :label="$t('table.levelId')">
              <el-input-number
                :step="1"
                :step-strictly="true"
                style="width:100%;"
                size="small"
                v-model="ruleForm.levelId"
                controls-position="right"
                :min="0"
                :max="7"
              ></el-input-number>
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button
                size="small"
                type="primary"
                @click="submitForm('ruleForm')"
              >{{ $t('btn.submit') }}</el-button>
              <!-- 登录会员系统 -->
              <el-button
                size="small"
                type="primary"
                @click="fnEnterUserManage"
              >{{ $t('btn.enterMember') }}</el-button>
              <!-- 返回 -->
              <el-button size="small" @click="p.pageType = 'list'">{{ $t('btn.return') }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Upload from "@/components/Upload";
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "member_list_info",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      arrs: [],
      user: {
        mobile: "" // 手机号
      },
      ruleForm: {
        userId: "",
        userAccount: "", //登录账号
        email: "", // 邮箱
        sex: "", // 性别
        idCard: "", // 身份证
        nation: "", // 国家
        province: "", // 省份
        city: "", // 市
        residentialAddress: "", // 详细地址
        // btcAddress: "", // btcAddress地址
        // ethAddress: "", // ethAddress地址
        usdtAddress: "", // usdtAddress地址
        userStatus: 0, // 审核状态
        // cardUrlJust: "", // 身份证正面
        // cardUrlBack: "", // 身份证反面
        gradeId: "", // 团队等级
        spare2: "", // 微信号
        gradeStatus: '', // 用户等级状态
        profit: '', // 直推收益
        levelId: '', // 收益层次
      },
      rules: {},
      nation: [], // 国家列表
      province: [], // 省份列表
      city: [], // 城市列表
      code: "", // 验证码
      langType: "zh"
    };
  },
  components: {
    Upload
  },
  mounted: function() {
    let vm = this;
    // 判断是中文还是英文
    if (window.localStorage.getItem("locale")) {
      vm.langType = window.localStorage.getItem("locale");
    }
    vm.fnInit();
    vm.fnGetData();
  },
  methods: {
    // 获取用户权限
    fnGetData() {
      let vm = this;
      let arrs = [];
      vm.$main.loading = true;
      vm.$api
        .SYSTEM_GETUSERPERMISSIONALL({
          userId: vm.p.info.user_id
        })
        .then(res => {
          vm.$main.loading = false;
          res.data.forEach((item, index) => {
            if (item.userPermissionStatus == 1) {
              arrs.push(item.userPermissionNumber);
            }
          });
          vm.arrs = arrs;
        });
    },
    // 登录会员系统
    fnEnterUserManage() {
      let vm = this;
      let params = {
        account: vm.p.info.account
      };
      vm.$api.USER_LOGINTEST(params).then(res => {
        if (res.code == 0) {
          window.localStorage.setItem(
            "user_token",
            JSON.stringify(res.data.token)
          ); // 保存token
          window.localStorage.setItem(
            "user_info",
            JSON.stringify(res.data.user)
          ); // 保存用户信息
          window.localStorage.setItem(
            "user_permission",
            JSON.stringify(vm.arrs)
          ); // 保存用户权限
          vm.$router.push({ path: "/user/home" });
        } else {
          vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
        }
      });
    },
    fnInfo(data) {
      let vm = this;
      vm.ruleForm.userAccount = data.account;
      vm.ruleForm.email = data.email || "";
      vm.ruleForm.sex = data.sex;
      vm.ruleForm.idCard = data.id_card;
      vm.ruleForm.nation = data.nation;
      vm.ruleForm.province = data.province;
      vm.ruleForm.city = data.city;
      vm.ruleForm.residentialAddress = data.residential_address || "";
      // vm.ruleForm.btcAddress = data.btc_address;
      // vm.ruleForm.ethAddress = data.eth_address;
      vm.ruleForm.usdtAddress = data.usdt_address;
      vm.ruleForm.userStatus = data.user_status;
      vm.ruleForm.userId = data.user_id;
      vm.ruleForm.gradeId = data.grade_id;
      vm.ruleForm.spare2 = data.spare2;
      vm.ruleForm.gradeStatus = data.grade_status;
      vm.ruleForm.profit = data.profit;
      vm.ruleForm.levelId = data.level_id;
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 先获取国家信息
      vm.fnGetCityList(0);
      // 获取个人用户信息
      vm.fnInfo(vm.p.info);
      // 省份
      if (!!vm.p.info.nation) {
        vm.fnGetCityList(1, vm.p.info.nation);
      }
      // 城市
      if (!!vm.p.info.province) {
        vm.fnGetCityList(2, vm.p.info.province);
      }
    },
    // 获取城市列表数据  type 0 国家 1省份 2城市  code 编码  查询国家不需要编码
    // 1中文 2英文
    fnGetCityList(type, code = "") {
      let vm = this;
      let arrs = ["nation", "province", "city"];
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
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = {};
          for (var key in vm.ruleForm) {
            if (!!vm.ruleForm[key]) {
              params[key] = vm.ruleForm[key];
            }
          }
          delete params.userAccount;
          params.sex = vm.ruleForm.sex;
          params.gradeId = vm.ruleForm.gradeId;
          params.profit = vm.ruleForm.profit;
          params.levelId = vm.ruleForm.levelId;
          params.userStatus = vm.ruleForm.userStatus;
          params.spare2 = vm.ruleForm.spare2;
          params.gradeStatus = vm.ruleForm.gradeStatus;
          vm.$main.loading = true;
          vm.$api.USER_UPDATEUSERINFOSUPER(params).then(res => {
            vm.$main.loading = false;
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
.member_list_info {
  color: #000 !important;
}
</style>
