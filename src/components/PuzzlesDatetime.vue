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
              Simple Calendar
            </div>
          </template>
          <template v-else>
            <div class="year">
              <div class="arrow" @click="move('year', false)">
<!--                <arrow direction="left"/>-->
                L
              </div>

              <div ref="year-selector"
                   :class="{ 'expand': selectors.year }"
                   class="wrapper">
                <div ref="years-wrapper" class="years-wrapper">
                  <div v-for="year in years"
                       :key="`year-${year}`"
                       :ref="year"
                       :class="{ selected: year === datetime.year && selectors.year }"
                       @click="selectors.year ? select('year', year, true) : openSelector('year', true)">
                    {{ year }}
                  </div>
                </div>

              </div>

              <div class="arrow" @click="move('year', true)">
<!--                <arrow direction="right"/>-->
                R
              </div>
            </div>

            <div class="month">
              <div class="arrow" @click="move('month', false)">
<!--                <arrow direction="left"/>-->
                L
              </div>

              <div ref="month-selector"
                   :class="{ 'expand': selectors.month }"
                   class="wrapper">
                <div ref="months-wrapper" class="months-wrapper">
                  <div v-for="month in months"
                       :key="`month-${month}`"
                       :ref="month"
                       :class="{ selected: month === datetime.month && selectors.month }"
                       @click="selectors.month ? select('month', month) : openSelector('month')">
                    {{ monthNames[month - 1] }}
                  </div>
                </div>

              </div>

              <div class="arrow" @click="move('month', true)">
<!--                <arrow direction="right"/>-->
                R
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
          <div>
            {{ datetime.time }}
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Arrow from './Arrow';

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
        time: null
      },
      selectors: {
        year: false,
        month: false
      }
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
    }
  },
  components: {
    // Arrow
  },
  created() {
    for (let i = 1900; i <= 2050; i++) {
      this.years.push(i)
    }
  },
  mounted() {
    if (this.open) {
      // This was done for testing purposes
      this.init();
    }
  },
  watch: {
    open(n) {
      if (n) {
        let interval = setInterval(() => {
          if (this.$refs) {
            this.init();
            clearInterval(interval);
          }
        }, 10);
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

      this.transform('years-wrapper', -this.$refs[this.datetime.year][0].offsetTop);
      this.transform('months-wrapper', -this.$refs[this.datetime.month][0].offsetTop);
    },
    updateValue() {
      this.$emit('input', `${this.datetime.year}-${this.datetime.month}-${this.datetime.date}`);
    },
    transform(el, y) {
      this.$refs[el].style.transform = `translateY(${y}px)`;
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
    select(type, value, scroll = false) {
      if (!value) return; // If no value has been passed, simply return

      this.datetime[type] = value; // Set value
      this.selectors[type] = false; // Close selector if opened

      if (scroll) // If scroll is enabled, scroll to that value so it is shown in selector when it's closed
        this.scrollTo(`${type}-selector`, 0);

      if (type === 'date') {
        this.datetime.date = value;
        this.updateValue();
        this.open = false; // Close the modal when date has been selected
      } else {
        this.transform(`${type}s-wrapper`, -this.$refs[value][0].offsetTop);
        console.log(this.$refs.calendar)
        this.createCalendar(this.datetime.year, this.datetime.month); // If year or month are changed, update calendar view
      }
    },
    openSelector(type, scroll = false) {
      if (!this.selectors[type]) this.selectors[type] = true;

      if (scroll)
        this.scrollTo(`${type}-selector`, this.$refs[this.datetime.year][0].offsetTop);

      this.transform(`${type}s-wrapper`, 0);
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

<style scoped>
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
}
.puzzles-datetime-wrapper .background {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: rgba(75, 85, 99, 0.75);
  z-index: 1;
}
.puzzles-datetime-wrapper .puzzles-datetime {
  position: relative;
  background: white;
  z-index: 100;
  margin: auto;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
  -webkit-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
  -moz-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
}
.puzzles-datetime-wrapper .puzzles-datetime table {
  border-collapse: collapse;
  width: 100%;
  font-size: 1rem;
}
.puzzles-datetime-wrapper .puzzles-datetime td, .puzzles-datetime-wrapper .puzzles-datetime th {
  border: 1px solid #797f8a;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
}
.puzzles-datetime-wrapper .puzzles-datetime th {
  font-weight: bold;
  background-color: #e6e6e6;
}
.puzzles-datetime-wrapper .puzzles-datetime .selected {
  background: #7367f0;
  color: white;
}
.puzzles-datetime-wrapper .puzzles-datetime .year, .puzzles-datetime-wrapper .puzzles-datetime .month {
  display: flex;
  justify-content: space-between;
  height: 2rem;
  padding: 0.5rem;
  line-height: 2rem;
}
.puzzles-datetime-wrapper .puzzles-datetime .year .arrow, .puzzles-datetime-wrapper .puzzles-datetime .month .arrow {
  height: 2rem;
  padding: 0 0.5rem;
  cursor: pointer;
}
.puzzles-datetime-wrapper .puzzles-datetime .year .wrapper, .puzzles-datetime-wrapper .puzzles-datetime .month .wrapper {
  background: white;
  height: 2rem;
  line-height: 2rem;
  z-index: 100;
  overflow: hidden;
  position: relative;
  border-radius: 0.5rem;
}
.puzzles-datetime-wrapper .puzzles-datetime .year .wrapper .years-wrapper, .puzzles-datetime-wrapper .puzzles-datetime .month .wrapper .years-wrapper, .puzzles-datetime-wrapper .puzzles-datetime .year .wrapper .months-wrapper, .puzzles-datetime-wrapper .puzzles-datetime .month .wrapper .months-wrapper {
  border-radius: 0.5rem;
  transform: translateY(0);
}
.puzzles-datetime-wrapper .puzzles-datetime .year .wrapper div, .puzzles-datetime-wrapper .puzzles-datetime .month .wrapper div {
  cursor: pointer;
  text-align: center;
  width: 150px;
  font-size: 1.5rem;
}
.puzzles-datetime-wrapper .puzzles-datetime .year .expand, .puzzles-datetime-wrapper .puzzles-datetime .month .expand {
  height: 24rem;
  z-index: 110;
  box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
  -webkit-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
  -moz-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
}
.puzzles-datetime-wrapper .puzzles-datetime .year .expand div, .puzzles-datetime-wrapper .puzzles-datetime .month .expand div {
  font-size: 1rem;
}
.puzzles-datetime-wrapper .puzzles-datetime .year .years-wrapper {
  flex-direction: column-reverse;
  display: flex;
}
.puzzles-datetime-wrapper .puzzles-datetime .year .expand {
  overflow: scroll;
  transform: translateY(-3rem);
}
.puzzles-datetime-wrapper .puzzles-datetime .month .expand {
  transform: translateY(-6rem);
}
</style>
