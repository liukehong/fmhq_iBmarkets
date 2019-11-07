<template>
  <div class="my_account_product" style="overflow: hidden;">
    <div class="item_title">
      <!-- 配套管理 -->
      <div style="float:left;">{{ $t('title.productManage') }}</div>
    </div>
    <div class="item_box">
      <div class="item_list_box">
        <el-row>
          <el-col
            style="height: 2.32rem; margin-bottom: 10px;"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="7"
          >
            <div class="box_1">
              <div class="box_1_left">
                <div class="left_img">
                  <img :src="p.matchingData.isMoney|URLTYPE" alt />
                </div>
                <div class="left-title">{{ TITLE }}</div>
                <div class="left-num">{{ MONEY }}</div>
              </div>
              <div class="box_1_right">
                <div class="right_money">${{ p.matchingData.isMoney|FORMATTED_NUMBER }}</div>
                <!-- 当前投资金额 -->
                <div class="right_title">{{ $t('Account.text6') }}</div>
              </div>
            </div>
          </el-col>
          <el-col
            style="height: 2.32rem; padding-left: .2rem; margin-bottom: 10px;"
            :class="screenSize == 1?'':'p_l'"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="3"
          >
            <div class="box_2">
              <div class="box_2_left">
                <div class="left_money">${{ p.walletData.walletCp|FORMATTED_NUMBER }}</div>
                <!-- CP钱包当前总额 -->
                <div class="left_title">{{ $t('Account.text7') }}</div>
                <div class="left_img">
                  <img src="../../../lkh_images/money.png" alt />
                </div>
              </div>
            </div>
          </el-col>
          <el-col
            style="min-height: 2.32rem;"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="5"
          >
            <div class="box_3" :class="screenSize == 1?'':'p_l p_r'">
              <div class="box_3_left">
                <el-form
                  :model="ruleForm"
                  :label-position="screenSize == 1?'left':'top'"
                  ref="ruleForm"
                  label-width="1rem"
                  class="demo-ruleForm item_form"
                >
                  <el-form-item :label="$t('form.investmentAmount')" prop="money">
                    <el-input-number
                      style="width:100%;"
                      size="small"
                      v-model="ruleForm.money"
                      :min="0"
                      :label="$t('form.investmentAmount')"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item
                    size="small"
                    :label="$t('form.transactionPassword')"
                    prop="payPassword"
                  >
                    <el-input
                      type="password"
                      :placeholder="$t('form.transactionPassword')"
                      v-model="ruleForm.payPassword"
                    ></el-input>
                  </el-form-item>
                  <!-- 确认追加 -->
                  <el-form-item>
                    <el-button
                      size="small"
                      style="width: 100%;"
                      type="success"
                      @click="submitForm('ruleForm')"
                    >{{ $t('btn.confirmAdditional') }}</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
          <!-- 流量图集合 -->
          <el-col
            style="min-height: 2.32rem; padding-left: .2rem;"
            :class="screenSize == 1?'':'p_l'"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="9"
          >
            <el-row style="min-height: 2.32rem;" class="product_box">
              <el-col
                class="col-item"
                :span="24"
                :xs="12"
                :sm="12"
                :md="12"
                :lg="6"
                :xl="6"
                v-for="item in moneyList"
                :key="item.name"
              >
                <div class="box_4">
                  <div class="box_4_img">
                    <img :src="item.url" alt />
                  </div>
                  <div class="box_4_title">{{ item.name }}</div>
                  <div class="box_4_money">{{ item.num }}</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "my_account_product",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["p", "$main"],
  computed: {
    TITLE: function() {
      let vm = this;
      let data = vm.p.matchingData.isMoney;
      if (data <= 4999) {
        return vm.$t("Account.text1");
      } else if (data <= 9999) {
        return vm.$t("Account.text2");
      } else if (data <= 49999) {
        return vm.$t("Account.text3");
      } else {
        return vm.$t("Account.text4");
      }
    },
    MONEY: function() {
      let vm = this;
      let data = vm.p.matchingData.isMoney;
      if (data <= 4999) {
        return "1,000-4,999USD";
      } else if (data <= 9999) {
        return "5,000-9,999USD";
      } else if (data <= 49999) {
        return "10,000-49,999USD";
      } else {
        return `50,000USD${vm.$t("Account.text5")}`; // 或以上
      }
    }
  },
  filters: {
    URLTYPE: function(data) {
      if (data <= 4999) {
        return "../../../../static/image/money1.png";
      } else if (data <= 9999) {
        return "../../../../static/image/money2.png";
      } else if (data <= 49999) {
        return "../../../../static/image/money3.png";
      } else {
        return "../../../../static/image/money4.png";
      }
    }
  },
  data() {
    return {
      moneyList: [
        {
          name: this.$t("Account.text1"), // 初始流量
          url: "../../../../static/image/money1.png",
          num: "1,000-4,999USD"
        },
        {
          name: this.$t("Account.text2"), // 优化流量
          url: "../../../../static/image/money2.png",
          num: "5,000-9,999USD"
        },
        {
          name: this.$t("Account.text3"), // 精深流量
          url: "../../../../static/image/money3.png",
          num: "10,000-49,999USD"
        },
        {
          name: this.$t("Account.text4"), // 无限流量
          url: "../../../../static/image/money4.png",
          num: `50,000USD${this.$t("Account.text5")}`
        }
      ],
      ruleForm: {
        userMatchingId: 0,
        money: 0,
        payPassword: ""
      },
      rules: {
        money: [
          {
            type: "number",
            required: true,
            message: "form.investmentAmount_reg",
            trigger: "blur"
          }
        ],
        // 请输入交易密码
        payPassword: [
          {
            required: true,
            message: "form.transactionPassword_reg",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {},
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm, {
            userMatchingId: this.p.matchingData.userMatchingId
          });
          vm.$main.loading = true;
          vm.$api.MATCHING_BUYMATCHINGS(params).then(res => {
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text1"), "success");
              vm.ruleForm.money = 0;
              vm.ruleForm.payPassword = "";
              vm.p.fnInit();
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
<style lang="scss">
.product_box {
  background-image: url("../../../lkh_images/product_pg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 0.2rem;
  overflow: hidden;
}
.p_l {
  padding-left: 0px !important;
}
.my_account_product {
  .left_box {
    height: 1.63rem;
    width: 1.63rem;
  }
  .right_box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 1.63rem;
    justify-content: space-evenly;
  }
  .box_4 {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 2.32rem;
    color: #fff;
    .box_4_img {
      width: 0.71rem;
      height: 0.81rem;
      margin-bottom: 0.1rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .box_4_title {
      font-size: 0.14rem;
      margin-bottom: 0.1rem;
    }
    .box_4_money {
      font-size: 0.12rem;
    }
  }
  .box_3 {
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  .box_2 {
    color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    border-radius: 0.1rem;
    overflow: hidden;
    .box_2_left {
      height: 2.32rem;
      width: 100%;
      // background: rgba(41, 79, 120, 1);
      background: linear-gradient(
        270deg,
        rgba(20, 37, 94, 0.73),
        rgba(78, 176, 208, 0.73)
      );
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left_money {
        font-size: 0.23rem;
        padding-bottom: 0.09rem;
      }
      .left_title {
        font-size: 0.12rem;
        text-align: center;
      }
      .left_img {
        width: 0.31rem;
        height: 0.33rem;
        margin-top: 0.3rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .box_2_right {
      height: 2.32rem;
      flex: 1;
    }
  }
  .box_1 {
    color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    background: rgba(76, 87, 106, 1);
    border-radius: 0.1rem;
    overflow: hidden;
    .box_1_left {
      // width: 1.88rem;
      height: 2.32rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left_img {
        width: 0.71rem;
        height: 0.81rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .left-title {
        margin-top: 0.04rem;
        font-size: 0.18rem;
      }
      .left-num {
        font-size: 0.12rem;
        line-height: 0.2rem;
        color: rgba(145, 141, 133, 1);
      }
    }
    .box_1_right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2.32rem;
      background: url("../../../lkh_images/product1.png");
      background-size: cover;
      .right_money {
        font-size: 0.3rem;
        margin-bottom: 0.33rem;
      }
      .right_title {
        font-size: 0.18rem;
        text-align: center;
      }
    }
  }
}
</style>
