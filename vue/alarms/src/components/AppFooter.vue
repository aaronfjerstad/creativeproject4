<template>
  <div class="app_footer_layout">
    <div class="fill">
      &nbsp;
    </div>
    <div class="copyright">&copy;Aaron Fjerstad 2018</div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app_footer_layout {
    display:flex;
    flex-direction: column;
    text-align: center;
    height: 3rem;
    background-color: #732F35;
  }
  .fill {
    flex-grow: 1;
  }
  .copyright {
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>
