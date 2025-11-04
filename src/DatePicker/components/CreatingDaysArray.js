import React, { useState } from "react";

export default function CreateDaysArray(props) {
  const { date, options, startDate, endDate, PushStartEndDate } = props;
  const [drag, setDrag] = useState(false);
  const [tasksByDate, setTasksByDate] = useState({});

  const PushDate = (date) => {
    PushStartEndDate(date);
  };
  const PushDateOnDrop = (date) => {
    if (drag) {
      PushStartEndDate(date, drag);
    }
  };

  // Drag and Drop Handlers

  const handleDragOver = (e) => e.preventDefault();

const handleDropTask = (e, day) => {
  e.preventDefault();
  const task = e.dataTransfer.getData("text/plain"); // text de DraggableItem
  const dayKey = day.date.toISOString().split("T")[0]; // format YYYY-MM-DD
  setTasksByDate((prev) => {
    const prevTasks = prev[dayKey] || [];
    return { ...prev, [dayKey]: [...prevTasks, task] };
  });
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

     const dayKey = day.date.toISOString().split("T")[0];
     const dayTasks = tasksByDate[dayKey] || [];

    if (date.getMonth() !== day.date.getMonth()) {
      weekArray.push(
        <span className="NotActiveMonth" key={"OtherMonth" + day.day}>
          {day.day}
        </span>
      );
    } else {
      const selected = day.selected ? "SelectedDay" : "";
      const active = day.active ? "ActiveDay" : "";
      weekArray.push(
        <span
          key={"ThisMonth" + day.day}
          className={selected + active}
          onClick={() => PushDate(day.date)}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            PushDateOnDrop(day.date);
            handleDropTask(e, day);
          }}
          onDrag={(event) => {
            if (startDate?.getDate() === day.date.getDate()) {
              event.preventDefault();
              setDrag("start");
            } else if (endDate?.getDate() === day.date.getDate()) {
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
          {/* Mostrar tasques */}
          {dayTasks.map((task, idx) => (
            <div
              key={idx}
              style={{
                fontSize: "10px",
                background: "#4da6ff",
                color: "white",
                marginTop: "2px",
                borderRadius: "4px",
                padding: "2px",
              }}
            >
              {task}
            </div>
          ))}
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
