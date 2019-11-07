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
            class="demo-ruleForm item_form"
          >
            <!-- 标题 -->
            <el-form-item :label="$t('form.title')" v-if="false">
              <el-input size="small" :placeholder="$t('form.title')" v-model="ruleForm.newsTitle"></el-input>
            </el-form-item>
            <!-- 链接 -->
            <el-form-item :label="$t('form.newsAddress')" v-if="false">
              <el-input
                size="small"
                :placeholder="$t('form.newsAddress')"
                v-model="ruleForm.newsAddress"
              ></el-input>
            </el-form-item>
            <!-- 新闻类型 -->
            <el-form-item :label="$t('admin_programManage.text5')" v-if="false">
              <!-- 请选择 -->
              <el-select
                size="small"
                v-model="ruleForm.newsLanguage"
                :placeholder="$t('form.please')"
              >
                <!-- 简体中文 -->
                <el-option :label="$t('admin_programManage.text6')" value="zh"></el-option>
                <!-- English -->
                <el-option label="English" value="en"></el-option>
              </el-select>
            </el-form-item>
            <!-- 预览图 -->
            <el-form-item>
              <Upload
                parentName="news_managet_add"
                pathName="ruleForm.imageAddress"
                :imageUrl="ruleForm.imageAddress"
              ></Upload>
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button size="small" type="danger" @click="submitForm()">{{ $t('btn.delete') }}</el-button>
              <!-- 查看 -->
              <el-button v-if="!!ruleForm.imageAddress" size="small" @click="dialogVisible = true">{{ $t('btn.see') }}</el-button>
              <!-- 返回 -->
              <el-button
                v-if="false"
                size="small"
                @click="p.pageType = 'list'"
              >{{ $t('btn.return') }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- 支付凭证 -->
    <el-dialog
      :modal-append-to-body="false"
      :title="$t('admin_programManage.text7')"
      :visible.sync="dialogVisible"
      :width="screenSize == 1?'50%':'90%'"
    >
      <img :src="ruleForm.imageAddress" alt style="width: 100%; height: 100%; display:block; min-height: 3rem;" />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/ProgramUpload";
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
      dialogVisible: false,
      total: 0,
      currentPage: 1,
      ruleForm: {
        imageAddress: "", // 预览图
        newsTitle: "", // 标题
        newsAddress: "", // 链接
        newsLanguage: "zh", // 类型
        programId: ""
      },
      rules: {}
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 获取最新数据
    fnGetData() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.SYSTEM_GETNEWPROGRAM().then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.ruleForm.imageAddress = res.data.programImageAddress || "";
          vm.ruleForm.programId = res.data.programId;
        }
      });
    },
    // 表单提交
    submitForm() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .SYSTEM_DELETEPROGRAM({
          programId: vm.ruleForm.programId
        })
        .then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            vm.fnOpenMessageBox(vm.$t("alert.text4"), "success");
            vm.fnGetData();
          } else {
            vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
