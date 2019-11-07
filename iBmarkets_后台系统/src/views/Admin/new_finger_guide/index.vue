<template>
  <transition name="fade">
    <div class="new_finger_guide" style="overflow: hidden;">
      <!-- 新手指南 -->
      <div class="item_title">{{ $t('menu.newFingerGuide') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-upload
            :data="params"
            class="upload-demo"
            name="Filedata"
            :action="path"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">{{ $t('alert.text16') }}</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import comData from "@/utils/data.js";
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "new_finger_guide",
  mixins: [WatchScreen],
  data() {
    return {
      params: {
        token: JSON.parse(window.localStorage.getItem("token"))
      },
      path: comData.path + "/file/uploadNoviceFile",
      fileList: [
      ]
    };
  },
  mounted: function() {
    if (this.$route.matched[0].name == "admin") {
      this.params.token = JSON.parse(
        window.localStorage.getItem("admin_token")
      );
    } else {
      this.params.token = JSON.parse(window.localStorage.getItem("user_token"));
    }
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      let vm = this;
      this.$message.warning(
        `${
          vm.$t('alert.text18')
        } `
      );
    },
    beforeRemove(file, fileList) {
      let vm = this;
      return this.$confirm(`${vm.$t('alert.text17')} ${file.name}？`);
    }
  }
};
</script>
<style lang="scss">
.new_finger_guide {
}
</style>
