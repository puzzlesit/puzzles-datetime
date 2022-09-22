<template>
  <div id="app">
    <puzzles-datetime v-model="date" @display="displayDate = arguments[0]">
        <input type="text"
               v-model="displayDate"
               placeholder="Select a date"
               readonly>
    </puzzles-datetime>

    <br>
    Value: {{ date }}
  </div>
</template>

<script>
import PuzzlesDatetime from './components/PuzzlesDatetime.vue'
export default { // This page is only for testing
  name: 'App',
  data() {
    return {
      date: '2022-10-09',
      displayDate: ''
    }
  },
  components: {
    PuzzlesDatetime
  }
}
</script>

<style>

</style>