<template>
  <div class="results_layout">
    <div class="inner_layout">
      <div style="margin-left: 1.5rem;">
        Search titles:
      </div>
      <form class="modern" @submit.prevent="onSubmit">
        <input class="modern" type="text" v-model="query" placeholder="Characters in Title"/>
        <button class="modern" @click="onSubmit"><i class="fa fa-search" aria-hidden="true"></i></button>
        <!-- <input class="modern" type="submit" value="Search"/> -->
      </form>

      <div class="result_div" v-for="result in computedResults" @click="onClickResult(result)">
        <span class="result_delete" @click.stop="onDelete(result)">x</span>
        <span class="result_text">{{result}}</span>
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
    onDelete(result) {
      console.log("Sending " + result);
      this.$emit('deldoc', result);
    },
    onClickResult(result) {
      this.$emit('getdoc', result);
    },
    onSubmit() {
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
    min-height: 80%;
    margin: 1.5rem;
    margin-top: 3rem;
    overflow-y: auto;
  }
  .result_div {
    font-weight: bold;
    cursor: pointer;
    padding: 1rem;
    border-top: solid 3px #261D1E;
    border-bottom: solid 3px #261D1E;
    margin-bottom: 3px;
  }
  form.modern {
    display: flex;
    flex-direction: row;
  }
  input.modern {
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
    margin-top:.5rem;
    margin-bottom: 1rem;
  }
  button.modern {
    display: inline;
    background-color: rgba(0,0,0,0.3);
    color: #8C7B86;
    border:none;
    box-sizing: border-box;
    height: 3rem;
    border-radius: 1.5rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding-left: 1rem;
    padding-right: 1.5rem;
    margin-top:.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
</style>
