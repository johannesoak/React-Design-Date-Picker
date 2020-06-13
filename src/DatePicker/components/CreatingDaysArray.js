import React, { useState } from "react";

export default function CreateDaysArray(props) {
  const { date, options, startDate, endDate, PushStartEndDate } = props;
  const [drag, setDrag] = useState(false);
  const PushDate = (date) => {
    PushStartEndDate(date);
  };
  const PushDateOnDrop = (date) => {
    if (drag) {
      PushStartEndDate(date, drag);
    }
  };
  // Calc how many days it was last month
  let DaysLastMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  // Calc what week day first day is
  let FirstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();
  const DaysThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // If first day of month is Sunday but week starts on Monday then set Last weekday
  if (!options.StartWeekOnSunday && FirstDayOfMonth === 0) {
    FirstDayOfMonth = 6;
  } else if (!options.StartWeekOnSunday) {
    FirstDayOfMonth--;
  }

  const loopDays = FirstDayOfMonth + DaysThisMonth > 35 ? 40 : 35;
  const daysArray = [];

  for (let i = 0; i < loopDays; i++) {
    let calenderDate;
    const z = i - FirstDayOfMonth + 1;
    // Previous Month
    if (i < FirstDayOfMonth) {
      const n = DaysLastMonth - FirstDayOfMonth + i + 1;
      calenderDate = new Date(date.getFullYear(), date.getMonth() - 1, n);
      daysArray.push({
        day: n,
        date: calenderDate,
        active: false,
        selected: false,
      });
    }
    // Next Month
    else if (i >= FirstDayOfMonth + DaysThisMonth.getDate()) {
      const y = i - DaysThisMonth.getDate() - FirstDayOfMonth + 1;
      calenderDate = new Date(date.getFullYear(), date.getMonth() + 1, y);
      daysArray.push({
        day: y,
        date: calenderDate,
        active: false,
        selected: false,
      });
    }
    // This Month - Active Date
    else if (
      (startDate &&
        startDate.getFullYear() === date.getFullYear() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getDate() === z) ||
      (endDate &&
        endDate.getFullYear() === date.getFullYear() &&
        endDate.getMonth() === date.getMonth() &&
        endDate.getDate() === z)
    ) {
      calenderDate = new Date(date.getFullYear(), date.getMonth(), z);
      daysArray.push({
        day: z,
        date: calenderDate,
        active: true,
        selected: false,
      });
    }
    // This Month
    else {
      calenderDate = new Date(date.getFullYear(), date.getMonth(), z);
      daysArray.push({
        day: z,
        date: calenderDate,
        active: false,
        selected:
          (startDate && endDate && startDate < calenderDate && endDate > calenderDate) ||
          (startDate && endDate && startDate > calenderDate && endDate < calenderDate)
            ? true
            : false,
      });
    }
  }

  const array = [];
  let weekArray = [];
  let counter = 0;
  daysArray.forEach((day, i) => {
    if (date.getMonth() !== day.date.getMonth()) {
      weekArray.push(
        <span className="NotActiveMonth" key={"OtherMonth" + day.day}>
          {day.day}
        </span>
      );
    } else if (date.getMonth() === day.date.getMonth()) {
      let selected = day.selected ? "SelectedDay" : "";
      let active = day.active ? "ActiveDay" : "";
      weekArray.push(
        <span
          key={"ThisMonth" + day.day}
          className={selected + active}
          onClick={() => PushDate(day.date)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => PushDateOnDrop(day.date)}
          onDrag={(event) => {
            if (startDate.getDate() === day.date.getDate()) {
              event.preventDefault();
              setDrag("start");
            } else if (endDate.getDate() === day.date.getDate()) {
              event.preventDefault();
              setDrag("end");
            } else {
              event.preventDefault();
              setDrag(false);
            }
          }}
          draggable
        >
          {day.day}
        </span>
      );
    }
    // Counts the Day of Week Number
    counter++;
    // If new week start
    if (counter >= 7) {
      array.push(
        <div className="DesignDatePickerMainDate" key={"weekday_" + i}>
          {weekArray}
        </div>
      );
      // Reset to a new week
      weekArray = [];
      counter = 0;
    }
  });
  return array;
}
