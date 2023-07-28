<template>
  <div :key="`puzzles-datetime-${key}`">
    <div class="puzzles-slot-wrapper" @click="toggle">
      <slot/>
    </div>

    <div v-if="open"
         class="puzzles-datetime-wrapper">
      <div
          :style="{ backgroundColor: customStyle.backgroundLayerBackgroundColor, opacity: customStyle.backgroundLayerOpacity}"
          class="background"
          @click.self="toggle"></div>

      <div :style="{ fontSize: customStyle.fontSize, backgroundColor: customStyle.backgroundColor, height: customStyle.backgroundHeight}"
           class="puzzles-datetime">
        <template v-if="type === 'date' || type === 'datetime'">
          <template v-if="simple">
            <div>
              Simple Calendar - Not implemented yet!
            </div>
          </template>
          <template v-else>
            
            <div class="selector">
              <div class="arrow"
                   :style="{ backgroundColor: customStyle.arrowBackgroundColor }"
                   @click="move('month', false)">
                <arrow direction="left"/>
              </div>

              <div :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor }"
                   class="selector-field"
                   @click="openSelector('month', true)">
                {{ monthNames[datetime.month - 1] }}
              </div>
              <div v-show="selectors.month">
                <div
                    :style="{ backgroundColor: customStyle.backgroundLayerBackgroundColor, opacity: customStyle.backgroundLayerOpacity }"
                    class="background-selector"
                    @click.self="closeSelector('month')"></div>
                <div class="wrapper">
                  <div ref="month-selector"
                       class="selector-wrapper">
                    <div v-for="month in months"
                         :key="`month-${month}`"
                         :ref="`month-${month}`"
                         :class="{ selected: month === datetime.month && selectors.month }"
                         :style="{ backgroundColor: month === datetime.month && selectors.month ? customStyle.calendarSelectedBackgroundColor : customStyle.calendarDatesBackgroundColor, color: month === datetime.month && selectors.month ? customStyle.calendarSelectedTextColor : customStyle.textColor }"
                         @click="select('month', month, true)">
                      {{ monthNames[month - 1] }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                  :style="{ calendarDatesBackgroundColor: customStyle.calendarDatesBackgroundColor, color: customStyle.textColor }"
                  class="selector-field"
                  @click="openSelector('year', true)">
                {{ datetime.year }}
              </div>

              <div v-show="selectors.year">
                <div
                    :style="{ backgroundColor: customStyle.backgroundLayerBackgroundColor, opacity: customStyle.backgroundLayerOpacity }"
                    class="background-selector"
                    @click.self="closeSelector('year')"></div>
                <div class="wrapper">
                  <div ref="year-selector"
                       class="selector-wrapper">
                    <div v-for="year in years"
                         :key="`year-${year}`"
                         :ref="`year-${year}`"
                         :class="{ selected: year === datetime.year && selectors.year }"
                         :style="{ backgroundColor: year === datetime.year && selectors.year ? customStyle.calendarSelectedBackgroundColor : customStyle.calendarDatesBackgroundColor, color: year === datetime.year && selectors.year ? customStyle.calendarSelectedTextColor : customStyle.textColor }"
                         @click="select('year', year, true)">
                      {{ year }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="arrow"
                   @click="move('month', true)"
                   :style="{ backgroundColor: customStyle.arrowBackgroundColor }">
                <arrow direction="right"/>
              </div>
            </div>

            <div>
              <table :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor }">
                <tr>
                  <th v-for="(day, i) in days"
                      :key="day + '-' + i"
                      :style="{ backgroundColor: customStyle.calendarHeaderBackgroundColor, color: customStyle.calendarHeaderTextColor ,fontSize: customStyle.fontSize }">
                    {{ day }}
                  </th>
                </tr>
                <tr v-for="(row, i) in dates" :key="`row-${i}`">
                  <td v-for="(d, j) in row"
                      :key="`col-${i}-${j}`"
                      :class="{ selected: d === datetime.date }"
                      :style="{ backgroundColor: d === datetime.date ? customStyle.calendarSelectedBackgroundColor : customStyle.calendarDatesBackgroundColor, color: d === datetime.date ? customStyle.calendarSelectedTextColor : customStyle.textColor, fontSize: customStyle.fontSize, borderRadius: customStyle.customRadius }"
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
                   :style="{ backgroundColor: customStyle.arrowBackgroundColor }"
                   @click="move('hour', true)">
                <arrow direction="up"/>
              </div>

              <div :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor }"
                   class="selector-field"
                   @click="openSelector('hour', true)">
                {{ datetime.hour }}
              </div>

              <div v-show="selectors.hour">
                <div
                    :style="{ backgroundColor: customStyle.backgroundLayerBackgroundColor, opacity: customStyle.backgroundLayerOpacity }"
                    class="background-selector"
                    @click.self="closeSelector('hour')"></div>
                <div class="wrapper">
                  <div ref="hour-selector"
                       class="selector-wrapper">
                    <div v-for="hour in hours"
                         :key="`hour-${hour}`"
                         :ref="`hour-${hour}`"
                         :class="{ selected: hour === datetime.hour && selectors.hour }"
                         :style="{ backgroundColor: hour === datetime.hour && selectors.hour ? customStyle.calendarSelectedBackgroundColor : customStyle.calendarDatesBackgroundColor, color: hour === datetime.hour && selectors.hour ? customStyle.calendarSelectedTextColor : customStyle.textColor, }"
                         @click="select('hour', hour, true)">
                      {{ hour }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="arrow"
                   :style="{ backgroundColor: customStyle.arrowBackgroundColor }"
                   @click="move('hour', false)">
                <arrow direction="down"/>
              </div>
            </div>

            <span>:</span>

            <div class="selector">
              <div class="arrow"
                   :style="{ backgroundColor: customStyle.arrowBackgroundColor }"
                   @click="move('minute', true)">
                <arrow direction="up"/>
              </div>

              <div :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor }"
                   class="selector-field"
                   @click="openSelector('minute', true)">
                {{ datetime.minute }}
              </div>

              <div v-show="selectors.minute">
                <div
                    :style="{ backgroundColor: customStyle.backgroundLayerBackgroundColor, opacity: customStyle.backgroundLayerOpacity }"
                    class="background-selector"
                    @click.self="closeSelector('minute')"></div>
                <div class="wrapper">
                  <div ref="minute-selector"
                       class="selector-wrapper">
                    <div v-for="minute in minutes"
                         :key="`minute-${minute}`"
                         :ref="`minute-${minute}`"
                         :class="{ selected: minute === datetime.minute && selectors.minute }"
                         :style="{ backgroundColor: minute === datetime.minute && selectors.minute ? customStyle.calendarSelectedBackgroundColor : customStyle.calendarDatesBackgroundColor, color: minute === datetime.minute && selectors.minute ? customStyle.calendarSelectedTextColor : customStyle.textColor}"
                         @click="select('minute', minute, true)">
                      {{ minute }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="arrow"
                   :style="{ backgroundColor: customStyle.arrowBackgroundColor }"
                   @click="move('minute', false)">
                <arrow direction="down"/>
              </div>
            </div>
          </div>
        </template>

        <div class="buttons">
         <div class="left-controller">
          <div :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor, fontWeight:'bold', marginRight: customStyle.customButtonGap }"
               class="button"
               @click="done('time')">
            {{ languageData.buttons.confirm }}
          </div>
         </div>
          <div class="right-controllers">
            <div :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor, fontWeight: 'bold'}"
                 class="button"
                 @click="done('clear')">
              {{ languageData.buttons.clear }}
            </div>
            <div :style="{ backgroundColor: customStyle.backgroundColor, color: customStyle.textColor, fontWeight: 'bold'}"
                 class="button"
                 @click="done('close')">
              {{ languageData.buttons.close }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow';
import {format} from 'date-fns'
import languageData from './config/languages.json'

export default {
  name: 'PuzzlesDatetime',
  data() {
    return {
      languageData: {},
      open: false,
      key: 0,
      years: [], // TODO: Make options for past and future dates
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      monthNames: [],
      monthKeys: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      dates: [],
      days: [],
      dayKeys: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
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
    },
    requireConfirm: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'eng',
      validator: value => ['eng', 'ba'].includes(value),
    },
    customMonths: {
      type: Object,
      default: () => ({}),
    },
    customDays: {
      type: Object,
      default: () => ({}),
    },
    customStyle: {
      type: Object,
      default: () => ({
        backgroundColor: 'white',
        textColor: 'black',
        calendarHeaderBackgroundColor: '#e5e5e5',
        calendarHeaderTextColor: 'black',
        calendarDatesBackgroundColor: 'white',
        calendarSelectedBackgroundColor: '#736cf0',
        calendarSelectedTextColor: 'white',
        backgroundLayerBackgroundColor: 'black',
        backgroundLayerOpacity: 0,
        pickerMaxWidth: '320px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '1rem',
        backgroundHeight: '100vh',
        arrowBackgroundColor: 'red',
        customRadius: '50%',
        customButtonGap: '4rem'
      })
    },
  },
  components: {
    Arrow
  },
  created() {
    this.languageData = languageData[this.language];
    this.initDays();
    this.initMonths();

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
    initDays() {
      let days = Object.values(this.customDays).length > 0 ? this.customDays : this.languageData.days;

      this.dayKeys.forEach(key => {
        this.days.push(days[key] ? days[key] : this.languageData.days[key]);
      });
    },
    initMonths() {
      let months = Object.values(this.customMonths).length > 0 ? this.customMonths : this.languageData.months;

      this.monthKeys.forEach(key => {
        this.monthNames.push(months[key] ? months[key] : this.languageData.months[key]);
      });
    },
    done(type) {
      if (type === 'time') {
        if (this.requireConfirm) {
          this.updateValue();
        }
        this.toggle();
      }
      if (type === 'clear') {
        this.datetime = {};
        this.$emit('input', null);
        this.$emit('display', null);
        this.toggle();
      }
      if (type === 'close') {
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
    move(type, increment) {
      if (this.selectors[type]) return;

      if (type === 'month') {
        let newMonth = this.datetime.month + (increment ? 1 : -1);

        if (newMonth > 12) {
          this.datetime.month = 1;
          this.datetime.year++;
        } else if (newMonth < 1) {
          this.datetime.month = 12;
          this.datetime.year--;
        } else {
          this.datetime.month = newMonth;
        }
      } else if (type === 'year') {
        this.datetime.year += increment ? 1 : -1;
      } else if (type === 'hour') {
        let newHour = parseInt(this.datetime.hour) + (increment ? 1 : -1);
        if (newHour > 23) {
          this.datetime.hour = '00';
        } else if (newHour < 0) {
          this.datetime.hour = '23';
        } else {
          this.datetime.hour = newHour.toString().padStart(2, '0');
        }
      } else if (type === 'minute') {
        let newMinute = parseInt(this.datetime.minute) + (increment ? 1 : -1);
        if (newMinute > 59) {
          this.datetime.minute = '00';
        } else if (newMinute < 0) {
          this.datetime.minute = '59';
        } else {
          this.datetime.minute = newMinute.toString().padStart(2, '0');
        }
      }

      this.createCalendar(this.datetime.year, this.datetime.month);
    },

    select(type, value) {
      if (!value) return; // If no value has been passed, simply return

      this.datetime[type] = value; // Set value
      this.selectors[type] = false; // Close selector if opened

      if (type === 'date' || type === 'datetime') {
        this.datetime.date = value;

        if (type === 'date') {
          this.updateValue();

          if (!this.requireConfirm) {
            this.toggle();
          }
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
    closeSelector(type) {
      this.selectors[type] = !this.selectors[type];
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

  .background-selector {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0);
    z-index: 1;
  }


  .puzzles-datetime {
    display: grid;
    place-items: center;
    position: relative;
    background: white;
    z-index: 100;
    margin: auto;
    border-radius: .5rem;
    padding: 1rem;
    box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
    -webkit-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
    -moz-box-shadow: 0 0 10px 1px rgba(82, 82, 82, 0.8);
    font-family: var(--fontFamily, Arial, Helvetica, sans-serif);

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 1rem;
    }

    td, th {
      border: 1px solid #797f8a;
      padding: .5rem;
      text-align: center;
      cursor: pointer;
      width: 2.1875rem;
      border: none;
    }

    th {
      font-weight: bold;
      background-color: #e6e6e6;
    }

    .buttons {
      display: flex; 
      justify-content: space-between; 
      margin-top: 1rem;
    
      .left-controller {
        display: flex;
      }

      .right-controllers {
        display: flex;
      }

      .button {
        padding: 0.5rem;
        text-align: center;
        cursor: pointer;
      }
    }

    span {
      margin-top: auto;
      margin-bottom: auto;
      font-size: 40px;
    }

    .list-selected {
      background: #7367f0;
      color: white;
      cursor: pointer;
      border-radius: .5rem;
    }

    .selected {
      background: #7367f0;
      color: white;
      cursor: pointer;
      border-radius: .5rem;
    }

    .time-selectors {
      display: flex;
      justify-content: center;
      

      .selector {
        width: 2rem;
        height: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0;

        .selector-field {
          width: 2rem !important;
        }
      }
    }

    .selector {
      display: flex;
      justify-content: center;
      height: 3rem;
      padding: 0.25rem 1rem;
      line-height: 2rem;

      .selector-field {
        cursor: pointer;
        text-align: center;
        width: 5rem;
        font-size: 1.2rem;
        height: 2rem;
        padding: 0 .5rem;
        line-height: 2rem;
        position: relative;
      }

      .arrow {
        height: 1rem;
        opacity: 50%;
        padding: .5rem;
        border-radius: 50%;
        cursor: pointer;
      }

      .wrapper {
        position: absolute;
        height: calc(100% + 6rem);
        background: white;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        min-height: 24rem;
        max-height: 24rem;
        z-index: 100;
        border-radius: .5rem;
        border: 1px solid gray;

        .selector-wrapper {
          position: relative;
          height: 100%;
          border-radius: .5rem;
          transform: translateY(0);
          overflow: auto;
          overflow-x: hidden;
        }

        div {
          cursor: pointer;
          text-align: center;
          width: 10rem;
          font-size: 1.2rem;
        }
      }
    }
  }

  /* Width and height of the scrollbar track */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 0.5rem;
  }

  /* Background color of the scrollbar track */
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 0.5rem;
  }

  /* Color of the scrollbar thumb */
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 0.5rem;
  }

  /* Color of the scrollbar thumb on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  /* Color of the scrollbar thumb when active */
  ::-webkit-scrollbar-thumb:active {
    background-color: #333;
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
