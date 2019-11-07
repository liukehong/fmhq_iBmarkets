<template>
  <transition name="fade">
    <div class="member_list" style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <List v-if="pageType == 'list'"></List>
      <Info v-if="pageType == 'info'"></Info>
      <Password v-if="pageType == 'password'"></Password>
      <Permissions v-if="pageType == 'permissions'"></Permissions>
    </div>
  </transition>
</template>
<script>
import List from "./list";
import Info from "./info";
import Password from './password'
import Permissions from './permissions';
export default {
  name: "member_list",
  components: {
    List,
    Info,
    Password,
    Permissions
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
        list: vm.$t('menu.performanceSearch1'), // 用户列表
        info: vm.$t('title.userInfo'), // 会员信息
        password: vm.$t('title.password'), // 重置密码 permissions
        permissions: vm.$t('title.permissions'), // permissions
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list", // 显示具体页面的状态 list 列表页  info 详情页
      info: "" // 用户信息
    };
  }
};
</script>
<style lang="scss">
</style>
