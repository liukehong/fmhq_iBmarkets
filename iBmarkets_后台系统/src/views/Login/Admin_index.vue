<template>
  <div class="login_bg" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 切换语言 -->
    <div class="langBox">
      <el-select
        @change="fnLanguageChange"
        style="width: 100%;"
        v-model="value"
        :placeholder="$t('form.please')"
      >
        <el-option
          v-for="item in languageList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <Enter v-if="pageType == 'login'"></Enter>
    <Forget v-if="pageType == 'forget'"></Forget>
    <RegIster v-if="pageType == 'register'"></RegIster>
  </div>
</template>

<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import axios from "axios";
import Enter from "./Admin_enter";
import Forget from "./Forget";
import RegIster from "./RegIster";
export default {
  name: "MainLogin",
  provide() {
    return {
      p: this
    };
  },
  components: {
    Enter,
    Forget,
    RegIster
  },
  data() {
    return {
      loading: false,
      pageType: "login",
      inviteSuper: "",
      value: "zh", // 语言种类
      languageList: [
        {
          name: "中文简体",
          value: "zh"
        },
        {
          name: "English",
          value: "en"
        },
        {
          name: "日本語",
          value: "jp"
        }
      ]
    };
  },
  mounted: function() {
    let vm = this;
    if (window.localStorage.getItem("locale")) {
      vm.value = window.localStorage.getItem("locale");
    } else {
      window.localStorage.setItem("locale", vm.value);
    }
    // 判断
    let url = window.location.href;
    let name;
    let arrs = url.split("?");
    if (arrs.length > 1) {
      name = arrs[1].split("=")[1];
      // this.inviteSuper = name;
      // this.pageType = 'register';
    }
    if (!!window.localStorage.getItem("userCode")) {
      if (!!name) {
        let userCode = window.localStorage.getItem("userCode");
        this.inviteSuper = userCode;
        this.pageType = "register";
      }
    }
  },
  methods: {
    // 语言切换
    fnLanguageChange(val) {
      let vm = this;
      vm.value = val;
      window.localStorage.setItem("locale", vm.value);
      vm.$i18n.locale = val;
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/base.scss";
.select_wrap .el-input-group__append,
.select_wrap .el-input-group__prepend {
  // background: none;
  // border:none;
}
.el-scrollbar__wrap {
  margin-bottom: 0px !important;
}
.login_bg {
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  background-image: url("../../lkh_images/bg.png");
  background-size: cover;
  min-height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  .langBox {
    position: fixed;
    width: 1.3rem;
    height: 0.3rem;
    top: 5px;
    right: 10px;
    input.el-input__inner {
      background: rgba(1, 11, 33, 0.6);
      color: #fff;
    }
  }
  .login_box_bg {
    width: 3.65rem;
    // background-color: #3c424a;
    // background: rgba(27, 33, 44, .7);
    background: linear-gradient(
      270deg,
      rgba(20, 37, 94, 0.73),
      rgba(78, 176, 208, 0.73)
    );
    box-shadow: 0px 0px 16px 8px rgba(30, 49, 108, 0.31);
    border-radius: 5px;
    -webkit-box-shadow: 0 0 1rem #000;
    box-shadow: 0 0 1rem #000;
    overflow: hidden;
    color: #fff;
    padding-top: 0.51rem;
    @media screen and (max-width: $ipad_width) {
      width: 100%;
      height: 100%;
      border: none;
      overflow: auto;
    }
    .login_logo {
      width: 1.4rem;
      margin: 0.3rem auto;
      img {
        border: 0;
        width: 100%;
        display: block;
        vertical-align: middle;
      }
    }
    .login_form {
      padding: 0 0.6rem;
      // margin-bottom: 0.5rem;
      .login_input {
        margin-top: 0.28rem;
        p {
          margin-bottom: 0.1rem;
          font-size: 0.14rem;
        }
      }
      .el-input-mixin {
        width: 73%;
        float: left;
        input {
          border-radius: 4px 0px 0px 4px;
        }
      }
      .img-box {
        width: 27%;
        float: left;
        height: 32px;
        margin-top: 4px;
        border-radius: 0px 4px 4px 0px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .login_btn_box {
      padding: 0.24rem 0.6rem 0.48rem 0.6rem;
      .login-btn {
        width: 100%;
        height: 0.35rem;
        margin: 0 auto;
        line-height: 0.3;
      }
      .login_a {
        margin-top: 0.23rem;
        overflow: hidden;
        a {
          font-size: 0.14rem;
          text-decoration: underline;
          color: #fff;
          cursor: pointer;
        }
        a:first-child {
          float: left;
        }
        a:last-child {
          float: right;
        }
      }
      .login_back {
        text-align: center;
        margin-top: 0.16rem;
        font-size: 0.12rem;
        a {
          cursor: pointer;
          text-decoration: underline;
          color: rgba(219, 255, 255, 1);
        }
      }
    }
  }
}
</style>
