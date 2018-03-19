<template>
  <div class="full_layout">
    <results
      :results="results"
      @search="onSearch($event)"
      @getdoc="onGetDoc($event)"
      @deldoc="onDelDoc($event)">
    </results>
    <editor
      :visible="visible"
      :title="title"
      :initialText="doc.text"
      @textchange="onTextChange($event)">
    </editor>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import Results from './Results';
import Editor from './Editor';
Vue.component('results', Results);
Vue.component('editor', Editor);
export default {
  name: 'Full',
  computed: {
    visible() {
      return this.title !== undefined &&
        typeof this.title === 'string' &&
        this.title.length > 0;
    },
    title() {
      return this.$store.getters.docTitle;
    },
    doc() {
      return this.$store.getters.doc;
    },
    results() {
      return this.$store.getters.searchResults;
    }
  },
  methods: {
    onTextChange(textEvent) {
      // console.log(textEvent);
      this.$store.dispatch('modifyDoc', {title:this.title, doctext:textEvent});
    },
    onSearch(searchEvent) {
      // console.log("Searching for " + searchEvent);
      this.$store.dispatch('search', searchEvent);
    },
    onGetDoc(getDocEvent) {
      // console.log(getDocEvent);
      this.$store.dispatch('getDoc', getDocEvent);
    },
    onDelDoc(delDocEvent) {
      console.log("Receiving " + delDocEvent);
      this.$store.dispatch('deleteDoc', delDocEvent);
    }
  },
  watch: {
    title(val) {
      if(val !== undefined && val.length > 0) {
        console.log("focus");
        window.setTimeout(()=>{
          $('#textarea').focus();
        },500);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .full_layout {
    display: flex;
    flex-direction: row;

  }
</style>
