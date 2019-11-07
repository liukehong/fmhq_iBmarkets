<template>
  <div class="header" style="color: rgba(23,16,79,1);">
    <div class="lgout" @click="fnBack" style="float:right; cursor:pointer;">
      <a>
        <i></i>
        <!-- 退出 -->
        <span style="padding-left: .1rem;">{{ $t('btn.signOut') }}</span>
      </a>
    </div>
    <div
      v-if="!!!isAdmin"
      @click="fnUpload"
      class="upload_box"
      style="float:right; cursor:pointer;"
    >
      <i class="el-icon-upload"></i>
      <span style="padding-left: .1rem;">{{ $t('btn.newGuide') }}</span>
    </div>
    <div
      class="date"
      style="float:right; color: rgba(23,16,79,1)"
    >{{ $t('common.hello') }}，{{ name||'--' }}</div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: ["showHeader"],
  inject: ["$main"],
  data() {
    return {
      name: "Admin",
      novice: "",
      isAdmin: false
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    fnInit() {
      let vm = this;
      let infoName = "user_info";
      if (this.$route.matched[0].name == "admin") {
        // 管理员
        infoName = "admin_info";
        vm.isAdmin = true;
      } else {
        // 普通用户
        infoName = "user_info";
      }
      let user = JSON.parse(window.localStorage.getItem(infoName));
      vm.name = user.nickname;
      if (!!window.localStorage.getItem("novice")) {
        vm.novice = window.localStorage.getItem("novice");
      }
    },
    // 下载新手指南
    fnUpload() {
      let vm = this;
      window.open(JSON.parse(vm.novice), "_blank");
    },
    fnBack() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.USER_LOGOUT().then(res => {
        vm.$main.loading = false;
        if (this.$route.matched[0].name == "admin") {
          // 管理员退出
          window.localStorage.removeItem("admin_token");
          vm.$router.push("/admin_login");
        } else {
          // 普通用户退出
          window.localStorage.removeItem("user_token");
          vm.$router.push("/login");
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      let vm = this;
      vm.fnInit();
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/base.scss";
.header {
  height: 100%;
  width: 100%;
  font-size: 0.16rem;
  .upload_box {
    height: 0.7rem;
    padding: 0 0.4rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    color: #000;
  }
  .lgout {
    height: 0.7rem;
    padding: 0 0.4rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    a {
      display: block;
      overflow: hidden;
      line-height: 0.17rem;
      font-size: 0.14rem;
      color: rgba(23, 16, 79, 1);
      i {
        display: block;
        width: 0.18rem;
        height: 0.16rem;
        background-image: url("../lkh_images/home_icon3.png");
        background-size: contain;
        background-repeat: no-repeat;
        float: left;
      }
    }
    padding: 0 0.4rem;
    .back_icon {
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .date {
    margin-right: 0.2rem;
    @media screen and (max-width: $smallSize) {
      display: none;
    }
  }
}
</style>
