<template>
  <div class="my_account_invite" style="overflow: hidden;">
    <div class="item_title">
      <div style="float:left;">{{ $t('title.invite') }}</div>
    </div>
    <div class="item_box">
      <div class="item_list_box invite_bg">
        <el-row>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="6" :xl="7">
            <div class="left_box">
              <!-- <img src="../../../image/invitation_image2.png" alt> -->
              <canvas id="canvas"></canvas>
            </div>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="18" :xl="17">
            <div class="right_box">
              <div>
                <!-- 复制邀请链接或扫描二维码注册 -->
                <span style="font-size: .16rem;">{{ $t('Child.text1') }}</span>
                <!-- 复制 -->
                <el-button
                  @click="fnDoCopy"
                  size="small"
                  type="success"
                  style="margin-left: 10px;"
                >{{ $t('btn.copy') }}</el-button>
              </div>
              <div class="line" style="font-size: .14rem; color:rgba(131,184,255,1);">
                <a style="color: #000;" :href="path">{{ path }}</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import comData from "@/utils/data.js";
import QRCode from "qrcode";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "my_account_invite",
  mixins: [WatchScreen, MessageBox],
  data() {
    return {
      path: ""
    };
  },
  components: {},
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
      } else {
        // 普通用户
        infoName = "user_info";
      }
      let user = JSON.parse(window.localStorage.getItem(infoName));
      vm.path = window.encodeURI(
        `${comData.url}/#/login?inviteSuper=${user.account}`
      );
      window.localStorage.setItem("userCode", user.userCode);
      vm.useqrcode();
    },
    useqrcode() {
      let vm = this;
      let canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, vm.path, function(err) {
        if (err) {
        } else {
        }
      });
    },
    fnDoCopy() {
      let vm = this;
      vm.$copyText(vm.path).then(
        function(res) {
          // 复制成功
          vm.fnOpenMessageBox(vm.$t("alert.text5"), "success");
        },
        function(err) {
          // 复制失败
          vm.fnOpenMessageBox(vm.$t("alert.text6"), "error");
        }
      );
    }
  }
};
</script>

<style lang="scss">
.my_account_invite {
  .invite_bg {
    background: linear-gradient(
      270deg,
      rgba(20, 37, 94, 0.73),
      rgba(78, 176, 208, 0.73)
    );
    opacity: 0.9;
    background-size: cover;
    padding: 0.1rem;
  }
  .left_box {
    width: 1.63rem;
    margin: 0 auto;
  }
  .right_box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 1.63rem;
    justify-content: space-evenly;
  }
}
</style>
