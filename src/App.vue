<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <Header />
  </div>
</template>

<script>
import Header from '../src/components/Header';
export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
