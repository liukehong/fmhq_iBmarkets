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
            label-width="1.2rem"
            class="demo-ruleForm item_form"
          >
            <!-- 标题 -->
            <el-form-item :label="$t('form.title')">
              <el-input size="small" :placeholder="$t('form.title')" v-model="ruleForm.newsTitle"></el-input>
            </el-form-item>
            <!-- 链接 -->
            <el-form-item :label="$t('form.newsAddress')">
              <el-input
                size="small"
                :placeholder="$t('form.newsAddress')"
                v-model="ruleForm.newsAddress"
              ></el-input>
            </el-form-item>
            <!-- 新闻类型 -->
            <el-form-item :label="$t('admin_newsManage.text5')">
              <!-- 请选择 -->
              <el-select
                size="small"
                v-model="ruleForm.newsLanguage"
                :placeholder="$t('form.please')"
              >
                <!-- 简体中文 -->
                <el-option :label="$t('admin_newsManage.text6')" value="zh"></el-option>
                <!-- English -->
                <el-option label="English" value="en"></el-option>
              </el-select>
            </el-form-item>
            <!-- 预览图 -->
            <el-form-item :label="$t('form.img')">
              <Upload
                parentName="news_managet_add"
                pathName="ruleForm.imageAddress"
                :imageUrl="ruleForm.imageAddress"
              ></Upload>
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button
                size="small"
                type="primary"
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
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "news_managet_add",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {
    Upload
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      ruleForm: {
        imageAddress: "", // 预览图
        newsTitle: "", // 标题
        newsAddress: "", // 链接
        newsLanguage: "zh" // 类型
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
          vm.$api.SYSTEM_SETNEWS(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("alert.success"),
                "success"
              );
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
