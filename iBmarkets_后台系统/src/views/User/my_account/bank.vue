<template>
  <div class="my_account_bank" style="overflow: hidden;">
    <div class="item_title">
      <!-- 我的银行卡 -->
      <div style="float:left;">{{ $t('title.bank') }}</div>
    </div>
    <div class="item_box">
      <div class="item_list_box bank_card_box">
        <el-row>
          <!-- 银行卡list -->
          <el-col
            v-for="item in list"
            :key="item.id"
            :span="24"
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="8"
            class="col_item"
            style="padding: .1rem;"
          >
            <div>
              <a class="bank_card_item">
                <div class="bank_msg">
                  <div class="bank_icon"></div>
                  <div class="card_txt">
                    <h5>{{ item.userBankName }}</h5>
                    <p>{{ item.userBankAccount_name }}</p>
                  </div>
                </div>
                <div class="bank_code">{{ item.userBankAccount }}</div>
                <i @click="fnDeleteBank(item.userBankId)" class="del_bank el-icon-close"></i>
              </a>
            </div>
          </el-col>
          <el-col
            :span="24"
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="8"
            class="col_item"
            style="padding: .1rem;"
          >
            <div @click="fnAddBankCard">
              <!-- 添加银行卡 -->
              <a class="add_card_item txt">{{ $t('btn.addBank') }}</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 模态框 -->
    <el-dialog
      :title="$t('Account.text8')"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :width="screenSize == 1?'25%':'90%'"
    >
      <el-form
        :model="ruleForm"
        :label-position="screenSize == 1?'left':'top'"
        ref="ruleForm"
        label-width="1.5rem"
        class="demo-ruleForm"
      >
        <!-- 开户银行全名 -->
        <el-form-item :label="$t('form.userBankName')">
          <el-input
            size="small"
            :placeholder="$t('form.userBankName')"
            v-model="ruleForm.userBankName"
          ></el-input>
        </el-form-item>
        <!-- 银行卡号码 -->
        <el-form-item :label="$t('form.userBankAccount')">
          <el-input
            size="small"
            :placeholder="$t('form.userBankAccount')"
            v-model="ruleForm.userBankAccount"
          ></el-input>
        </el-form-item>
        <!-- 银行账户持有人 -->
        <el-form-item :label="$t('form.userBankAccountName')">
          <el-input
            size="small"
            :placeholder="$t('form.userBankAccountName')"
            v-model="ruleForm.userBankAccount_name"
          ></el-input>
        </el-form-item>
        <!-- 开户地址 -->
        <el-form-item :label="$t('form.userBankAccountOpeningAddress')">
          <el-input
            size="small"
            :placeholder="$t('form.userBankAccountOpeningAddress')"
            v-model="ruleForm.userBankAccountOpeningAddress"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- 取消 -->
        <el-button size="small" @click="dialogVisible = false">{{ $t('btn.cancel') }}</el-button>
        <!-- 确定 -->
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">{{ $t('btn.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "my_account_bank",
  mixins: [WatchScreen, MyValidate, MessageBox],
  data() {
    return {
      ruleForm: {
        userBankName: "", // 银行名字
        userBankAccount: "", // 银行账号
        userBankAccount_name: "", // 银行卡持有人
        userBankAccountOpeningAddress: "" // 开户地址
      },
      rules: {},
      list: [],
      dialogVisible: false
    };
  },
  components: {},
  mounted: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    fnInit() {
      let vm = this;
      vm.$api.BANK_GETUSERBANKS().then(res => {
        vm.list = res.data;
      });
    },
    // 打开银行卡模态框
    fnAddBankCard() {
      let vm = this;
      for (var key in vm.ruleForm) {
        vm.ruleForm[key] = "";
      }
      vm.dialogVisible = true;
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$api.BANK_ADDUSERBANK(params).then(res => {
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text3"), "success");
              vm.dialogVisible = false;
              vm.fnInit();
            } else {
              vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            }
          });
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    },
    // 删除银行卡
    fnDeleteBank(id) {
      let vm = this;
      vm.$api
        .BANK_DELETEUSERBANK({
          userBankId: id
        })
        .then(res => {
          if (res.code == 0) {
            vm.fnOpenMessageBox(vm.$t("alert.text4"), "success");
            vm.fnInit();
          } else {
            vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
          }
        });
    }
  }
};
</script>

<style lang="scss">
.my_account_bank {
  .el-form-item__label {
    color: #fff;
  }
}
.bank_card_item {
  display: block;
  border-radius: 0.05rem;
  color: #fff;
  padding: 0.1rem 0.45rem;
  background-color: #2975bc;
  background-repeat: no-repeat;
  background-position: 90%;
  background-size: auto 100%;
  height: 1rem;
  background-image: url("../../../../static/image/bank.png");
  position: relative;
  .bank_msg {
    overflow: hidden;
    margin-top: 0.1rem;
    .bank_icon {
      height: 0.36rem;
      width: 0.36rem;
      float: left;
      margin-right: 0.1rem;
      background-image: url("../../../../static/image/bank.svg");
      background-position: 50%;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    .card_txt {
      float: left;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
  }
  .bank_code {
    font-size: 0.2rem;
    margin-top: 0.1rem;
    line-height: 1;
    letter-spacing: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .del_bank {
    display: block;
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    right: 0.05rem;
    top: 0.05rem;
    cursor: pointer;
  }
}
.add_card_item {
  display: block;
  border-radius: 0.05rem;
  color: #fff;
  border: 2px dashed #383838;
  background: url("../../../../static/image/add.png") no-repeat 50%;
  background-size: auto 60%;
  height: 1rem;
}
.txt {
  padding-top: 0.6rem;
  text-align: center;
  color: #5d5d5d;
  background-position: center 0.05rem;
}
</style>
