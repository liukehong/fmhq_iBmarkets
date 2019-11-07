<template>
  <div class="item_table_box">
    <el-row>
      <el-col
        v-for="(item,index) in productList"
        :key="item.name"
        class="col-item"
        :span="24"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <div class="box">
          <div class="box_img">
            <img :src="item.matchingImage" alt>
          </div>
          <!-- <div class="box_title">{{ item.matchingName }}</div> -->
          <!-- 预期月汇报能力 -->
          <div style="font-size: .2rem; padding-bottom: .2rem; padding-top: .2rem;">{{ FnTitle(index) }}</div>
          <div class="box_money" style="font-size: .4rem; padding-bottom: .2rem;">{{ item.matchingMoneyLowest }}</div>
          <div class="box_num">{{ parseInt(item.matchingProfitLowest*100) }}%~{{ parseInt(item.matchingProfitHighest*100) }}%</div>
          <div class="box_ablity">{{ $t('user_product.text1') }}</div>
          <div class="box_select">
            <!-- 购买 -->
            <el-button
              @click="fnBuy(item)"
              style="width: 70%;"
              type="primary"
            >{{ $t('btn.buy') }}</el-button>
          </div>
          <!-- 佣金层级 -->
          <div class="level_box">
              {{ $t('admin_transfer.text2') }}：{{ item.matchingLevel }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "product_buy",
  mixins: [WatchScreen],
  inject: ["p","$main"],
  components: {},
  data() {
    return {
        productList: [],
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    FnTitle (index) {
      let vm = this;
      return vm.$t(`Account.text${index+1}`);
    },
    // 获取列表数据
    fnGetData() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.MATCHING_GETMATCHINGS().then(res=>{
          vm.$main.loading = false;
          vm.productList = res.data;
      })
    },
    // 购买配套
    fnBuy (data) {
        let vm = this;
        vm.p.info = data;
        vm.p.pageType = 'buy';
    },
  }
};
</script>
<style lang="scss">
.col-item{
    padding:.2rem;
}
.box {
  padding-left: 0.38rem;
  padding-right: 0.38rem;
  overflow: hidden;
  width: 100%;
  background:linear-gradient(270deg,rgba(20,37,94,0.73),rgba(78,176,208,0.73));
  border-radius: 0.04rem;
  text-align: center;
  .box_img {
    padding-top: 0.61rem;
    img {
      width: .71rem;
      height: .81rem;
      display: block;
      margin: 0 auto;
    }
  }
  .box_title {
    padding-top: 0.34rem;
    font-size: 0.24rem;
    font-weight: bold;
    padding-bottom: 0.3rem;
  }
  .box_text {
    height: 1.5rem;
    p {
      color: #fff;
      font-size: 0.16rem;
    }
  }
  .box_num {
    // padding-top: .59rem;
    padding-bottom: .2rem;
    font-size: 0.3rem;
    font-weight: bold;
    padding-top: 0.19rem;
  }
  .box_ablity {
    font-size: 0.16rem;
    margin-bottom: .4rem;
    color: #fff;
  }
  .box_select {
    padding-bottom: 0.2rem;
  }
  .box_see {
    padding-bottom: 0.6rem;
  }
  .level_box{
      font-size: .16rem;
      padding-bottom: .45rem;
  }
}
</style>
