<template>
  <transition name="fade">
    <div class="product_upgrade" style="overflow: hidden;">
      <div class="item_list_box">
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
            <!-- 表单 -->
            <el-form
              style="margin-bottom: .2rem;"
              :model="ruleForm"
              ref="ruleForm"
              class="demo-ruleForm item_form"
              label-width="1.6rem"
              :label-position="screenSize == 1?'left':'top'"
            >
              <!-- 配套选择 -->
              <el-form-item :label="$t('user_member.text1')" prop="matchingId">
                <el-select
                  @change="fnSelectChange"
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
              <!-- 支付金额 -->
              <el-form-item :label="$t('user_product.text15')">
                <div style="color: #000;">{{ money }}</div>
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
              <!-- rp 注册钱包 -->
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
              <el-form-item prop="password" :label="$t('user_product.text16')">
                <el-input
                  autocomplete="new-password"
                  size="small"
                  type="password"
                  :placeholder="$t('user_product.text16')"
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
            <!-- 返回 -->
            <el-button size="small" @click="p.pageType = 'list'">{{ $t('btn.return') }}</el-button>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        center
        :title="$t('dialog.text5')"
        :visible.sync="dialogVisible"
        width="3.5rem"
        @close="fnClose"
      >
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div style="width: 150px; margin: 0 auto;">
              <img src="../../../../lkh_images/logo.png" alt />
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
              >{{ $t('dialog.text6') }}</p>
              <p
                style="width: 50%; float: left; height: .2rem; line-height: .2rem; text-align: left; padding-left: .1rem;"
              >{{ mt4Account }}</p>
            </div>
            <div style="overflow: hidden;">
              <p
                style="width: 50%; text-align: right; float: left; height: .2rem; line-height: .2rem;"
              >{{ $t('dialog.text7') }}</p>
              <p
                style="width: 50%; float: left; height: .2rem; line-height: .2rem; text-align: left; padding-left: .1rem;"
              >{{ matchingId }}</p>
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
  </transition>
</template>
<script>
import comData from "@/utils/data.js";
import MyValidate from "@/mixins/myValidate.js";
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "product_upgrade",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["p", "$main"],
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
      mt4Account: "",
      dialogVisible: false,
      matchingList: [], // 配套列表
      matchingId: "",
      cp: 0,
      rp: 0,
      money: 0,
      ruleForm: {
        matchingId: "", // 配套等级
        userMatchingId: this.p.info.userMatchingId, // 配套ID
        cp: 0,
        rp: 0,
        payPassword: "" // 支付密码
      },
      rules: {
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
    // 关闭模态框
    fnClose() {
      let vm = this;
      vm.p.pageType = "list";
    },
    // 选中对应配套
    fnSelectChange(data) {
      let vm = this;
      for (var i = 0; i < vm.matchingList.length; i++) {
        if (vm.matchingList[i].matchingId == data) {
          vm.money =
            parseInt(vm.matchingList[i].matchingMoneyLowest) -
            parseInt(vm.p.info.isMoney);
          vm.matchingId = vm.matchingList[i].matchingId;
        }
      }
    },
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
    // 获取所有配套信息
    getMatchingList() {
      let vm = this;
      let arrs = [];
      vm.$main.loading = true;
      vm.$api.MATCHING_GETMATCHINGS().then(res => {
        vm.$main.loading = false;
        // 过滤数据
        res.data.forEach((item, index) => {
          if (item.matchingMoneyLowest > vm.p.info.isMoney) {
            arrs.push(item);
          }
        });
        vm.matchingList = arrs;
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          if (parseInt(vm.money) > parseInt(vm.rp)) {
            vm.fnOpenMessageBox(vm.$t("alert.text15"), "error");
            return false;
          }
          params = Object.assign({}, vm.ruleForm);
          delete params.matchingId;
          params.matchingId = vm.matchingId;
          params.rp = vm.money;
          vm.$main.loading = true;
          vm.$api.MATCHING_BUYMATCHINGS(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              // vm.fnOpenMessageBox(vm.$t("user_product.text17"), "success");
              // vm.p.pageType = "list";

              vm.mt4Account = res.data.mt4Account;
              vm.dialogVisible = true;
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
.product_upgrade {
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
