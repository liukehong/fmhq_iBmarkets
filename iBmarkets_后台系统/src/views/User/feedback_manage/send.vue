<template>
  <div style="overflow: hidden;">
    <!-- 发送反馈 -->
    <div class="item_title">{{ $t('title.sendFeedback') }}</div>
    <div class="item_box">
      <div class="item_list_box">
        <el-form
          :model="ruleForm"
          label-position="top"
          ref="ruleForm"
          label-width="1.6rem"
          class="demo-ruleForm item_form"
        >
          <el-row>
            <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <!-- 标题 -->
              <el-form-item :label="$t('form.title')" prop="messageHead">
                <el-input
                  size="small"
                  :placeholder="$t('form.title')"
                  v-model="ruleForm.messageHead"
                ></el-input>
              </el-form-item>
              <!-- 反馈内容 -->
              <el-form-item :label="$t('form.message')" prop="messageBody">
                <el-input
                  type="textarea"
                  :rows="5"
                  :placeholder="$t('form.message')"
                  v-model="ruleForm.messageBody"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-top: .3rem;">
                <!-- 立即发送 -->
                <el-button
                  size="small"
                  style="width: 100%;"
                  type="success"
                  @click="submitForm('ruleForm')"
                >{{ $t('btn.nowSend') }}</el-button>
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
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "my_account",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main", "p"],
  data() {
    return {
      ruleForm: {
        messageBody: "", // 内容
        messageHead: "" // 标题
      },
      rules: {
        //请输入反馈内容
        messageBody: [
          { required: true, message: "form.message_reg", trigger: "blur" }
        ],
        //请输入标题
        messageHead: [
          { required: true, message: "form.title_reg", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    let vm = this;
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.USER_ADDMESSAGE(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text8"), "success");
              vm.ruleForm.messageBody = "";
              vm.p.time = +new Date();
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
</style>
