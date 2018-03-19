<template>
  <div class="app_header_layout">
    <div class="logo">
      <span class="logotext">Tex</span>
    </div>
    <span class="fill">&nbsp;</span>
    <!-- <div class="create_layout"> -->
      <form class="create_layout" @submit="onCreate">
        <input class="modern" type="text" v-model="text" placeholder="New Title Name"/>
        <button class="modern" @click="onCreate"><i class="fa fa-plus" aria-hidden="true"></i></button>
      </form>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      text: ""
    }
  },
  methods: {
    onCreate() {
      if(this.text.length > 0) {
        this.$store.dispatch('createDoc', this.text);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app_header_layout {
    position: relative;
    height: 5rem;
    background-color: #732F35;
    display: flex;
    flex-direction: row;
  }
  .logo {
    position: relative;
    height: 100%;
    font-size: 3rem;
    padding-left: 1rem;
  }
  .logotext {
    vertical-align: middle;
    margin-top: 50%;
    padding-right: 3rem;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .fill {
    flex-grow: 1;
  }
  .create_layout {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    margin-top: 50%;
    padding-right: 3rem;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  input.modern[type="text"] {
    display: inline;
    background-color: rgba(255,255,255,.2);
    border:none;
    box-sizing: border-box;
    height: 3rem;
    border-radius: 1.5rem;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  button.modern {
    display: inline;
    height: 3rem;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.4);
    color: #8C7B86;
    border:none;
    border-radius: 1.5rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding-left: 1rem;
    padding-right: 1.5rem;
    cursor: pointer;
  }
</style>
