<template>
  <transition name="fade">
    <div
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="transfer_manage"
      style="overflow: hidden;"
    >
      <!-- 财务转账 -->
      <div class="item_title">{{ $t('title.transferManage') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <!-- 币种类型 -->
          <el-row class="paylist1">
            <el-col
              v-for="item in walletTypeList"
              :key="item.type"
              class="col-item"
              :span="24"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="10"
              :xl="6"
            >
              <div class="aItem" :class="walletType==item.type?[item.type,'active2']:[item.type,'']"  @click="walletType = item.type">
                <div class="right_icon" :class="walletType==item.type?'active':''"></div>
                <p>{{ item.name }}</p>
                <p>${{ item.money|FORMATTED_NUMBER }}</p>
              </div>
            </el-col>
          </el-row>
          <!-- 表单 -->
          <el-row>
            <el-col :span="24" :xs="24" :sm="24" :md="16" :lg="12" :xl="6">
              <el-form
                :model="ruleForm"
                :label-position="screenSize == 1?'left':'top'"
                ref="ruleForm"
                label-width="1.6rem"
                class="demo-ruleForm item_form"
              >
                <!-- 对方用户名 -->
                <el-form-item :label="$t('form.toAccount')" prop="toAccount">
                  <el-input
                    size="small"
                    :placeholder="$t('form.toAccount')"
                    v-model="ruleForm.toAccount"
                  ></el-input>
                </el-form-item>
                <!-- 金额 -->
                <el-form-item :label="$t('form.money')" prop="transferMoney">
                  <el-input-number
                    style="width: 100%;"
                    size="small"
                    v-model="ruleForm.transferMoney"
                    :min="0"
                    :label="$t('form.money')"
                  ></el-input-number>
                </el-form-item>
                <!-- 交易密码 -->
                <el-form-item :label="$t('form.transactionPassword')" prop="payPassword">
                  <el-input
                    type="password"
                    size="small"
                    :placeholder="$t('form.transactionPassword')"
                    v-model="ruleForm.payPassword"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- 提交 -->
                  <el-button
                    :disabled="!!!btnFlag?true:false"
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
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "transfer_manage",
  mixins: [WatchScreen, MyValidate, MessageBox],
  data() {
    return {
      btnFlag: false,
      loading: false,
      walletType: "cp",
      ruleForm: {
        toAccount: "", // 对方用户名
        transferMoney: "", // 转账金额
        payPassword: "" // 交易密码
      },
      rules: {
        // 请输入转账金额
        transferMoney: [
          {
            type: "number",
            required: true,
            message: "form.money_reg",
            trigger: "blur"
          }
        ],
        // 请输入对方用户名
        toAccount: [
          { required: true, message: "form.toAccount_reg", trigger: "blur" }
        ],
        // 请输入交易密码
        payPassword: [
          {
            required: true,
            message: "form.transactionPassword_reg",
            trigger: "blur"
          }
        ]
      },
      walletTypeList: [
        {
          type: "cp",
          name: this.$t("admin_transfer.text1"), // CP钱包
          money: ""
        },
        {
          type: "rp",
          name: this.$t("admin_transfer.text5"), // RP钱包
          money: ""
        }
      ]
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetUserAdress();
    vm.fnBtnFlag(7);
  },
  methods: {
    fnBtnFlag(num) {
      let vm = this;
      if (!!window.localStorage.getItem("admin_permission")) {
        let flagList = JSON.parse(
          window.localStorage.getItem("admin_permission")
        );
        if (flagList.indexOf(num) == -1) {
          vm.btnFlag = false;
        } else {
          vm.btnFlag = true;
        }
      }
    },
    // 查询用户钱包信息
    fnGetUserAdress() {
      let vm = this;
      vm.$api.WALLET_GETUSERWALLET().then(res => {
        if (res.code == 0) {
          vm.walletTypeList[0].money = res.data.walletCp;
          vm.walletTypeList[1].money = res.data.walletRp;
        }
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.loading = true;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          // 2 cp  3 rp
          params = Object.assign({}, vm.ruleForm);
          params.walletType = vm.walletType == "cp" ? 2 : 3;
          vm.$api.WALLET_SUPERTRANSFERACCOUNTS(params).then(res => {
            vm.loading = false;
            if (res.code == 0) {
              //转账成功
              vm.fnOpenMessageBox(vm.$t("alert.success"), "success");
              vm.fnGetUserAdress();
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
<style scoped lang="scss">
.transfer_manage {
  .active2{
    border: 2px dotted red;
  }
  .paylist1 {
    margin-bottom: 0.2rem;
    .col-item {
      padding: 0.12rem;
      .aItem {
        background-size: cover;
        background-repeat: no-repeat;
        height: 1.84rem;
        margin: 0 auto;
        border-radius: 0.15rem;
        cursor: pointer;
        .right_icon {
          width: 0.25rem;
          height: 0.2rem;
          position: absolute;
          right: 0.1rem;
          top: 50%;
          transform: translateY(-50%);
          background: url("../../../../../static/image/golden_icon1.png");
          background-size: contain;
          display: none;
        }
        position: relative;
        @media screen and (max-width: 748px) {
          width: auto;
        }
      }
      .aItem p:nth-of-type(1) {
        padding-top: 0.53rem;
        font-size: 0.24rem;
        font-weight: 500;
        padding-left: 0.4rem;
      }
      .aItem p:nth-of-type(2) {
        font-size: 0.36rem;
        padding-top: 0.23rem;
        font-weight: bold;
        padding-left: 0.4rem;
      }
      .rp {
        background-image: url("../../../../image/transfer_image1.png");
        .active {
          display: block;
        }
      }
      .cp {
        background-image: url("../../../../image/transfer_image2.png");
        .active {
          display: block;
        }
      }
      .ap {
        background-image: url("../../../../image/transfer_image2.png");
        .active {
          display: block;
        }
      }
    }
  }
}
</style>
