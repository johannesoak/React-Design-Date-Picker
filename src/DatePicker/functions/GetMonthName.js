import React from "react";

export const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const longMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function GetLongMonths(options, date) {
  // Create the Month array
  const array = [];
  for (let i = 0; i < 12; i++) {
    let date = new Date();
    date.setMonth(i);
    date = date.toLocaleDateString(options.Locales, { month: "long" });
    date = date.charAt(0).toUpperCase() + date.substring(1);
    array.push(date);
  }
  if (date && options.Locales) {
    return array[date.getMonth()];
  } else if (date && options.Locales) {
    return longMonths[date.getMonth()];
  } else if (options.Locales) {
    return array;
  } else {
    return longMonths;
  }
}

export function GetMonthName(date, type) {
  if (type) {
    return longMonths[date.getMonth()];
  } else {
    return shortMonths[date.getMonth()];
  }
}

export function DayNames(options) {
  // Creates an array with Short names of week days
  let DayArray = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    date = new Date(date).toLocaleString(options.Locales, { weekday: "short" });
    date = date.charAt(0).toUpperCase() + date.substring(1);
    DayArray.push(date);
  }

  // Sets the Monday as first day of week
  if (!options.StartWeekOnSunday) {
    const sun = DayArray[0];
    const newArray = DayArray.slice(1);
    DayArray = newArray;
    DayArray.push(sun);
  }

  // Build the JSX
  const array = [];
  DayArray.forEach((day, i) => {
    array.push(<span key={i}>{day}</span>);
  });
  return array;
}
