<template>
  <div class="results_layout">
    <div class="inner_layout">
      <div style="margin-left: 1.5rem;">
        Search titles:
      </div>
      <input class="modern" type="text" v-model="query" placeholder="Characters in Title"/>
      <div class="result_div" v-for="result in computedResults" @click="onClickResult(result)">
        <span>{{result}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    results: Array
  },
  data () {
    return {
      query: ""
    }
  },
  computed: {
    computedResults() {
      return [].concat(this.results);
    }
  },
  methods: {
    onClickResult(result) {
      console.log("Sending " + result);
      this.$emit('getdoc', result);
    }
  },
  watch: {
    query(val) {
      this.$emit('search', this.query);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .results_layout {
    background-color: #403924;
    color: #8C7B86;
  }
  .inner_layout {
    margin: 1.5rem;
    margin-top: 3rem;
  }
  .result_div {
    font-weight: bold;
    cursor: pointer;
    padding: 1rem;
    border-top: solid 3px #261D1E;
    border-bottom: solid 3px #261D1E;
    margin-bottom: 3px;
  }
  input.modern {
    background-color: rgba(255,255,255,.2);
    border:none;
    box-sizing: border-box;
    height: 3rem;
    border-radius: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top:.5rem;
    margin-bottom: 1rem;
  }
</style>
