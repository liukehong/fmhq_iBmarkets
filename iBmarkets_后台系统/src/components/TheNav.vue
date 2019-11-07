<template>
  <div class="menuBox">
    <el-scrollbar style="height: 100%;">
      <!-- 名称 -->
      <div class="title_wrap">
        <!-- <div class="name">{{ user.username }}</div> -->
        <!-- 账户ID -->
        <div class="id">{{ $t('common.ID') }}：{{ user.account }}</div>
      </div>
      <!-- 菜单 -->
      <el-menu
        class="el-menu-vertical-demo navBox"
        :unique-opened="true"
        router
        :default-active="default_active"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <template v-for="item1 in menuList">
          <!-- 只有一级菜单 -->
          <el-menu-item v-if="!!!item1.haschildren" :index="item1.index" :key="item1.index">
            <i :class="item1.icon"></i>
            <span slot="title">{{ item1.name }}</span>
          </el-menu-item>
          <!-- 有二级 -->
          <el-submenu :index="item1.index" v-if="!!item1.haschildren" :key="item1.index">
            <template slot="title">
              <i :class="item1.icon"></i>
              <span>{{ item1.name }}</span>
            </template>
            <template v-for="item1_1 in item1.list">
              <!-- 没有三级 -->
              <el-menu-item
                v-if="!!!item1_1.haschildren"
                :index="item1_1.index"
                :key="item1_1.index"
              >{{ item1_1.name }}</el-menu-item>
              <!-- 有三级 -->
              <el-submenu v-if="!!item1_1.haschildren" :key="item1_1.index" :index="item1_1.index">
                <template slot="title">{{ item1_1.name }}</template>
                <el-menu-item
                  v-for="item1_1_1 in item1_1.list"
                  :key="item1_1_1.index"
                  :index="item1_1_1.index"
                >{{ item1_1_1.name }}</el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import GetUserInfo from "../mixins/getUserInfo.js";
import comData from "../utils/data.js";
export default {
  name: "TheNav",
  mixins: [GetUserInfo],
  data: function() {
    return {
      user: {
        username: "", // 用户名
        userId: "", // 用户id
        account: ""
      },
      default_active: "", // 值是menuList里的index，这里index对应的是跳转路径
      menuList: []
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnInit();
    let active = vm.$route.path;
    vm.default_active = active;
    vm.initMenuList();
  },
  methods: {
    fnInit() {
      let vm = this;
      let infoName = "user_info";
      if (vm.$route.matched[0].name == "admin") {
        // 管理员
        infoName = "admin_info";
      } else {
        // 普通用户
        infoName = "user_info";
      }
      let user = JSON.parse(window.localStorage.getItem(infoName));
      vm.user.username = user.account;
      vm.user.userId = user.userId;
      vm.user.account = user.account;
    },
    handleSelect(index, indexPath) {
      let vm = this;
      let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if (w < 700) {
        vm.$emit("selectMenu");
      }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    initMenuList() {
      let num;
      // 0 用户菜单  1 管理员
      if (this.$route.matched[0].name == "admin") {
        num = "1";
      } else {
        num = "0";
      }
      this.menuList = comData.menuList(num, this);
    }
  },
  watch: {
    $route(to, from) {
      let vm = this;
      let active = to.path;
      this.default_active = active;
      if (to.matched[0].name != from.matched[0].name) {
        this.initMenuList();
      }
      vm.fnInit();
    }
  }
};
</script>
<style scoped lang='scss'>
.menuBox {
  height: 100%;
  overflow: auto;
  width: 2.75rem;
}
.navBox {
  background: rgba(20, 25, 35, 1);
}
.title_wrap {
  width: 100%;
  // padding-top: .2rem;
  // padding-bottom: .2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background: rgba(4, 41, 84, 1);
  text-align: center;
  color: #fff;
  .name {
    font-size: 0.24rem;
    font-weight: bold;
  }
  .id {
    font-size: 0.14rem;
    font-weight: 400;
    color: #fff;
  }
}
</style>
