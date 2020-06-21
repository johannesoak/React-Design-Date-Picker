# React Design Date Picker

A clean Date Picker to be used with React functional components.
 
## Features

- Date Picker for React Functional Components.
- 2 different layouts.
- Binding for useState hooks.
- Start date & End date or Single date option.
- Set weekday to start on monday or sunday.
- Translation & Locales setting.

# How-to

Install

```javascript 
npm i react-design-date-picker
```

Import the dependency

```javascript 
import DatePicker from "./DatePicker"
```

Edit the options

```javascript
const options = {
    Design: "Classic", // Classic or Compact
    Locales: "se-sv", // Locales - Set "en-us" for default
    StartWeekOnSunday: true, // False sets the start on monday
    FullFunctionality: true, // True = Start & End Date | False = Only one date
    Hooks: {
      start: startDate, // Set state if FullFunctionality is true or false
      setStart: setStartDate, // Set setState if FullFunctionality is true or false
      end: endDate, // Set state if FullFunctionality is true and false if FullFunctionality is false
      setEnd: setEndDate, // Set setState if FullFunctionality is true and false if FullFunctionality is false
    },
    Translate: true, // Set to true if you want to enable Translation object below. If false then it's english as default.
    Translation: {
      change: "Byt datum",
      startDate: "Start Datum",
      endDate: "Slut Datum",
      pickMonth: "Välj månad",
      pickYear: "Välj år"
    },
  }; 

```

Add the module

```javascript
<DatePicker options={options} />
```
  

## To-Do

- Design the draggable element.
- Responsive design.
- Add main color option.
- Add accessability keyboard support.
- Validate that it's working as expected in different timezones.
- Add Framer animations.
- Create a infinity scroll layout.
- Connect outer setHooks with internal date values
- Fix minor design issues on Compact design.
- Create tests using Jest framework.
- Add a time input.
- Add Framer animations.
- Create a infinity scroll layout.

## Known Bugs

- Sets date when selecting month or year in the picker.

## License

Copyright (c) 2020 Johannes Eklund and individual contributors. Licensed under MIT license, see LICENSE for the full license.
