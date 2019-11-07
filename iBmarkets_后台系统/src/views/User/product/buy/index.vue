<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <div class="item_box">
        <List v-if="pageType == 'list'"></List>
        <Buy v-if="pageType == 'buy'"></Buy>
      </div>
    </div>
  </transition>
</template>
  <script>
import List from "./list.vue";
import Buy from './buy';
export default {
  name: "product_buy",
  components: {
    List,
    Buy
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
        list: vm.$t('menu.productBuy'), // 购买配套
        buy: vm.$t('menu.productBuy'), // 购买配套
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list",
      info: "" // 配套信息
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
