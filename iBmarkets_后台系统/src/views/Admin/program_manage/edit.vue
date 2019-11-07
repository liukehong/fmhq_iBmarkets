<template>
  <div class="item_box">
    <div class="item_list_box">
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
          <el-form
            :model="ruleForm"
            :rules="rules"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <el-form-item label="标题">
              <el-input size="small" placeholder="标题" v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="预览图">
              <Upload
                parentName="news_managet_edit"
                pathName="ruleForm.content"
                :imageUrl="ruleForm.content"
              ></Upload>
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
import Upload from "@/components/Upload";
import WatchScreen from "../../../mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "news_managet_edit",
  mixins: [WatchScreen, MessageBox],
  inject: ["p"],
  components: {
    Upload
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      ruleForm: {
        content: "", // 预览图
        title: "", // 标题
        id: this.p.info.id // id
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
      vm.ruleForm.content = vm.p.info.content;
      vm.ruleForm.title = vm.p.info.title;
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$api.SYSTEM_UPDATEJOU(params).then(res => {
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.success"), "success");
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
</style>
