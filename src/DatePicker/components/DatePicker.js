import React, { useCallback } from "react";

// Components
import CreateDaysArray from "../components/CreatingDaysArray";

// Functions
import { DayNames, GetLongMonths } from "../functions/GetMonthName";

// Arrow
import Arrow from "../asset/Arrow";

export default function DatePicker(props) {
  const { options, date, setDate, startDate, endDate, PushStartEndDate, setNav } = props;

  // Set previous month
  const prevMonth = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))
  }, [date, setDate]);
  // Set next month
  const nextMonth = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))
  }, [date, setDate]);
  // Toggle Month Picker
  const toggleMonth = () => {
    setNav("month");
  };
  // Toggle Year Picker
  const toggleYear = () => {
    setNav("year");
  };

  return (
    <>
      <div className="DesignDatePicker">
        <div className="DesignDatePickerHeader disable-select">
          <div onClick={prevMonth}>
            <Arrow size="20px" direction="left" />
          </div>
          <div className="PickerMonthYear">
            <span onClick={toggleMonth}>{GetLongMonths(options, date)}</span>{" "}
            <span onClick={toggleYear}>{date.getFullYear()}</span>
          </div>
          <div onClick={nextMonth}>
            <Arrow size="20px" direction="right" />
          </div>
        </div>
        <div className="DesignDatePickerSubHeader disable-select">
          {DayNames(options)}
        </div>
        <div className="DesignDatePickerMain">
          <CreateDaysArray
            date={date}
            options={options}
            startDate={startDate}
            endDate={endDate}
            PushStartEndDate={PushStartEndDate}
          />
        </div>
      </div>
    </>
  );
}
