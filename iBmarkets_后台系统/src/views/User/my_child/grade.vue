<template>
  <div class="my_child_grade" style="overflow: hidden;">
    <div class="item_title">
      <div style="float:left;">{{ $t('title.gradeInfo') }}</div>
    </div>
    <div class="item_box">
      <div class="item_list_box grade_bg">
          <el-row>
              <el-col v-for="item in list" :key="item.name" class="grade_wrap" :class="screenSize == 1?'p_b':''" :span="24" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" style="padding-bottom: 30px;">
                  <div class="img_box">
                      <img :src="item.url" alt="">
                  </div>
                  <div class="img_member">{{ item.name }}</div>
                  <!-- 最低团队需求 -->
                  <div class="img_demand">{{ $t('Child.text2') }}</div>
                  <div class="img_demand">{{ item.demand1 }}</div>
                  <!-- 团队业绩 -->
                  <div class="img_demand">{{ $t('Child.text3') }}</div>
                  <div class="img_demand">{{ item.demand2 }}</div>
              </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "my_child_grade",
  mixins: [WatchScreen],
  data() {
    return {
         list: [
            {
                url: '../../../../static/image/grade0.png',
                name: this.$t('Home.text7'), // 普通会员
                demand1: '--',
                demand2: '--',
            },
            {
                url: '../../../../static/image/grade1.png',
                name: this.$t('Home.text8'), // 优质会员
                demand1: 2,
                demand2: '300,000',
            },
            {
                url: '../../../../static/image/grade2.png',
                name: this.$t('Home.text9'), // 资深会员
                demand1: 3,
                demand2: '600,000',
            },
            {
                url: '../../../../static/image/grade3.png',
                name: this.$t('Home.text10'), // 总代会员
                demand1: 4,
                demand2: '900,000',
            },
        ]
    };
  },
};
</script>
<style lang="scss">
.my_child_grade{
    .item_list_box{
        padding: .05rem;
    }
    color: #fff;
    .grade_bg{
        background: url('../../../lkh_images/mygrade_bg.png') no-repeat;
        background-size: cover;
        border-radius: .2rem;
        overflow: hidden;
    }
    .grade_wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img_box{
            width: .66rem;
            height: .78rem;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .img_member{
            font-size: .16rem;
            padding-bottom: .05rem;
            padding-top: .05rem;
        }
        .img_demand{
            font-size: .14rem;
            color: rgba(178, 212, 255, 1);
            height: .22rem;
            line-height: .22rem;
        }
    }
}
</style>
