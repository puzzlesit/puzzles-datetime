<template>
  <div :key="`puzzles-datetime-${key}`">
    <div class="puzzles-slot-wrapper" @click="toggle">
      <slot />
    </div>

    <div v-if="open"
         class="puzzles-datetime-wrapper">
      <div class="background"
           @click.self="toggle"></div>

      <div class="puzzles-datetime">
        <template v-if="type === 'date' || type === 'datetime'">
          <template v-if="simple">
            <div>
              Simple Calendar
            </div>
          </template>
          <template v-else>
            <div class="selector">
              <div class="arrow" @click="move('year', false)">
                <arrow direction="left"/>
              </div>

              <div class="selector-field"
                   v-show="!selectors.year"
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

              <div class="arrow" @click="move('year', true)">
                <arrow direction="right"/>
              </div>
            </div>

            <div class="selector">
              <div class="arrow" @click="move('month', false)">
                <arrow direction="left"/>
              </div>

              <div class="selector-field"
                   v-show="!selectors.month"
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

              <div class="arrow" @click="move('month', true)">
                <arrow direction="right"/>
              </div>
            </div>

            <div>
              <table>
                <tr>
                  <th>MO</th>
                  <th>TU</th>
                  <th>WE</th>
                  <th>TH</th>
                  <th>FR</th>
                  <th>SA</th>
                  <th>SU</th>
                </tr>
                <tr v-for="(row, i) in dates"
                    :key="`row-${i}`">
                  <td v-for="(d, j) in row"
                      :key="`col-${i}-${j}`"
                      :class="{ selected: d === datetime.date && new Date(value).getMonth()+1 === datetime.month &&  new Date(value).getFullYear() === datetime.year}"
                      @click="select('date', d)">
                    {{ d }}
                  </td>
                </tr>
              </table>
            </div>

          </template>
        </template>
        <template v-if="type === 'time' || type === 'datetime'">
<!--          <div>-->
<!--            <div class="hour">-->
<!--              <div class="arrow" @click="move('hour', true)">-->
<!--                <arrow direction="up"/>-->
<!--              </div>-->

<!--              <div ref="hour-selector"-->
<!--                   :class="{ 'expand': selectors.hour }"-->
<!--                   class="wrapper">-->
<!--                <div ref="hours-wrapper" class="hours-wrapper">-->
<!--                  <div v-for="hour in hours"-->
<!--                       :key="`hour-${hour}`"-->
<!--                       :ref="hour"-->
<!--                       :class="{ selected: hour === datetime.hour && selectors.hour }"-->
<!--                       @click="selectors.hour ? select('hour', hour, true) : openSelector('hour', true)">-->
<!--                    {{ hour }}-->
<!--                  </div>-->
<!--                </div>-->

<!--              </div>-->

<!--              <div class="arrow" @click="move('hour', false)">-->
<!--                <arrow direction="down"/>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow';
import { format } from 'date-fns'

export default {
  name: 'PuzzlesDatetime',
  data() {
    return {
      open: false,
      key: 0,
      years: [], // TODO: Make options for past and future dates
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // TODO: Make this as prop.
      dates: [],
      datetime: {
        year: null,
        month: null,
        date: null,
        time: null, // Remove this one
        hour: null
      },
      selectors: {
        year: false,
        month: false,
        hour: false
      },
      vFormat: 'yyyy-MM-dd',
      dFormat: 'd MMM yyyy',
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    }
  },
  props: {
    value: String, // Validate
    type: {
      type: String,
      default: 'date' // datetime, date, time - validate
    },
    simple: {
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
    for (let i = 1900; i <= 2050; i++) {
      this.years.push(i)
    }
  },
  mounted() {
    if (this.type === 'time') {
      this.vFormat = "H:m";
      this.dFormat = "H:m";
    }

    if (this.valueFormat)
      this.vFormat = this.valueFormat;

    if (this.displayFormat)
      this.dFormat = this.displayFormat;

    if (this.value && this.type === 'date')
      this.$emit('display', format(new Date(this.value), this.dFormat));

    if (this.value && this.type === 'time')
      this.$emit('display', this.value);
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
    }
  },
  methods: {
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
      // if (this.value) {
      //   this.datetime.time = this.value;
      //   this.datetime.hour = '00';
      // }
    },
    updateValue() {
      this.$emit('input', format(new Date(this.datetime.year, this.datetime.month-1, this.datetime.date), this.vFormat));
      this.$emit('display', format(new Date(this.datetime.year, this.datetime.month-1, this.datetime.date), this.dFormat));
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

      if (type === 'date') {
        this.datetime.date = value;
        this.updateValue();
        this.open = false; // Close the modal when date has been selected
      } else {
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

    .selected {
      background: #7367f0;
      color: white;
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
}
</style>
