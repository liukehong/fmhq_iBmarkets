<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <el-row>
        <el-col style="margin-bottom: 10px;" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- 表单 -->
          <Send></Send>
        </el-col>
        <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- 列表 -->
          <List :time="time"></List>
        </el-col>
      </el-row>
      
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import Send from './send';
import List from './list';

export default {
  mixins: [WatchScreen],
  name: "my_account",
  provide () {
    return {
      p: this
    }
  },
  data() {
    return {
      time: 112233
    };
  },
  components: {
    Send,
    List
  },
  methods: {}
};
</script>

<style lang="scss">
.p_l{
    padding-left: 0px;
}
.m_b_10{
    margin-bottom: 10px;
}
.m_t_10{
    margin-top: 10px;
}
</style>
