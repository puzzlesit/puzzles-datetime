<template>
  <div :key="`puzzles-datetime-${key}`">
    <div class="puzzles-slot-wrapper" @click="toggle">
      <slot/>
    </div>

    <div v-if="open"
         class="puzzles-datetime-wrapper">
      <div class="background"
           @click.self="toggle"></div>

      <div class="puzzles-datetime">
        <template v-if="type === 'date' || type === 'datetime'">
          <template v-if="simple">
            <div>
              Simple Calendar - Not implemented yet!
            </div>
          </template>
          <template v-else>
            <div class="selector">
              <div class="arrow"
                   @click="move('year', false)">
                <arrow direction="left"/>
              </div>

              <div class="selector-field"
                   @click="openSelector('year', true)">
                {{ datetime.year }}
              </div>

              <div v-show="selectors.year"
                   class="wrapper">
                <div ref="year-selector"
                     class="selector-wrapper">
                  <div v-for="year in years"
                       :key="`year-${year}`"
                       :ref="`year-${year}`"
                       :class="{ selected: year === datetime.year && selectors.year }"
                       @click="select('year', year, true)">
                    {{ year }}
                  </div>
                </div>
              </div>

              <div class="arrow"
                   @click="move('year', true)">
                <arrow direction="right"/>
              </div>
            </div>

            <div class="selector">
              <div class="arrow"
                   @click="move('month', false)">
                <arrow direction="left"/>
              </div>

              <div class="selector-field"
                   @click="openSelector('month', true)">
                {{ monthNames[datetime.month - 1] }}
              </div>

              <div v-show="selectors.month"
                   class="wrapper">
                <div ref="month-selector"
                     class="selector-wrapper">
                  <div v-for="month in months"
                       :key="`month-${month}`"
                       :ref="`month-${month}`"
                       :class="{ selected: month === datetime.month && selectors.month }"
                       @click="select('month', month, true)">
                    {{ monthNames[month - 1] }}
                  </div>
                </div>
              </div>

              <div class="arrow"
                   @click="move('month', true)">
                <arrow direction="right"/>
              </div>
            </div>

            <div>
              <table>
                <tr>
                  <th v-for="day in days" :key="day">
                    {{ day }}
                  </th>
                </tr>
                <tr v-for="(row, i) in dates"
                    :key="`row-${i}`">
                  <td v-for="(d, j) in row"
                      :key="`col-${i}-${j}`"
                      :class="{ selected: d === datetime.date }"
                      @click="select(type, d)">
                    {{ d }}
                  </td>
                </tr>
              </table>
            </div>

          </template>
        </template>
        <template v-if="type === 'time' || type === 'datetime'">
          <div class="time-selectors">
            <div class="selector">
              <div class="arrow"
                   @click="move('hour', true)">
                <arrow direction="up"/>
              </div>

              <div class="selector-field"
                   @click="openSelector('hour', true)">
                {{ datetime.hour }}
              </div>

              <div v-show="selectors.hour"
                   class="wrapper">
                <div ref="hour-selector"
                     class="selector-wrapper">
                  <div v-for="hour in hours"
                       :key="`hour-${hour}`"
                       :ref="`hour-${hour}`"
                       :class="{ selected: hour === datetime.hour && selectors.hour }"
                       @click="select('hour', hour, true)">
                    {{ hour }}
                  </div>
                </div>
              </div>

              <div class="arrow"
                   @click="move('hour', false)">
                <arrow direction="down"/>
              </div>
            </div>

            <div class="selector">
              <div class="arrow"
                   @click="move('minute', true)">
                <arrow direction="up"/>
              </div>

              <div class="selector-field"
                   @click="openSelector('minute', true)">
                {{ datetime.minute }}
              </div>

              <div v-show="selectors.minute"
                   class="wrapper">
                <div ref="minute-selector"
                     class="selector-wrapper">
                  <div v-for="minute in minutes"
                       :key="`minute-${minute}`"
                       :ref="`minute-${minute}`"
                       :class="{ selected: minute === datetime.minute && selectors.minute }"
                       @click="select('minute', minute, true)">
                    {{ minute }}
                  </div>
                </div>
              </div>

              <div class="arrow"
                   @click="move('minute', false)">
                <arrow direction="down"/>
              </div>
            </div>
          </div>
        </template>

        <div class="buttons">
          <div class="button"
               @click="done('time')">
            {{ languageData.buttons.confirm }}
          </div>
          <div class="button"
               @click="done('clear')">
               {{ languageData.buttons.clear }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow';
import {format} from 'date-fns'
import languageData from '../languages.json'

export default {
  name: 'PuzzlesDatetime',
  data() {
    return {
      languageData: {},
      open: false,
      key: 0,
      years: [], // TODO: Make options for past and future dates
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // TODO: Make this as prop.
      dates: [],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // TODO: Make this as prop.
      datetime: {
        year: null,
        month: null,
        date: null,
        hour: null,
        minute: null
      },
      selectors: {
        year: false,
        month: false,
        hour: false,
        minute: false
      },
      vFormat: 'yyyy-MM-dd',
      dFormat: 'd MMM yyyy',
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], // TODO: Generate these
      minutes: []
    }
  },
  props: {
    language:{
      type: String,
      default: 'ba',
      validator: value => ['eng', 'ba'].includes(value),
    },
    value: String, // Validate
    type: {
      type: String,
      default: 'date' // datetime, date, time - validate
    },
    simple: { // TODO: Implement Simple Date Time pickers
      type: Boolean,
      default: false
    },
    valueFormat: {
      type: String,
      default: ''
    },
    displayFormat: {
      type: String,
      default: ''
    }
  },
  components: {
    Arrow
  },
  created() {
    this.languageData = languageData[this.language];
    // TODO: Handle these more efficiently
    for (let i = 1900; i <= 2050; i++) {
      this.years.push(i)
    }

    for (let i = 0; i < 60; i++) {
      this.minutes.push(i.toString().length === 1 ? `0${i}` : i.toString());
    }
  },
  mounted() {
    if (this.type === 'time') {
      this.vFormat = "HH:mm";
      this.dFormat = "HH:mm";
    }

    if (this.type === 'datetime') {
      this.vFormat = "yyyy-MM-dd HH:mm";
      this.dFormat = "d MMM yyyy HH:mm";
    }

    if (this.valueFormat)
      this.vFormat = this.valueFormat;

    if (this.displayFormat)
      this.dFormat = this.displayFormat;

    if (this.value && this.type === 'date')
      this.$emit('display', format(new Date(this.value), this.dFormat));

    if (this.value && this.type === 'time')
      this.initTime();

    if (this.value && this.type === 'datetime')
      this.initDatetime();
  },
  watch: {
    open(n) {
      if (n && this.type === 'date') {
        let interval = setInterval(() => {
          if (this.$refs) {
            this.init();
            clearInterval(interval);
          }
        }, 10);
      }
      if (n && this.type === 'time') {
        this.initTime();
      }
      if (n && this.type === 'datetime') {
        this.initDatetime();
      }
    },
    value(n, o) {
      if (n && !o) {
        if (this.value && this.type === 'date')
          this.$emit('display', format(new Date(this.value), this.dFormat));

        if (this.value && this.type === 'time')
          this.initTime();

        if (this.value && this.type === 'datetime')
          this.initDatetime();
      }
    }
  },
  methods: {
    // TODO: Use one universal init method for all
    init() {
      if (this.value) {
        this.datetime.year = new Date(this.value).getFullYear();
        this.datetime.month = new Date(this.value).getMonth() + 1;
        this.datetime.date = new Date(this.value).getDate();
      } else {
        this.datetime.year = new Date().getFullYear();
        this.datetime.month = new Date().getMonth() + 1;
      }

      this.createCalendar(this.datetime.year, this.datetime.month);
    },
    initTime() {
      if (this.value) {
        let h = new Date('1971-01-01 ' + this.value).getHours().toString();
        this.datetime.hour = h.length === 1 ? `0${h}` : h;
        let m = new Date('1971-01-01 ' + this.value).getMinutes().toString();
        this.datetime.minute = m.length === 1 ? `0${m}` : m;
      } else {
        let h = new Date().getHours().toString();
        this.datetime.hour = h.length === 1 ? `0${h}` : h;
        let m = new Date().getMinutes().toString();
        this.datetime.minute = m.length === 1 ? `0${m}` : m;
      }
      this.updateValue();

    },
    initDatetime() {
      let date = this.value ? new Date(this.value) : new Date();

      this.datetime = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString(),
        minute: date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString()
      }

      this.updateValue();

      this.createCalendar(this.datetime.year, this.datetime.month);
    },
    done(type) {
      if (type === 'time') {
        this.updateValue();
        this.toggle();
      }
      if (type === 'clear') {
        this.datetime = {};
        this.$emit('input', null);
        this.$emit('display', null);
        this.toggle();
      }
    },
    updateValue() {
      if (this.type === 'date') {
        this.$emit('input', format(new Date(this.datetime.year, this.datetime.month - 1, this.datetime.date), this.vFormat));
        this.$emit('display', format(new Date(this.datetime.year, this.datetime.month - 1, this.datetime.date), this.dFormat));
      }

      if (this.type === 'time') {
        this.$emit('input', format(new Date(`1971-01-01 ${this.datetime.hour}:${this.datetime.minute}`), this.vFormat));
        this.$emit('display', format(new Date(`1971-01-01 ${this.datetime.hour}:${this.datetime.minute}`), this.dFormat));
      }

      if (this.type === 'datetime') {
        this.$emit('input', format(new Date(this.datetime.year, this.datetime.month - 1, this.datetime.date, this.datetime.hour, this.datetime.minute), this.vFormat));
        this.$emit('display', format(new Date(this.datetime.year, this.datetime.month - 1, this.datetime.date, this.datetime.hour, this.datetime.minute), this.dFormat));
      }
    },
    scrollTo(el, to) {
      this.$refs[el].scrollTo({top: to})
    },
    toggle() {
      this.open = !this.open;
      this.key++;
    },
    move(type, up) {
      if (this.selectors[type]) return;

      let i = this[`${type}s`].findIndex(j => j === this.datetime[type]);

      if (up) {
        if (i + 1 < this[`${type}s`].length) {
          // this.datetime[type] = this[`${type}s`][i+1];
          this.select(type, this[`${type}s`][i + 1])
        } else {
          // Can't go up anymore
        }
      } else {
        if (i === 0) {
          // Can't go down anymore
        } else {
          this.select(type, this[`${type}s`][i - 1])
        }
      }

    },
    select(type, value) {
      if (!value) return; // If no value has been passed, simply return

      this.datetime[type] = value; // Set value
      this.selectors[type] = false; // Close selector if opened

      if (type === 'date' || type === 'datetime') {
        this.datetime.date = value;

        if (type === 'date') {
          this.updateValue();
          this.open = false; // Close the modal when date has been selected
        }
      } else if (type === 'month' || type === 'year') {
        this.datetime.date = '';
        this.createCalendar(this.datetime.year, this.datetime.month); // If year or month are changed, update calendar view
      }
    },
    openSelector(type, scroll = false) {
      if (!this.selectors[type]) this.selectors[type] = true;

      if (scroll) {
        let interval = setInterval(() => {
          if (this.$refs[`${type}-selector`].childNodes.length) {
            // let to = this.$refs[`${type}-selector`].clientHeight / 2;
            let to = this.$refs[`${type}-${this.datetime[type]}`][0].offsetTop;

            to -= this.$refs[`${type}-selector`].clientHeight / 2;
            this.scrollTo(`${type}-selector`, to + 20);
            clearInterval(interval);
          }
        }, 10);
      }
    },
    createCalendar(year, month) {
      this.dates = [];
      let mon = month - 1; // months in JS are 0..11, not 1..12
      let d = new Date(year, mon);

      // spaces for the first row
      // from Monday till the first day of the month
      // * * * 1  2  3  4
      this.dates.push([]);
      for (let i = 0; i < this.getDay(d); i++) {
        this.dates[0].push(null);
      }

      // <td> with actual dates
      while (d.getMonth() === mon) {
        this.dates[this.dates.length - 1].push(d.getDate());

        if (this.getDay(d) % 7 === 6) { // sunday, last day of week - newline
          this.dates.push([]);
        }

        d.setDate(d.getDate() + 1);
      }

      // add spaces after last days of month for the last row
      // 29 30 31 * * * *
      if (this.getDay(d) !== 0) {
        for (let i = this.getDay(d); i < 7; i++) {
          this.dates[this.dates.length - 1].push(null);
        }
      }
    },
    getDay(date) { // get day number from 0 (monday) to 6 (sunday)
      let day = date.getDay();
      if (day === 0) day = 7; // make Sunday (0) the last day
      return day - 1;
    }
  }
}
</script>

