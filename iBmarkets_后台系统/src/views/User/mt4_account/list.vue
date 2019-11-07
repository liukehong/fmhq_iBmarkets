<template>
    <div style="overflow: hidden;">
        <div class="item_title">{{ $t('title.MT4List') }}</div>
        <div class="item_box">
            <div class="item_table_box">
                <el-table
                    row-class-name="rowClassName"
                    header-row-class-name="headerRowClassName"
                    style="width: 100%;"
                    v-loading="loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :stripe="true"
                    :data="tableData">
                    <!-- 日期 -->
                    <el-table-column :label="$t('table.orderCreateTime')">
                        <template slot-scope="scope">
                            {{ scope.row.withdrawalApplyCreateTime }}
                        </template>
                    </el-table-column>
                    <!-- 金额 -->
                    <el-table-column prop="content" :label="$t('table.money')">
                        <template slot-scope="scope">
                            {{ scope.row.withdrawalApplyMoney }}
                        </template>
                    </el-table-column>
                    <!-- 手续费 -->
                    <el-table-column prop="content" :label="$t('table.serviceCharge')">
                        <template slot-scope="scope">
                            {{ scope.row.withdrawalApplyMoney-scope.row.withdrawalApplyTransferMoney }}
                        </template>
                    </el-table-column>
                    <!-- 实际金额 -->
                    <el-table-column prop="content" :label="$t('table.withdrawalApplyTransferMoney')">
                        <template slot-scope="scope">
                            {{ scope.row.withdrawalApplyTransferMoney }}
                        </template>
                    </el-table-column>
                    <!-- 状态 -->
                    <el-table-column prop="content" :label="$t('table.status')">
                        <template slot-scope="scope">
                            {{ STATUS(scope.row.withdrawalApplyStatus) }}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination_box">
                    <el-pagination
                        style="overflow: auto;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25, 30]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
  </template>
  <script>
    import WatchScreen from '@/mixins/watchScreen.js';
    import TableDate from '@/components/TableDate.vue';
    export default {
      name: 'FeedbackList',
      mixins: [ WatchScreen ],
      components: {
          TableDate,
      },
      data() {
        return {
          loading: false,
          currentPage: 1,
          tableData: [],
          params: {
              withdrawalApplyType: 0,
              withdrawalApplyStatus: '',
              account: '',
              pageSize: 10,
              page: 1,
          },
          total: 0,
        }
      },
      mounted: function (){
          let vm = this;
          vm.fnGetData();
      },
      methods: {
          // 审核状态
          STATUS (data) {
              let vm = this;
              if(data == 0){
                  // 申请中
                  return vm.$t('filters.examine_status1');
              }else if(data == 1){
                  // 审核通过 
                  return vm.$t('filters.examine_status2');
              }else if(data ==2){
                  // 审核驳回 
                  return vm.$t('filters.examine_status3');
              }else{
                  // 取消操作
                  return vm.$t('filters.examine_status4');
              }
          },
          // 每页要展示多少条
          handleSizeChange(val) {
            let vm = this;
            vm.params.pageSize = val;
            vm.fnGetData();
          },
          // 当前第几页
          handleCurrentChange(val) {
            let vm = this;
            vm.params.page = val;
            vm.fnGetData();
            vm.currentPage = val;
          },
          // 获取列表数据
          fnGetData () {
              let vm = this;
              let params = Object.assign({},vm.params);
              vm.loading = true;
              vm.$api.SYSTEM_GETWIDTHDRAWALAPPLYS(params).then((res)=>{
                  if(res.code == 0){
                      vm.tableData = res.data.list; // 列表
                      vm.total = res.data.total
                  }
                  vm.loading = false;
              })
          }
      }
    }
  </script>
<style lang="scss">

</style>
