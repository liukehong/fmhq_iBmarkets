<template>
  <div class="home_news" style="overflow: hidden;">
    <!-- 企业要闻 -->
    <div class="item_title">{{ $t('title.news') }}</div>
    <el-row class="main_wrap">
        <el-col v-for="(item,index) in list" v-if="index<4" :key="item.newsId" style="padding-right: 20px; margin-bottom: 20px; cursor:pointer;" :class="screenSize == 1?'':'p_r'" :span="24" :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="aItem" @click="fnSeeNews(item.newsAddress)">
                <div class="aItem_img" v-bind:style="{backgroundImage:'url(' + item.newsImageAddress + ')'}"></div>
                <div class="aItem_title line">{{ item.newsTitle }}</div>
                <div class="aItem_time">{{ item.newCreationTime }}</div>
                <!-- <div class="aItem_content line2">{{ item.newsTitle }}</div> -->
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
export default {
  name: "home_news",
  mixins: [WatchScreen, GetUserInfo],
  data() {
    return {
      list: '',
      params: {
        pageSize: 10,
        page: 1,
        newsLanguage: '',
      },
    };
  },
  mounted: function () {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 新闻跳转
    fnSeeNews: function (data) {
      let vm = this;
      window.open(data,"_blank");
    },
    fnGetData: function () {
      let vm = this;
      let params = Object.assign({}, vm.params);
      vm.$api.SYSTEM_GETNEWS(params).then(res=>{
        if(res.code == 0){
          vm.list = res.data.list;
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
.home_news {
  .main_wrap{
      height: 2.48rem;
      .aItem{
          // background: rgba(35, 96, 166, 0.1);
          background:linear-gradient(270deg,rgba(20,37,94,0.73),rgba(78,176,208,0.73));
          border-radius: 20px;
          height: 2.48rem;
      }
      .aItem_img{
          width: 100%;
          height: 1.18rem;
          background: url('../../../lkh_images/news1.png');
          background-repeat: no-repeat;
          background-size: cover;
      }
      .aItem_title{
          padding: .15rem .17rem 0px .17rem;
          font-size: .14rem;
          color: #fff;
      }
      .aItem_time{
          padding: .15rem .17rem 0px .17rem;
          font-size: .14rem;
          color: #fff;
      }
      .aItem_content{
          padding: .15rem .17rem 0px .17rem;
          font-size: .14rem;
          color: #fff;
      }
  }
}
</style>
