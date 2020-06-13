import React, { useState } from 'react';

import DatePicker from "./DatePicker"

function App() {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

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

  return (
    <div className="App">
      <DatePicker options={options} />
    </div>
  );
}

export default App;
