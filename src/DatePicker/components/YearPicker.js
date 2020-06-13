import React, { useState } from "react";

// Arrow
import Arrow from "../asset/Arrow";

export default function YearPicker(props) {
  const { options, date, setDate, setNav } = props;
  let [thisYear, setThisYear] = useState(new Date());

  const setYear = (i) => {
    setDate(new Date(date.setYear(i)));
    setNav("date");
  };

  const YearArray = () => {
    let array = [];
    let quarter = [];
    let counter = 0;
    for (let i = thisYear.getFullYear(); i > thisYear.getFullYear() - 11; i--) {
      quarter = [
        <span
          className="MainMonth"
          style={i === date.getFullYear() ? { fontWeight: "600" } : null}
          onClick={() => setYear(i)}
          key={i}
        >
          {i}
        </span>,
        ...quarter,
      ];
      counter++;
      if (counter === 3) {
        array = [
          <div className="DesignDatePickerMainDate" key={"quarter_" + i}>
            {quarter}
          </div>,
          ...array,
        ];
        counter = 0;
        quarter = [];
      }
    }
    return array;
  };

  const prevYear = () => {
      const year = thisYear.getFullYear();
      setThisYear(new Date(thisYear.setFullYear(year - 9)))
  }

  const nextYear = () => {
    const year = thisYear.getFullYear();
    setThisYear(new Date(thisYear.setFullYear(year + 9)))
}

  return (
    <>
      <div className="DesignDatePicker">
        <div className="DesignDatePickerHeader disable-select">
          <div onClick={prevYear}>
            <Arrow size="20px" direction="left" />
          </div>
          <div className="PickerMonthYear">{options.Translate ? options.Translation.pickYear : "Pick a year"}</div>
          {<div className={thisYear.getFullYear() === new Date().getFullYear() ? "NotActive" : null} onClick={thisYear.getFullYear() === new Date().getFullYear() ? null : nextYear}>
            <Arrow size="20px" direction="right" />
          </div>}
        </div>
        <div className="DesignDatePickerMain">
          <YearArray />
        </div>
      </div>
    </>
  );
}
