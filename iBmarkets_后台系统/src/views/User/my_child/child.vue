<template>
  <div class="my_child_child">
    <!-- 我的团队 -->
    <div class="item_title">{{ $t('title.myTeam') }}</div>
    <div class="item_box">
      <el-row v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
          <div
            class="item_table_box"
            style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px;"
          >
            <div style="overflow:hidden; padding-top: 20px;">
              <!-- 账户ID -->
              <el-input style="width: 200px;" size="small" v-model="account" :placeholder="$t('common.ID')"></el-input>
              <!-- 搜索 -->
              <el-button size="small" type="success" @click="fnSearch">{{ $t('btn.search') }}</el-button>
            </div>

            <div>
              <el-row>
                <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <div style="color: #333; font-size: .14rem; padding-top: .2rem;">{{ $t('Child.text9') }}：{{ gradeNumber }}</div>
                </el-col>
                <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <div style="color: #333; font-size: .14rem; padding-top: .2rem;">{{ $t('Child.text10') }}：{{ gradeMoney }}</div>
                </el-col>
                <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                  <div style="color: #333; font-size: .14rem; padding-top: .2rem;">{{ $t('Child.text11') }}：{{ number }}</div>
                </el-col>
              </el-row>
            </div>
            
              <el-tree
                v-if="showTree"
                style="margin-top: 20px;"
                :lazy="true"
                :load="loadNode1"
                :props="props1"
                @node-click="handleNodeClick"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <el-scrollbar style="height: 100%;">
                  <span style="color:rgb(9, 79, 247); padding-right: 10px;">{{ data.name }}</span>
                  <!-- 下级总数 -->
                  <span style="font-size: .12rem; padding-right: 10px;">{{ $t('Child.text4') }}：{{ data.numberPeople }}</span>
                  <span style="font-size: .12rem; padding-right: 10px;">{{ TYPE(data.gradeId) }}</span>
                  <!-- 加入时间 -->
                  <span style="font-size: .12rem; padding-right: 10px;">{{ $t('Child.text8') }}：{{ data.createTime||'--' }}</span>
                  <!-- 业绩 -->
                  <span
                    style="font-size: .12rem; padding-right: 10px; color:rgb(181, 202, 230);"
                  >{{ $t('Child.text5') }}：{{ data.performance||'--' }}</span>
                  <!-- 团队总业绩 -->
                  <span
                    style="font-size: .12rem; padding-right: 10px; color:rgb(181, 202, 230);"
                  >{{ $t('Child.text6') }}：{{ data.totalPerformance||'--' }}</span>
                  <!-- 配套等级 -->
                  <span
                    style="font-size: .12rem; padding-right: 10px; color:rgb(181, 202, 230);"
                  >{{ $t('Child.text7') }}：{{ data.highestMatchingId||'--' }}</span>
                  </el-scrollbar>
                </span>
              </el-tree>
            
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "my_child_child",
  mixins: [WatchScreen,MessageBox],
  inject: ['$main'],
  components: {},
  data() {
    return {
      gradeNumber: '',
      gradeMoney: '',
      number: '',
      account: "",
      loading: false,
      showTree: true,
      props1: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      userData: {
        totalPerformance: 0,
        performance: 0,
        numberPeople: 0
      }
    };
  },
  methods: {
    // 类型
    TYPE (data) {
      let vm = this;
      if (data == 0) {
        //普通会员
        return vm.$t('Home.text7'); 
      } else if( data == 1 ){
        //优质会员
        return vm.$t('Home.text8'); 
      }else if( data == 2 ){
        //资深会员
        return vm.$t('Home.text9'); 
      }else if( data == 3 ){
        //总代会员
        return vm.$t('Home.text10'); 
      }
    },
    // 搜索
    fnSearch() {
      let vm = this;
      vm.showTree = false;
      vm.$main.loading = true;
      setTimeout(function() {
        vm.showTree = true;
      }, 0);
    },
    fnInit(account, fn) {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .USER_GETSYBORDINATE({
          account: account
        })
        .then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            return fn([
              {
                name: res.data.account,
                account: vm.account,
                totalPerformance: res.data.totalPerformance, // 总业绩
                performance: res.data.performance, // 个人业绩
                gradeId: res.data.gradeId, // 会员id
                numberPeople: res.data.numberPeople, // 下级数量
                createTime: res.data.createTime, // 加入时间
                highestMatchingId: res.data.highestMatchingId||'--', // 配套等级
              }
            ]);
          } else {
            vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            return fn([]);
          }
        });
    },
    getData(data, fn) {
      let vm = this;
      vm.$api
        .USER_GETSYBORDINATE({
          account: data
        })
        .then(res => {
          let list = [];
          if (res.datas.length > 0) {
            res.datas.forEach((item, index) => {
              list.push({
                name: item.account,
                account: item.account,
                totalPerformance: item.totalPerformance, // 总业绩
                performance: item.performance, // 个人业绩
                gradeId: item.gradeId, // 会员id
                numberPeople: item.numberPeople, // 下级数量
                createTime: item.createTime, // 加入时间
                highestMatchingId: item.highestMatchingId, // 配套等级
              });
            });
          }
          return fn(list);
        });
    },
    handleNodeClick(data) {},
    loadNode1(node, resolve) {
      let vm = this;
      if (node.level === 0) {
        let user = JSON.parse(window.localStorage.getItem("userInfo"));
        vm.fnInit(vm.account, resolve);
      } else {
        let account = node.data.account || "";
        vm.getData(account, resolve);
      }
    }
  },
  mounted: function () {
    let vm = this;
    vm.$api.USER_USERUPGRADEINFO().then(res=>{
      vm.gradeNumber = res.data.gradeNumber;
      vm.gradeMoney = res.data.gradeMoney;
      vm.number = res.data.number;
    })
  },
};
</script>
<style lang="scss">
.my_child_child{
  .item_box{
    background: none;
  }
}
.el-tree-node {
  white-space: pre-wrap!important;
}
</style>
