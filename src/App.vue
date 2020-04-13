<template>
  <div id="app">
    <BinarySearch title="Binary Search"/>
  </div>
</template>

<script>
import BinarySearch from './components/BinarySearch.vue'

export default {
  name: 'App',
  components: {
    BinarySearch
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@keyframes highlightGreen {
  0% {fill: rgb(64, 84, 178, 1); }
  50% { fill: green; }
  100% { fill: rgb(64, 84, 178, 1); }
}

@keyframes highlightBlack {
  0% {fill: rgb(64, 84, 178, 1); }
  50% { fill: black; }
  100% { fill: rgb(64, 84, 178, 1); }
}
</style>
