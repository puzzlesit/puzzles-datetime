<template>
  <div id="app">
    <puzzles-datetime v-model="date">
      <template slot-scope="puzzlesDatetime">
        <input type="text"
               v-model="puzzlesDatetime.display"
               placeholder="Select a date"
               readonly>
      </template>
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