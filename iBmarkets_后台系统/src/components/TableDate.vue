<template>
  <el-row class="time_label">
    <el-col :span="24" :xs="24" :sm="7" :md="5" :lg="3">
      <!-- 开始日期 -->
      <el-date-picker
      size="small"
        style="width:100%;"
        @change="fnStartChange"
        v-model="params.startTime"
        type="date"
        :value-format="!!!format?'timestamp':format"
        :placeholder="$t('common.startTime')"
      ></el-date-picker>
    </el-col>
    <!-- 至 -->
    <el-col :span="24" class="hidden-xs-only history_to" :sm="1" style="text-align:center; line-height: 30px; color: #606266;">{{ $t('common.to') }}</el-col>
    <el-col :span="24" :xs="24" :sm="7" :md="5" :lg="3">
      <!-- 结束日期 -->
      <el-date-picker
      size="small"
        style="width:100%;"
        @change="fnEndChange"
        :picker-options="endDatePicker"
        v-model="params.endTime"
        :disabled="!!!params.startTime?true:false"
        :value-format="!!!format?'timestamp':format"
        type="date"
        :placeholder="$t('common.endTime')"
      ></el-date-picker>
    </el-col>
  </el-row>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
  name: "TableDate",
  props: ['format'],
  data() {
    return {
      params: {
        startTime: "",
        endTime: ""
      },
      endDatePicker: this.processDate()
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 结束时间范围
    processDate() {
      let vm = this;
      return {
        disabledDate(time) {
          if (vm.params.startTime) {
            return vm.params.startTime >= +new Date(time);
          }
        }
      };
    },
    // 开始时间选择
    fnStartChange(val) {
      let vm = this;
      // 开始时间变化时
      if (!!!val) {
        vm.params.startTime = "";
        vm.params.endTime = "";
        // vm.fnGetData();
        vm.$emit("changeDate", vm.params);
      }
    },
    // 结束时间选择
    fnEndChange(val) {
      let vm = this;
      if (!!val) {
        // vm.fnGetData();
        vm.$emit("changeDate", vm.params);
      } else {
        vm.endTime = "";
      }
    }
  }
};
</script>
<style lang="scss">
.el-date-editor .el-range-separator {
  // width: 10%;
}
</style>
