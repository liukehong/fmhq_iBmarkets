<template>
  <transition name="fade">
    <div class="order_search" style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <List v-if="pageType == 'list'"></List>
    </div>
  </transition>
</template>
<script>
import List from "./list";
export default {
  name: "order_search",
  components: {
    List
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
        list: vm.$t('title.orderList')
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
