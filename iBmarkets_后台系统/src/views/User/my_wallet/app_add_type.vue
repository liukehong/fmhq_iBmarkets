<template>
  <div class="app_add_type" style="overflow: hidden;">
    <el-radio-group v-model="radio" style="padding:.12rem;" v-if="false">
      <!-- 电子钱包 -->
      <el-radio :label="1">{{ $t('Wallet.text7') }}</el-radio>
      <!-- 国内银行转账 -->
      <el-radio :label="2">{{ $t('Wallet.text8') }}</el-radio>
    </el-radio-group>

    <!-- 币种类型 -->
    <el-row class="paylist1" v-show="radio == 1">
      <el-col
        :class="screenSize == 1?'':'p_r p_l'"
        v-for="item in currencyList"
        :key="item.type"
        class="col-item"
        :span="24"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
      >
        <div class="aItem" :class="item.type" @click="fnGetRate(item.type)">
          <p :class="currency==item.type?'active1':''">{{ item.name }}</p>
          <div class="aItem_img">
            <img :src="item.url" alt />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 电子钱包提交 -->
    <div class="pay_form_box" :class="screenSize == 1?'':'p_r p_l'" v-show="radio == 1">
      <el-form
        :label-position="screenSize == 1?'left':'left'"
        label-width="1.6rem"
        class="item_form"
      >
        <el-form-item :label="$t('form.usdMoney')">
          <el-input-number size="small" v-model="value" :min="100" :label="$t('form.usdMoney')"></el-input-number>
        </el-form-item>
        <el-form-item :label="`${$t('Wallet.text9')}`+currency|UPPER_CASE">
          <div style="color: #000;">{{ coin_val }}</div>
        </el-form-item>
      </el-form>
      <!-- 提交购买申请 -->
      <el-button size="small" type="success" @click="submitForm">{{ $t('btn.submitApply') }}</el-button>
    </div>
    <!-- 电子钱包提交模态框 -->
    <el-dialog
      center
      :title="usd_val+' USD'"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="3rem"
    >
      <div class="imgBox">
        <img :src="resData.qrcodeUrl" alt />
      </div>
      <!-- 将指定的数量发送到下面的地址 -->
      <div class="textBox">{{ $t('Wallet.text10') }}</div>
      <div class="coinType">{{ currency|UPPER_CASE }}</div>
      <div class="coinNum">{{ coin_val }}</div>
      <el-input
        size="small"
        :readonly="true"
        class="urlBox"
        placeholder="请输入内容"
        v-model="resData.address"
      >
        <!-- 复制 -->
        <el-button @click="fnDoCopy" slot="append">{{ $t('btn.copy') }}</el-button>
      </el-input>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <!-- 银行转账 -->
    <el-form
      :label-position="screenSize == 1?'left':'left'"
      label-width="1.6rem"
      class="item_form"
      style="padding:.12rem;"
      v-show="radio == 2"
    >
      <!-- 货币 -->
      <el-form-item :label="$t('Wallet.text11')">
        <!-- 美元 -->
        <div style="color: #000;">{{ $t('Wallet.text12') }}</div>
      </el-form-item>
      <!-- 金额 -->
      <el-form-item :label="$t('form.money')">
        <el-input-number size="small" v-model="p.bankMoney" :min="100" :label="$t('form.money')"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('Wallet.text13')">
        <div
          style="color:#ff763f;"
        >{{ (p.bankMoney*p.exchangeRate)|FORMATTED_NUMBER }}{{ $t('Wallet.text14') }}</div>
      </el-form-item>
      <!-- 下一步 -->
      <el-button size="small" type="success" @click="submitBank">{{ $t('btn.next') }}</el-button>
    </el-form>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import floatNumber from "@/utils/floatNumber.js";
