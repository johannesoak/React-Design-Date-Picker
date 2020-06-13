// HelloWorld.js
import React, { useState, useEffect } from "react";

// Components
import DateCounter from "./components/DateCounter";
import DatePicker from "./components/DatePicker";
import MonthPicker from "./components/MonthPicker";
import YearPicker from "./components/YearPicker";

// Function
import CreateDate from "./functions/CreateDate";
import { CreateLocalDateString } from "./functions/FormatLocal";

// CSS
import "./DatePicker.css";

export default function MainPicker(props) {
  const { options } = props;

  const [nav, setNav] = useState(false);
  const [active, setActive] = useState("start");
  const [startDate, setStartDate] = useState(options.Hooks.start ? options.Hooks.start : false);
  const [endDate, setEndDate] = useState(options.Hooks.end && options.FullFunctionality ? options.Hooks.end : false);
  const [date, setDate] = useState(startDate ? startDate : CreateDate("date"));

  // Sets the correct design
  let CssID;
  if (options.Design === "Compact") {CssID = "DesignDataPickerCompact";}
  else if (options.Design === "Classic") {CssID = "DesignDataPicker";}
  else {CssID = "DesignDataPicker";}

  const ToggleStart = (type) => {
    setNav("date");
    setActive(type);
  };

  // Function that sets the Start/End date
  const PushStartEndDate = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    } else if (active === "start") {
      setStartDate(date);
    } else if (active === "end") {
      setEndDate(date);
    }
  };

  // If the start date is later then the end date then it changes them on popup dismiss
  const ChangeDates = () => {
    if (startDate && endDate && startDate > endDate) {
      const start = startDate;
      const end = endDate;
      setStartDate(end);
      setEndDate(start);
    }
  };

  // When set start/end date to date and the other is false
  // Then switches active to the false
  useEffect(() => {
    if (options.FullFunctionality && startDate && !endDate) {
      setActive("end");
    } else if (options.FullFunctionality && !startDate && endDate) {
      setActive("start");
    }
  }, [startDate, endDate]);

  // Switches the calender date to show the active start/end date
  useEffect(() => {
    if (startDate && active === "start") {
      setDate(startDate);
    } else if (endDate && active === "end") {
      setDate(endDate);
    }
  }, [startDate, endDate, active]);

  return (
    <>
      <div
        id={CssID}
        className="OuterDatePicker"
        style={options.FullFunctionality ? null : { width: "150px" }}
      >
        <div
          className="OuterStartTime"
          onClick={() => ToggleStart("start")}
          style={options.FullFunctionality ? null : { width: "100%" }}
        >
          <span>
            {options.Translate ? options.Translation.change : "Change Date"}
          </span>
          {CreateLocalDateString(startDate, options, "Start Datum")}
        </div>
        {options.FullFunctionality ? (
          <>
            -
            <div className="OuterEndTime" onClick={() => ToggleStart("end")}>
              <span>
                {options.Translate ? options.Translation.change : "Change Date"}
              </span>
              {CreateLocalDateString(endDate, options, "Slut Datum")}
            </div>
          </>
        ) : null}
      </div>
      {nav ? (
        <div id={CssID}>
          <div
            className="OuterArea"
            onClick={() => {
              ChangeDates();
              setNav(false);
            }}
          ></div>
          <div className="DesignDatePickerWrapper InnerArea">
            {options.FullFunctionality && startDate && endDate ? (
              <DateCounter
                options={options}
                active={active}
                setActive={setActive}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                ChangeDates={ChangeDates}
              />
            ) : null}
            {nav === "date" ? (
              <DatePicker
                options={options}
                date={date}
                setDate={setDate}
                startDate={startDate}
                endDate={endDate}
                PushStartEndDate={PushStartEndDate}
                setNav={setNav}
              />
            ) : null}
            {nav === "month" ? (
              <MonthPicker
                options={options}
                startDate={startDate}
                date={date}
                setDate={setDate}
                setNav={setNav}
              />
            ) : null}
            {nav === "year" ? (
              <YearPicker
                options={options}
                date={date}
                setDate={setDate}
                setNav={setNav}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
