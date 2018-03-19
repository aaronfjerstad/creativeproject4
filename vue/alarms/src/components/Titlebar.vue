<template>
  <div class="titlebar_layout">
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Titlebar',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titlebar_layout {
    min-height: 3rem;
    background-color: #403924;
    color: #8C7B86;
    font-size: 2rem;
    font-weight: bold;
  }
  .title {
    margin-left: 3rem;
    margin-bottom: 1rem;
  }
</style>
