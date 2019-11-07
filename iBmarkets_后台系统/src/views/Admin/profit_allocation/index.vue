<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <div class="item_box">
        <el-select v-if="pageType == 'list1'||pageType == 'list2' || pageType == 'list3'" v-model="pageType" placeholder="请选择" style="margin-top: .2rem; margin-left: .2rem; margin-bottom: .2rem;">
          <!-- 直推奖励配置 -->
          <el-option :label="$t('title.configure1')" value="list1"></el-option>
          <!-- 团队奖励配置 -->
          <el-option :label="$t('title.configure2')" value="list2"></el-option>
          <!-- 配套奖励配置 -->
          <el-option :label="$t('title.configure3')" value="list3"></el-option>
        </el-select>
        <List1 v-if="pageType == 'list1'"></List1>
        <Edit1 v-if="pageType == 'edit1'"></Edit1>
        <List2 v-if="pageType == 'list2'"></List2>
        <Edit2 v-if="pageType == 'edit2'"></Edit2>
        <List3 v-if="pageType == 'list3'"></List3>
        <Edit3 v-if="pageType == 'edit3'"></Edit3>
      </div>
    </div>
  </transition>
</template>
  <script>
import List1 from "./list1.vue";
import Edit1 from "./edit1";
import List2 from "./list2.vue";
import Edit2 from "./edit2";
import List3 from "./list3.vue";
import Edit3 from "./edit3";
export default {
  name: "admin_feedback",
  components: {
    List1,
    Edit1,
    List2,
    Edit2,
    List3,
    Edit3,
  },
  provide() {
    return {
      p: this
    };
  },
  computed: {
    PAGE_NAME: function() {
      let vm = this;
      let val = vm.pageType;
      let obj = {
        list1: vm.$t("title.configure1"), // 直推奖励配置
        edit1: vm.$t("title.configure1"), // 直推奖励配置
        list2: vm.$t("title.configure2"), // 团队奖励配置
        edit2: vm.$t("title.configure2"), // 直推奖励配置
        list3: vm.$t("title.configure3"), // 配套奖励配置
        edit3: vm.$t("title.configure3"), // 配套奖励配置
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list1",
      info: "", // 反馈详情
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