import MessageBox from "@/mixins/messageBox.js";
const MY_FORMATTED_NUMBER = money => {
  if (money && money != null) {
    money = String(money);
    var left = money.split(".")[0],
      right = money.split(".")[1];
    right = right
      ? right.length >= 2
        ? "." + right.substr(0, 2)
        : "." + right + "0"
      : ".00";
    var temp = left
      .split("")
      .reverse()
      .join("")
      .match(/(\d{1,3})/g);
    return (
      (Number(money) < 0 ? "-" : "") +
      temp
        .join(",")
        .split("")
        .reverse()
        .join("") +
      right
    );
  } else if (money === 0) {
    //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
    return "0.00";
  } else {
    return "";
  }
};
export default {
  name: "app_add_type",
  mixins: [WatchScreen, MessageBox],
  inject: ["$main", "p"],
  computed: {
    usd_val: function() {
      return this.value;
    },
    coin_val: function() {
      return floatNumber.multiply(this.value, 1 / this.rate, 4);
    }
  },
  data() {
    return {
      // bankMoney: 100,
      radio: 1,
      resData: "",
      loading: false,
      dialogVisible: false,
      list: [100, 200, 300],
      value: "100",
      exchangeRate: "", // 汇率
      currencyList: [
        {
          type: "btc",
          name: this.$t("Wallet.text15"), // 比特币入金
          url: "../../../../static/image/btc.png"
        },
        {
          type: "eth",
          name: this.$t("Wallet.text16"), // 以太坊入金
          url: "../../../../static/image/eth.png"
        },
        {
          type: "usdt",
          name: this.$t("Wallet.text17"), // 泰达币入金
          url: "../../../../static/image/usdt.png"
        }
      ],
      currency: "btc",
      rate: "", // 汇率
      uuid: "",
      AP: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnExchangeRate(); // 获取汇率
  },
  methods: {
    // 复制
    fnDoCopy() {
      let vm = this;
      vm.$copyText(vm.resData.address).then(
        function(res) {
          vm.fnOpenMessageBox(vm.$t("alert.text5"), "success");
        },
        function(err) {
          vm.fnOpenMessageBox(vm.$t("alert.text6"), "error");
        }
      );
    },
    // 获取汇率
    fnExchangeRate() {
      let vm = this;
      vm.$api
        .SYSTEM_EXCHANGERATE()
        .then(res => {
          vm.exchangeRate = JSON.parse(res.data);
        })
        .then(() => {
          vm.fnGetRate(vm.currency);
        });
    },
    // 购买数量的变化
    handleChange(val) {
      let vm = this;
    },
    // 类型变换
    fnGetRate(type) {
      let vm = this;
      vm.currency = type; // 点击的类型
      let name = type == "btc" ? "BTCUSD" : type == "eth" ? "ETHUSD" : "USDT";
      vm.exchangeRate.forEach((item, index) => {
        if (name == "USDT") {
          vm.rate = 1;
        } else {
          if (item.symbol == name) {
            vm.rate = item.price;
          }
        }
      });
    },
    // 银行下一步
    submitBank() {
      let vm = this;
      vm.p.pageType = "bank";
    },
    // 表单提交
    submitForm() {
      let vm = this;
      vm.loading = true;
      let params = {
        orderMoney: vm.coin_val, // 虚拟货币
        orderCurrencyType:
          vm.currency == "usdt" ? 3 : vm.currency == "btc" ? 1 : 2, // 支付的币种类型
        orderSystemCurrencyNumber: vm.usd_val, // 虚拟货币数量
        orderSystemMoney: vm.value
      };
      vm.$main.loading = true;
      vm.$api.CLOUNDWALLETAPI_PAY(params).then(res => {
        if (res.code == 0) {
          vm.dialogVisible = true;
          vm.resData = res.data;
        } else {
          vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
        }
        vm.$main.loading = false;
        vm.loading = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.imgBox {
  height: 1.48rem;
  img {
    display: block;
    width: 1.48rem;
    height: 1.48rem;
    margin: 0 auto;
  }
}
.textBox {
  text-align: center;
  padding-top: 0.2rem;
}
.coinNum {
  text-align: center;
  padding-top: 0.1rem;
  font-weight: bold;
}

.urlBox {
  text-align: center;
  padding-top: 0.3rem;
}

.coinType {
  text-align: center;
  padding-top: 0.1rem;
  font-weight: bold;
}
.fade-enter {
  opacity: 0;
  transform: translateY(2rem);
}
.fade-enter-active {
  transition: all 0.8s;
}
.fade-leave {
  opacity: 0;
}
.app_add_type {
  .paylist1 {
    .col-item {
      padding: 0.12rem;
      .aItem {
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        height: 1.3rem;
        text-align: center;
        cursor: pointer;
        margin: 0 auto;
        border-radius: 4px;
        position: relative;
        .right_icon {
          width: 0.25rem;
          height: 0.2rem;
          position: absolute;
          top: 0px;
          right: 0px;
          background: url("../../../image/golden_icon1.png");
          display: none;
        }
        .aItem_img {
          width: 0.54rem;
          height: 0.54rem;
          margin: 0 auto;
          margin-top: 0.225rem;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .aItem p:nth-of-type(1) {
        font-size: 0.14rem;
        height: 0.3rem;
        line-height: 0.3rem;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.3),
          rgba(255, 255, 255, 0.3)
        );
      }
      .aItem p:nth-of-type(2) {
        font-size: 0.16rem;
        font-weight: bold;
      }
      .btc {
        // background-image: url('../../../image/golden_bltcoln.png');
        background: rgba(35, 75, 138, 0.3);
        .active {
          display: block;
        }
        .active1 {
          background: rgba(38, 163, 80, 1) !important;
        }
      }
      .eth {
        // background-image: url('../../../image/golden_ether.png');
        background: rgba(35, 75, 138, 0.3);
        .active {
          display: block;
        }
        .active1 {
          background: rgba(38, 163, 80, 1) !important;
        }
      }
      .usdt {
        // background-image: url('../../../image/golden_usdt.png');
        background: rgba(35, 75, 138, 0.3);
        .active {
          display: block;
        }
        .active1 {
          background: rgba(38, 163, 80, 1) !important;
        }
      }
    }
  }
  .pay_form_box {
    padding-left: 0.12rem;
    padding-right: 0.12rem;
  }
  .alertText {
    color: rgba(111, 142, 208, 1);
    font-size: 0.14rem;
    font-weight: 400;
    line-height: 0.36rem;
  }
}
</style>
