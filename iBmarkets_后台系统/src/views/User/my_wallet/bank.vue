<template>
  <div class="my_wallet_bank" style="overflow: hidden;">
    <div class="item_title">银行卡支付</div>
    <div class="item_box" v-if="false">
      <div class="item_list_box">
        <el-row>
          <!-- box1 -->
          <el-col
            :class="screenSize == 1?'':'p_l'"
            class="col-item"
            :span="24"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
            <div style="overflow: hidden; font-size: .14rem;">
              <div style="float:left;">
                <span>付款金额：</span>
                <span style="color: #ee2d1a;">¥ 6.91</span>
              </div>
              <div style="float:right;">
                <span>支付倒计时：</span>
                <b style="color: #ee2d1a;">{{ minutes }}:{{ seconds }}</b>
              </div>
            </div>
            <div style="overflow: hidden; padding-top: 10px;">
              <div style="float:left; font-size: .14rem;">
                <span>付款人：</span>
                <span>hhh</span>
              </div>
            </div>
            <div style="overflow: hidden; padding-top: 10px; font-size: .14rem;">
              <p>服务商名称：Crypto Trading</p>
              <p style="padding-top: 10px;">服务次数：81</p>
              <p style="padding-top: 10px;">平时服务时长：00：23：17</p>
            </div>
            <p
              style="padding-top: 10px; color: #ee2d1a; font-size: .14rem;"
            >温馨提示：您购买的USDT已经被Crypto Trading锁定，服务商无法提走，请放心支付</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 银行卡 -->
    <div class="item_box" style="margin-top: 10px;">
      <!-- 按钮操作 -->
      <div class="item_list_box" style="padding-top: 20px;">
        <!-- box1 -->
        <el-col
          :class="screenSize == 1?'':'p_l'"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
        >
          <div>支付提醒</div>
          <p style="padding-top: 10px; font-size: .14rem; color: #ee2d1a;">1、请使用实名制的银行卡、支付宝、微信等进行转账。</p>
          <p
            style="padding-top: 10px; font-size: .14rem;"
          >2、法定节假日或工作日17:00点以后汇款到银行卡可能造成汇款不及时，请分批支付（单笔支付金额小于￥50000）保证及时到账，若未及时 到账，服务商有权拒绝。</p>
        </el-col>
      </div>
    </div>
    <div class="item_box" style="margin-top: 10px;">
      <!-- 按钮操作 -->
      <div class="item_list_box" style="padding-top: 20px; font-size: .14rem;">
        <el-col
          :class="screenSize == 1?'':'p_l'"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
        >
          <p>
            提示：请您
            <span style="color:#e6a23c;">转账至承服务商银行账户</span>
          </p>
          <p style="padding-top: 10px;">账户姓名：{{ curData.systemBankAccountUserName }}</p>
          <p style="padding-top: 10px;">银行信息： {{ curData.systemBankName }}</p>
          <p style="padding-top: 10px;">银行账号： {{ curData.systemBankAccount }}</p>
          <p style="padding-top: 10px;">开户地址： {{ curData.systemBankAccountOpeningAddress }}</p>
          <p style="padding-top: 10px;">
            <span style="color: #e6a23c;">转账备注码</span> 转账时备注该号码，以便服务商快速确认
          </p>
        </el-col>
        <el-col
          :class="screenSize == 1?'':'p_l'"
          class="col-item"
          :span="24"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
        >
          <el-row class="bankList">
            <el-col
              class="item"
              v-for="item in bankList"
              :key="item.name"
              :span="24"
              :xs="12"
              :sm="12"
              :md="8"
              :lg="8"
              :xl="8"
            >
              <div style="overflow: hidden;" @click="fnSelectBank(item)">
                <div class="icon" v-if="curIndex == item.systemBankId">
                  <b></b>
                </div>
                <img :src="item.systemImgAddress" alt />
              </div>
            </el-col>
          </el-row>
          <p style="padding-top: .2rem; color:#ee2d1a; padding-bottom: .2rem;">存款证明文件</p>
          <Upload
            style="margin-bottom: .2rem;"
            parentName="my_wallet_bank"
            pathName="params.depositApplicationImageAddress"
            :imageUrl="params.depositApplicationImageAddress"
          ></Upload>
          <el-button @click="p.pageType = 'index'" size="small" type="primary">上一步</el-button>
          <el-button
            @click="submitForm"
            size="small"
            type="success"
            :disabled="status == 0?true:false"
          >提交</el-button>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import Upload from "@/components/Upload";
import myDate from "@/utils/date.js";
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
  name: "my_wallet_bank",
  mixins: [WatchScreen, MessageBox],
  inject: ["p"],
  data() {
    return {
      bankList: [],
      curIndex: 0,
      bankUrl: "",
      minutes: "30",
      seconds: "00",
      allSeconds: 30 * 60,
      status: 1, // 0 倒计时结束 1 运行阶段
      curData: "", // 当前选中银行卡
      params: {
        depositApplicationSystemMoney: "", // 申请系统美元
        depositApplicationMoney: "", // 人民币应该支付
        exchangeRate: "", // 汇率
        systemBankId: "", // 对应系统银行ID
        depositApplicationImageAddress: "" // 入金证明(图片地址)
      }
    };
  },
  components: {
    Upload
  },
  mounted: function() {
    let vm = this;
    vm.getData();
    // 倒计时开启
    vm.status = myDate(vm.allSeconds, "minutes", "seconds", vm);
  },
  methods: {
    fnSelectBank: function(data) {
      let vm = this;
      vm.curIndex = data.systemBankId;
      vm.curData = data;
    },
    getData: function() {
      let vm = this;
      vm.$api.BANK_GETSYSTEMBANK().then(res => {
        vm.bankList = res.data;
        if (vm.bankList.length > 0) {
          vm.curData = vm.bankList[0];
          vm.curIndex = vm.bankList[0].systemBankId;
        }
      });
    },
    submitForm: function() {
      let vm = this;
      if (!!!vm.params.depositApplicationImageAddress) {
        vm.fnOpenMessageBox("请上传存款证明", "error");
        return false;
      }
      let params = {
        depositApplicationSystemMoney: vm.p.bankMoney,
        depositApplicationMoney: MY_FORMATTED_NUMBER(
          vm.p.bankMoney * vm.p.exchangeRate
        ),
        exchangeRate: vm.p.exchangeRate,
        systemBankId: vm.curData.systemBankId,
        depositApplicationImageAddress: vm.params.depositApplicationImageAddress
      };
      vm.$api.CLOUNDWALLETAPI_BANKPAY(params).then(res => {
        vm.fnOpenMessageBox(res.msg, "success");
        vm.p.pageType = "index";
      });
    }
  }
};
</script>
<style lang="scss">
.my_wallet_bank {
  color: #000;
}
.bankList {
  margin-top: 10px;
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  .item {
    width: 1.5rem;
    height: 0.4rem;
    margin-left: 5px;
    // margin-right: 5px;
    background: #fff;
    margin-top: 10px;
    position: relative;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      height: 0.3rem;
      margin-top: 0.05rem;
    }
    .icon {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      background: url("../../../../static/image/icon.png") no-repeat;
      top: 0px;
      right: 0px;
      background-size: 100% 100%;
      padding-left: 0.08rem;
      b {
        display: block;
        width: 0.14rem;
        height: 0.14rem;
        background: url("../../../../static/image/icon2.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
