<template>
  <div class="item_box notice_list_add">
    <div class="item_list_box">
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form
            :model="ruleForm"
            :rules="rules"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 标题 -->
            <el-form-item :label="$t('form.title')">
              <el-input
                size="small"
                :placeholder="$t('form.title')"
                v-model="ruleForm.announcementHead"
              ></el-input>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item style="color: #000;" :label="$t('form.content')">
              <Editor v-model="ruleForm.announcementBody"></Editor>
              <!-- <el-input size="small" :placeholder="$t('form.content')" rows="8" type="textarea" v-model="ruleForm.announcementBody"></el-input> -->
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button
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
import WatchScreen from "../../../mixins/watchScreen.js";
import Editor from "@/components/Editor";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "notice_list_add",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {
    Editor
  },
  data() {
    return {
      path: "",
      total: 0,
      currentPage: 1,
      ruleForm: {
        announcementHead: "", // 标题
        announcementBody: "" // 内容
      },
      rules: {}
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.SYSTEM_SETSYSTEMANNOUNCEMENT(params).then(res => {
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
<style lang="scss">
.notice_list_add {
  .item_form {
    max-width: 100% !important;
  }
}
</style>
