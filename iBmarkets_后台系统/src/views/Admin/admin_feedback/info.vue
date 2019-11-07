<template>
  <div class="item_box admin_feedback_info">
    <div class="item_list_box">
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form
            style="width:100%;"
            :model="ruleForm"
            :rules="rules"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 反馈内容 -->
            <el-form-item style="width:100%;" :label="$t('form.message')">
              <div style="color: #000;">{{ p.info.messageBody }}</div>
            </el-form-item>
            <!-- 回复内容 -->
            <el-form-item :label="$t('form.messageReply')">
              <el-input
                size="small"
                :placeholder="$t('form.messageReply')"
                rows="8"
                type="textarea"
                v-model="ruleForm.messageReply"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button
                v-show="p.pageType == 'replay'"
                size="small"
                type="success"
                @click="submitForm('ruleForm')"
              >{{ $t('btn.submit') }}</el-button>
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
import WatchScreen from "../../../mixins/watchScreen.js";
import BigImg from "@/components/BigImg";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "admin_feedback_info",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {
    Upload,
    BigImg
  },
  data() {
    return {
      ruleForm: {
        messageReply: "", // 回复内容
        messageId: this.p.info.messageId, // 反馈id
        messageStatus: 1
      },
      rules: {}
    };
  },
  mounted: function() {
    if (this.p.pageType == "info") {
      this.ruleForm.messageReply = this.p.info.messageReply;
    }
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.SYSTEM_REPLY(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("alert.success"),
                "success"
              );
              vm.p.pageType = "list";
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

<style scoped lang="scss">
.admin_feedback_info {
  .item_form {
    max-width: 100% !important;
  }
  .reply_list_box {
    font-size: 0.14rem;
    margin: 0.2rem 0;
    border: 1px solid #bfbfbf;
    border-radius: 5px;
    .reply_item {
      padding: 0.2rem;
      margin-top: 0.2rem;
      .reply_name {
        margin-bottom: 0.1rem;
      }
      .reply_content {
        border: 1px solid #bfbfbf;
        border-radius: 5px;
        padding: 0.1rem;
      }
      .reply_date {
        margin-top: 0.1rem;
      }
    }
  }
  ul,
  li {
    list-style: none;
  }
  .pagination_box {
    padding: 0.1rem 0;
  }
  .screenshot_list {
    display: flex;
    flex-wrap: wrap;
    .screenshot_item {
      margin-right: 0.1rem;
      width: 1rem;
      height: 1rem;
      padding: 2px;
      line-height: 1rem;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
