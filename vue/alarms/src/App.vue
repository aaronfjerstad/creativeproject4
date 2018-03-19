<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="content"/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
Vue.component('app-header', AppHeader);
Vue.component('app-footer', AppFooter);
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  color: #261D1E;
}

.content {
  flex-grow: 1;
}
</style>
