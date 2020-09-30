import React from "react";

import { GetLongMonths } from "../functions/GetMonthName";

export default function MonthPicker(props) {
  const { options, startDate, date, setDate, setNav } = props;

  const setMonth = (i) => {
    const newDate = new Date(date);
    newDate.setMonth(i);
    setDate(newDate);
    setNav("date")
  }

  const MonthArray = () => {
    const array = [];
    let quarter = [];
    let counter = 0;
    GetLongMonths(options).forEach((month, i) => {
      quarter.push(
        <span
          className="MainMonth"
          style={i === date.getMonth() ? { fontWeight: "600" } : null}
          onClick={() => setMonth(i)}
          key={month}
        >
          {month}
        </span>
      );
      counter++;
      if (counter === 3) {
        array.push(
          <div className="DesignDatePickerMainDate" key={"quarter_" + i}>
            {quarter}
          </div>
        );
        counter = 0;
        quarter = [];
      }
    });
    return array;
  };

  return (
    <>
      <div className="DesignDatePicker">
        <div className="DesignDatePickerHeader disable-select">
          <div className="PickerMonthYear">{options.Translate ? options.Translation.pickMonth : "Pick a month"}</div>
        </div>
        <div className="DesignDatePickerMain">
          <MonthArray />
        </div>
      </div>
    </>
  );
}
