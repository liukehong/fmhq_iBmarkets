<template>
  <el-dialog :show-close="false" v-if="dialogVisible" title="" @close="hideModal" :visible="dialogVisible" width="30%">
    <img style="width: 100%; height: 100%; display:block;" :src="path" alt="">
    <span slot="footer" class="dialog-footer">
    </span>
  </el-dialog>
</template>



<script>
export default {
  props: [
    'path',
    'dialogVisible',
  ],
  data() {
    return {
    };
  },
  methods: {
      hideModal: function () {
          let vm = this;
          vm.$emit('changeUrl');
      }
  }
};
</script>