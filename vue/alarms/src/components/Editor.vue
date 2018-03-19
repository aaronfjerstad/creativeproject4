<template>
  <div class="editor_layout">
    <titlebar
      :title="title">
    </titlebar>
    <text-body
      class="text_body_layout"
      :visible="visible"
      :initialText="initialText"
      @textchange="onTextChange($event)">
    </text-body>
  </div>
</template>

<script>
import Vue from 'vue';
import Titlebar from './Titlebar';
import TextBody from './TextBody';
Vue.component('titlebar', Titlebar);
Vue.component('text-body', TextBody);
export default {
  name: 'Editor',
  props: {
    visible: Boolean,
    title: String,
    initialText: String
  },
  methods: {
    onTextChange(textEvent) {
      this.$emit('textchange', textEvent);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editor_layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #403924;
  }
  .text_body_layout {
    flex-grow: 1;
  }
</style>
