<template>
  <transition name="fade">
    <div class="performance_search" style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <List v-if="pageType == 'list'"></List>
      <div class="item_title" style="margin-top: .2rem;">{{ $t('menu.performanceSearch1') }}</div>
      <Performance></Performance>
    </div>
  </transition>
</template>
<script>
import List from "./list";
import Performance from './performance';
export default {
  name: "performance_search",
  components: {
    List,
    Performance
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
      //业绩查询
      let obj = {
        list: vm.$t('title.performanceSearch')
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list" // 显示具体页面的状态 list 列表页  info 详情页
    };
  }
};
</script>
<style lang="scss">
</style>
