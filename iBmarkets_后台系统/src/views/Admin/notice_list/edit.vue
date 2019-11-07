<template>
  <div class="item_box notice_list_edit">
    <div class="item_list_box">
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form
            :model="ruleForm"
            :rules="rules"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <el-form-item label="语言">
              <el-select size="small" v-model="ruleForm.type" placeholder="请选择">
                <el-option label="中文" :value="0"></el-option>
                <el-option label="English" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number size="small" v-model="ruleForm.whole" :min="0" label="排序"></el-input-number>
            </el-form-item>
            <el-form-item label="标题" style="max-width: 6rem;">
              <el-input size="small" placeholder="标题" v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" style="max-width: 10rem;">
              <Editor v-model="ruleForm.content"></Editor>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button size="small" @click="p.pageType = 'list'">返回</el-button>
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
  name: "notice_list_edit",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {
    Editor
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      ruleForm: {
        title: "", // 标题
        content: "", // 内容
        type: 0, // 0中文 1英语
        whole: 0, // 排序
        id: ""
      },
      rules: {}
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    // 初始化数据
    fnInit() {
      let vm = this;
      vm.$main.loading = true;
      vm.ruleForm.title = vm.p.info.title;
      vm.ruleForm.content = vm.p.info.content;
      vm.ruleForm.type = +vm.p.info.type;
      vm.ruleForm.whole = +vm.p.info.whole;
      vm.ruleForm.id = +vm.p.info.id;
      vm.$main.loading = false;
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.SYSTEM_UPDATENOTICES(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text2"), "success");
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
.notice_list_edit {
  .item_form {
    max-width: 100% !important;
  }
}
</style>
