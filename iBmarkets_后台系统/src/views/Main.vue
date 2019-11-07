<template>
  <section v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.9)" class="wrap system_container">
    <div class="header_top" :class="{'open':open}">
      <div class="logo_box">
        <div class="logo">
          <div class="logo_child">
            <img src="./../lkh_images/logo.png" alt>
            <div>INTEGRATED BROKERS</div>
          </div>
          <!-- <img src='./../image/home_logo@2x.png' alt=''> -->
        </div>
      </div>
    </div>
    <aside class="sidebar_box" :class="{'open': open}">
      <the-nav @selectMenu="open=true"/>
      <!-- 底部背景 -->
      <div class="menu_bg"></div>
    </aside>
    <section class="right_container" :class="{'open': open}">
      <el-header class="header" height=".7rem">
        <el-button class="menuBtn" id="menuBtn" icon="el-icon-tickets" @click="handleOpen"/>
        <the-header style="color:#fff;" v-show="showHeader"/>
      </el-header>
      <div class="main">
        <el-scrollbar style="height: 100%;">
          <div class="container">
            <router-view></router-view>
          </div>
        </el-scrollbar>
      </div>
    </section>
  </section>
</template>
<script>
import WatchScreen from "../mixins/watchScreen.js";
import TheHeader from "@/components/TheHeader";
import TheNav from "@/components/TheNav";
export default {
  name: "home",
  mixins: [WatchScreen],
  provide() {
    return {
      $main: this
    };
  },
  data() {
    return {
      open: false, // true是隐藏左侧菜单
      name: "wxx",
      smallSize: false, // true是小屏幕的情况
      loading: false
    };
  },
  computed: {
    showHeader: function() {
      let vm = this;
      if (vm.screenSize == 1) {
        return true;
      } else if (vm.screenSize == 2) {
        if (!!vm.open) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  components: {
    TheHeader,
    TheNav
  },
  mounted: function() {
    let vm = this;
    document.addEventListener("click", function(e) {
      let _div = document.getElementsByClassName("menuBox")[0];
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      // if(!!!_div.hasOwnProperty('contains')){
      //   return false;
      // }
      try {
        if (_div.contains(e.target)) {
        } else {
          let type = document.getElementsByClassName("menuBtn")[0];
          if (type.contains(e.target)) {
          } else {
            if (vm.screenSize == 2) {
              vm.open = true;
            }
          }
        }
      } catch (err) {}
      return false;
    });
  },
  methods: {
    handleOpen() {
      this.open = !this.open;
    }
  },
  watch: {
    screenSize(val) {
      let vm = this;
      vm.open = val == 1 ? false : true;
    }
  }
};
</script>
<style lang="scss">
@import "~@/common/css/base.scss";
.header_top {
  @media screen and (max-width: $smallSize) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
  }
  &.open {
    display: none;
  }
}
.menuBtn {
  z-index: 999;
}
.logo_box {
  box-shadow: 0px 0px 13px 0px rgba(83, 93, 113, 0.33);
  width: 2.75rem;
  height: 1.36rem;
  .logo {
    background: rgba(197, 228, 248, 1);
    height: 100%;
    position: relative;
    overflow: hidden;
    .logo_child {
      width: 100%;
      height: 0.62rem;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      position: absolute;
      img {
        display: block;
        width: 1.51rem;
        height: 0.32rem;
        margin: 0 auto;
      }
      div {
        text-align: center;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.12rem;
        color: rgba(137, 137, 137, 1);
      }
    }
  }
}
.system_container {
  margin-left: -5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
  .sidebar_box {
    background: linear-gradient(270deg, rgba(20, 37, 94, 0.73), #24588e);
    overflow: auto;
    box-sizing: border-box;
    flex-shrink: 0;
    width: 2.75rem;
    position: fixed;
    top: 1.36rem;
    bottom: 0;
    &.open {
      display: none;
    }
    @media screen and (max-width: $smallSize) {
      position: fixed;
      left: 0;
      top: 1.36rem;
      bottom: 0;
      z-index: 999;
    }
    .menu_bg {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 2.75rem;
      height: 3.3rem;
      background: url("../lkh_images/menu_bg2.png") no-repeat;
      z-index: -1;
    }
  }
  .right_container {
    display: flex;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    flex-direction: column;
    @media screen and (max-width: $smallSize) {
      transition: transform 0.1s;
      transform: translateX(2.85rem);
      &.open {
        transform: translateX(0);
      }
    }
    .el-header {
      position: relative;
      line-height: 0.7rem;
      border-bottom: 1px solid rgba(47, 57, 81, 1);
      .el-button {
        background-color: rgba(110, 194, 47, 1);
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        box-shadow: 0px 3px 0px 0px rgba(255, 255, 255, 0.4);
        border-radius: 5px;
        border: 1px solid;
      }
    }
  }
}
.main {
  background: url("../lkh_images/content_pg.png") no-repeat;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 0;
}
</style>


