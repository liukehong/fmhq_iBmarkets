<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <div class="item_box">
        <List v-if="pageType == 'list'"></List>
        <Withdrawal v-if="pageType == 'withdrawal'"></Withdrawal>
        <Upgrade v-if="pageType == 'upgrade'"></Upgrade>
        <Rescission v-if="pageType == 'rescission'"></Rescission>
      </div>
    </div>
  </transition>
</template>
  <script>
import List from "./list.vue";
import Withdrawal from './withdrawal';
import Upgrade from './upgrade';
import Rescission from './rescission';
export default {
  name: "admin_feedback",
  components: {
    List,
    Withdrawal,
    Upgrade,
    Rescission
  },
  provide() {
    return {
      p: this
    };
  },
  computed: {
    PAGE_NAME: function () {
      let vm = this;
      let val = vm.pageType;
      let obj = {
        list: vm.$t('menu.productList'), // 反馈列表
        withdrawal: vm.$t('user_product.text2'), // MT4提现
        upgrade: vm.$t('user_product.text3'), // 配套升级
        rescission: vm.$t('user_product.text22'), // 配套解约
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list",
      info: "" // 反馈详情
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
