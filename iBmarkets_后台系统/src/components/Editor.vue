<template>
  <div ref="editorElem" style="height:500px;" id="editor">
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  props: ['content','value'],
  data() {
    return {
        editor: null,
    };
  },
  model: {
      prop: 'value',
      event: 'change'
  },
  watch: {
      value (val) {
          let vm = this;
      }
  },
  mounted() {
    let vm = this;
    vm.fnEdit();
  },
  methods: {
    fnEdit () {
      let vm = this;
      vm.editor = new E('#editor');
      // 配置菜单栏
      vm.editor.customConfig.menus = [
        // 'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        // 'foreColor',  // 文字颜色
        // 'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        // 'quote',  // 引用
        // 'emoticon',  // 表情
        // 'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      // 监听内容变化
      vm.editor.customConfig.onchange = (html)=>{
          vm.$emit('change',html)
      }
      // 创建编辑器
      vm.editor.create();
      setTimeout(function(){
          vm.editor.txt.html(vm.value);
      },0)
    },
  }
};
</script>
<style lang="scss">
.w-e-text-container{
  height: 400px!important;
}
.w-e-toolbar{
  display: flex;
  flex-wrap: wrap;
}
</style>
