<template>
  <div id="app">
    <puzzles-datetime v-model="date"
                      :custom-days="{ 'mon': 'MON', 'tue': 'TUE', 'thu': 'THU', 'fri': 'FRI', 'wed': 'WED', 'sat': 'SAT', 'sun': 'SUN' }"
                      :custom-style="{
                        backgroundColor: '#ffffff',
                        textColor: '#364563',
                        calendarHeaderBackgroundColor: '#698EC9',
                        calendarHeaderTextColor: '#ffffff',
                        calendarDatesBackgroundColor: '#ffffff',
                        calendarSelectedBackgroundColor: '#7366f0',
                        calendarSelectedTextColor: '#ffffff',
                        backgroundLayerBackgroundColor: '#111827',
                        backgroundLayerOpacity: 0.6,
                        pickerMaxWidth: '320px',
                        fontSize: '1rem'
                      }"
                      @display="displayDate = arguments[0]">
      <input v-model="displayDate"
             placeholder="Select a date"
             readonly
             type="text">
    </puzzles-datetime>

    <br>
    Date: {{ date }}

    <hr>

    <puzzles-datetime v-model="time"
                      :custom-style="{
                        backgroundColor: '#ffffff',
                        textColor: '#364563',
                        calendarHeaderBackgroundColor: '#698EC9',
                        calendarHeaderTextColor: '#ffffff',
                        calendarDatesBackgroundColor: '#ffffff',
                        calendarSelectedBackgroundColor: '#7366f0',
                        calendarSelectedTextColor: '#ffffff',
                        backgroundLayerBackgroundColor: '#111827',
                        backgroundLayerOpacity: 0.6,
                        pickerMaxWidth: '320px',
                        fontSize: '1rem'
                      }"
                      type="time"
                      @display="displayTime = arguments[0]">
      <input v-model="displayTime"
             placeholder="Select a time"
             readonly
             type="text">
    </puzzles-datetime>

    <br>
    Time: {{ time }}

    <hr>

    <puzzles-datetime v-model="datetime"
                      :custom-style="{
                        backgroundColor: '#ffffff',
                        textColor: '#364563',
                        calendarHeaderBackgroundColor: '#698EC9',
                        calendarHeaderTextColor: '#ffffff',
                        calendarDatesBackgroundColor: '#ffffff',
                        calendarSelectedBackgroundColor: '#7366f0',
                        calendarSelectedTextColor: '#ffffff',
                        backgroundLayerBackgroundColor: '#111827',
                        backgroundLayerOpacity: 0.6,
                        pickerMaxWidth: '320px',
                        fontSize: '1rem'
                      }"
                      :require-confirm="false"
                      language="ba"
                      type="datetime"
                      @display="displayDatetime = arguments[0]">
      <input v-model="displayDatetime"
             placeholder="Select a Datetime"
             readonly
             type="text">
    </puzzles-datetime>

    <br>
    Datetime: {{ datetime }}
  </div>
</template>

<script>
import PuzzlesDatetime from './components/PuzzlesDatetime.vue'

export default { // This page is only for testing
  name: 'App',
  data() {
    return {
      date: '2022-10-09',
      displayDate: '',
      time: '',
      displayTime: '',
      datetime: '2022-10-22 20:04',
      displayDatetime: ''
    }
  },
  components: {
    PuzzlesDatetime
  }
}
</script>

<style>

</style>