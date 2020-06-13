import React, { useState } from "react";

// DatePicker
import DatePicker from "./MainPicker";

function Index() {
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

  return <DatePicker options={options} />;
}

export default Index;
