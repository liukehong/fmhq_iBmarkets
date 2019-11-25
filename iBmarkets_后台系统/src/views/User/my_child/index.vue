<template>
  <transition name="fade">
    <div class="my_child_index" style="overflow: hidden;">
      <el-row>
        <!-- 邀请注册 -->
        <el-col style="margin-bottom: 10px; padding-right:20px;" :class="screenSize == 1?'':'p_r'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <Invite></Invite>
        </el-col>
        <!-- 等级查看 -->
        <el-col style="margin-bottom: 10px; padding-right:20px;" :class="screenSize == 1?'':'p_r'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <Grade></Grade>
        </el-col>
      </el-row>
      <el-row>
        <!-- 业绩查询 -->
        <el-col style="margin-bottom: 10px; padding-right: 20px;" :class="screenSize == 1?'':'p_r'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <Performance></Performance>
        </el-col>
        <!-- 我的团队 -->
        <el-col style="margin-bottom: 10px;" :class="screenSize == 1?'':'p_r'" class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <Child></Child>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import Child from './child';
import Invite from './invite';
import Grade from './grade';
import Performance from './performance';
import List from './list';
export default {
  mixins: [WatchScreen],
  name: "my_child_index",
  data() {
    return {
    };
  },
  components: {
      Child,
      Invite,
      Grade,
      Performance,
      List,
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>
