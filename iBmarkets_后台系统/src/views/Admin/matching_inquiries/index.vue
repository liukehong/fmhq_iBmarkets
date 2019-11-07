<template>
  <transition name="fade">
    <div class="order_search" style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <List v-if="pageType == 'list'"></List>
      <Edit v-if="pageType == 'edit'"></Edit>
    </div>
  </transition>
</template>
<script>
import List from "./list";
import Edit from './edit';
export default {
  name: "order_search",
  components: {
    List,
    Edit
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
        list: vm.$t('title.matchingInquiries'), // 配套查询
        edit: '添加MT4收益日志',
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list", // 显示具体页面的状态 list 列表页  info 详情页
      info: '',
    };
  }
};
</script>
<style lang="scss">
</style>
