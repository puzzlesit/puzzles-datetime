<template>
  <div id="app">
    <puzzles-datetime v-model="date">
      <input type="text" v-model="date" placeholder="Select a date" readonly>
    </puzzles-datetime>
  </div>
</template>

<script>
import PuzzlesDatetime from './components/PuzzlesDatetime.vue'

export default { // This page is only for testing
  name: 'App',
  data() {
    return {
      date: '',
    }
  },
  components: {
    PuzzlesDatetime
  }
}
</script>

<style>

</style>