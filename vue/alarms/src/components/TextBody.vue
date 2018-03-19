<template>
  <div
    :class="'text_body_layout' + (visible?'':' greyedout')">
    <textarea
      id="textarea"
      class="textarea"
      ref="document"
      v-model="text"
      v-show="visible"
      @keyup="onKeyUp">
    </textarea>

  </div>
</template>

<script>
export default {
  name: 'TextBody',
  props: {
    visible: Boolean,
    initialText: String,
  },
  data() {
    return {
      text: this.initialText,
      debounceFlags: {}
    }
  },
  methods: {
    debounce(func, flag, time) {
      if(!this.debounceFlags.hasOwnProperty(flag)) {
        this.debounceFlags[flag] = false;
      }
      if(!this.debounceFlags[flag]) {
        this.debounceFlags[flag] = true;
        window.setTimeout(()=>{
          func();
          this.debounceFlags[flag] = false;
        },time);
      }
    },
    onKeyUp() {
      this.debounce(()=>{
        console.log(this.text);
        this.$emit('textchange', this.text);
      },"keyup", 200);
    }
  },
  watch: {
    initialText: {
      handler(val) {
        // console.log("Text body val changed.");
        // console.log(val);
        this.text = val;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text_body_layout {
    display: flex;
    flex-direction: column;
    background-color: rgba(240,240,240,0);
    border-top-left-radius: 3rem;
  }
  .text_body_layout.greyedout {
    background-color: rgba(100,100,100,1);
  }
  .textarea {
    width: 100%;
    height: 100;
    resize: none;
    background-color: #666150;
    border-top-left-radius: 3rem;
    border: none;
    padding: 3rem;
    font-size: 1rem;
    flex-grow: 1;
  }
</style>
