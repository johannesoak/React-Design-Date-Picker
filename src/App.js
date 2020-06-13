import React, { useState } from 'react';

import DatePicker from "./DatePicker"

function App() {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const options = {
    Design: "Classic",
    Locales: "se-sv",
    StartWeekOnSunday: true,
    FullFunctionality: true,
    Hooks: {
      start: startDate,
      setStart: setStartDate,
      end: endDate,
      setEnd: setEndDate,
    },
    Translate: true,
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