<style lang="scss" scoped>
.puzzles-slot-wrapper {
  cursor: pointer;
}

.puzzles-datetime-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: rgba(75, 85, 99, 0.75);
    z-index: 1;
  }

  .puzzles-datetime {
    position: relative;
    background: white;
    z-index: 100;
    margin: auto;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
    -webkit-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
    -moz-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 16px;
    }

    td {
      border: 1px solid #797f8a;
      padding: 10px;
      text-align: center;
      cursor: pointer;
    }

    th {
      border: 1px solid #797f8a;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      background-color: #e6e6e6;
    }

    .buttons {
      display: flex;
      justify-content: center;

      .button {
        padding: 10px;
        text-align: center;
        cursor: pointer;
      }
    }


    .selected {
      background: #7367f0;
      color: white;
    }

    .time-selectors {
      display: flex;
      justify-content: center;

      .selector {
        width: 80px;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0;

        .selector-field {
          width: 80px !important;
        }
      }
    }

    .selector {
      display: flex;
      justify-content: space-between;
      height: 40px;
      padding-bottom: 20px;
      line-height: 40px;

      .selector-field {
        cursor: pointer;
        text-align: center;
        width: 150px;
        font-size: 24px;
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
        position: relative;
      }

      .arrow {
        height: 40px;
        padding: 0 10px;
        cursor: pointer;
      }

      .wrapper {
        position: absolute;
        height: calc(100% + 80px);
        background: white;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        min-height: 480px;
        max-height: 480px;
        z-index: 100;
        border-radius: 10px;
        border: 1px solid gray;

        .selector-wrapper {
          position: relative;
          height: 100%;
          border-radius: 10px;
          transform: translateY(0);
          overflow: auto;
        }

        div {
          cursor: pointer;
          text-align: center;
          width: 150px;
          font-size: 24px;
        }
      }
    }
  }

  // Disable Selection
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome, Edge, Opera and Firefox */
}
</style>
