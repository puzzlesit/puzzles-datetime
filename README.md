# Puzzles Datetime
####Simple Datetime Picker

---
## Installation
```
npm install --save puzzles-datetime
```

#### Import the package in your main.js file
```
import PuzzlesDatetime from 'puzzles-datetime'
```

#### To install it globally
```
Vue.use(PuzzlesDatetime)
```

#### Or in locally in a component
```
import 'PuzzlesDatetime' from 'puzzles-datetime'
```

#### Then import styles
```
import 'puzzles-datetime/dist/puzzles-datetime.css'
```
----
## Examples
```
<puzzles-datetime v-model="dateValue">
    <input v-model="dateValue" placeholder="Select a Date" readonly>
</puzzles-datetime>
```
####Props:

- ``type`` - type of the picker (default: "date")
  - Possible values:
    - date
    - datetime
    - time
- ``value-format`` - format of the datetime value
  - Defaults: 
    - date - "yyyy-MM-dd", 
    - datetime - "yyyy-MM-dd HH:mm", 
    - time - "HH:mm")
- ``display-format`` - format of the datetime displayed value
    - Defaults:
        - date - "d MMM yyyy",
        - datetime - "d MMM yyyy HH:mm",
        - time - "HH:mm")


### Example with Display Value
```
<puzzles-datetime v-model="dateValue" @display="displayDateValue = arguments[0]">
    <input v-model="displayDateValue" placeholder="Select a Date" readonly>
</puzzles-datetime>
```
Add ``@display="displayDateValue = arguments[0]"``, still value is stored in ``dateValue``, 
but formatted display value is stored in ``displayDateValue``.

---
###Note
This is the beta version of the puzzles-datetime, there will be more features coming out soon.

##Contact
Nermedin Dzekovic, Puzzles IT <br>
nermedin@puzzlesit.com

