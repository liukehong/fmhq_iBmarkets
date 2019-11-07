<template>
  <div class="home_grade" style="overflow: hidden;">
    <div class="item_title">
      <!-- 我的等级 -->
      <div style="float:left;">{{ $t('title.grade') }}</div>
    </div>
    <div class="box_1">
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
          <div class="box_1_left">
            <div class="left_img">
              <img :src="gradeId|TYPE" alt>
            </div>
            <div class="left-title">{{ memberGrade }}</div>
            <!-- <div class="left-num">300,000USD</div> -->
          </div>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
            <el-row class="box_wrap">
                <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="box_1_right">
                        <div class="right_money">${{ oData.totalDeposit|FORMATTED_NUMBER }}</div>
                        <!-- 团队业绩 -->
                        <div class="right_title">{{ $t('Home.text12') }}</div>
                    </div>
                </el-col>
                <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div class="box_1_right">
                        <div class="right_money">{{ childData.length }}</div>
                        <!-- 我的下属 -->
                        <div class="right_title">{{ $t('Home.text13') }}</div>
                        <!-- 查看下属 -->
                        <el-button @click="fnRouteChange" size="small" type="success">{{ $t('btn.subordinate') }}</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "home_grade",
  mixins: [WatchScreen],
  data() {
    return {
      oData: '',
      grade: '',
      childData: '',
      gradeId: 0,
    };
  },
  computed: {
    memberGrade: function () {
      let vm = this;
      let data = vm.gradeId;
      if (data == 0) {
        // 普通会员
        return this.$t("Home.text7");
      } else if (data = 1) {
        // 优质会员
        return this.$t("Home.text8");
      } else if (data = 2) {
        // 资深会员
        return this.$t("Home.text9");
      } else {
        // 总代会员
        return this.$t("Home.text10");
      }
    }
  },
  filters: {
    TYPE: function (data){
      return `../../../../static/image/grade${data}.png`
    }
  },
  mounted: function () {
    let vm = this;
    vm.fnGetData();
    vm.getGrade();
    vm.fnGetChild();
  },
  methods: {
    // 路由跳转
    fnRouteChange() {
      let vm = this;
      vm.$router.push("my_child");
    },
    // 获取会员等级
    getGrade () {
      let vm = this;
      let infoName = "user_info";
      if (this.$route.matched[0].name == "admin") {
        // 管理员
        infoName = "admin_info";
      } else {
        // 普通用户
        infoName = "user_info";
      }
      let data = JSON.parse(window.localStorage.getItem(infoName));
      vm.gradeId = data.gradeId;
    },
    // 获取团队当前业绩
    fnGetData () {
      let vm = this;
      vm.$api.LOGGING_ISPERFORMANCE({
        account: '',
      }).then(res=>{
        if(res.code == 0){
          vm.oData = res.data;
        }
      })
    },
    // 查询下属
    fnGetChild () {
      let vm = this;
      vm.$api.USER_GETSYBORDINATE({
        userId: '',
      }).then(res=>{
        if(res.code == 0){
          vm.childData = res.datas;
        }
      })
    }
  }
};
</script>

<style lang="scss">
.p_l {
  padding-left: 0px !important;
}

.home_grade {
  .left_box {
    height: 1.63rem;
    width: 1.63rem;
  }
  .right_box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 1.63rem;
    justify-content: space-evenly;
  }
  .box_3 {
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  .box_1 {
    background: rgba(76, 87, 106, 1);
    border-radius: 20px;
    overflow: hidden;
    .box_1_left {
      height: 2.32rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left_img {
        // width: 0.99rem;
        // height: 0.87rem;
      }
      .left-title {
        margin-top: 0.04rem;
        font-size: 0.18rem;
      }
      .left-num {
        font-size: 0.12rem;
        line-height: 0.2rem;
        color: rgba(145, 141, 133, 1);
      }
    }
    .box_1_right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 2.32rem;
      .right_money {
        font-size: 0.3rem;
        margin-bottom: 0.33rem;
      }
      .right_title {
        font-size: 0.18rem;
        padding-bottom: 0.2rem;
      }
    }
  }
  .box_wrap{
      background: url("../../../lkh_images/grade_bg.png") no-repeat;
      background-size: cover;
  }
}
</style>
