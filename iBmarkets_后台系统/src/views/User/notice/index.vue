<template>
  <transition name="fade">
    <div>
      <el-row>
        <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <List></List>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import List from './list';


export default {
  mixins: [WatchScreen],
  name: "mt4_account",
  data() {
    return {};
  },
  components: {
    List
  },
  methods: {}
};
</script>

<style lang="scss">
.p_l{
    padding-left: 0px;
}
.p_r{
    padding-right: 0px!important;
}
.m_b_10{
    margin-bottom: 10px;
}
.m_t_10{
    margin-top: 10px;
}
</style>
