import React, { useState } from "react";

// Function
import CreateDate from "../functions/CreateDate"
import { CreateLocalDateString } from "../functions/FormatLocal"

import Switch from "../asset/Switch"

export default function DateCounter(props) {
  const { options, active, setActive, startDate, setStartDate, endDate, setEndDate, ChangeDates } = props;
  const [changeDate, setChangeDate] = useState(false);

  const InputDate = () => {
    if (!Date.parse(changeDate) && active === "start") {
      setTimeout(() => {
        setChangeDate(CreateLocalDateString(startDate, options));
      }, 200);
    } else if (!Date.parse(changeDate) && active === "end") {
      setTimeout(() => {
        setChangeDate(CreateLocalDateString(endDate, options));
      }, 200);
    } else if (active === "start") {
      setStartDate(CreateDate(new Date(changeDate)));
      setChangeDate(false);
    } else if (active === "end") {
      setEndDate(CreateDate(new Date(changeDate)));
      setChangeDate(false);
    }
  };

  return (
    <div className="DateCounter">
      <div
        className={
          active === "start"
            ? "StartDateCounter ActiveDate"
            : "StartDateCounter"
        }
        onClick={() => setActive("start")}
      >
        <span className="DateExplainer">{options.Translate ? options.Translation.startDate : "Start date"}</span>
        {active === "start" ? (
          <input
            value={
              active === "start" && changeDate
                ? changeDate
                : CreateLocalDateString(startDate, options, "")
            }
            onMouseEnter={() => setChangeDate(CreateLocalDateString(startDate, options))}
            onKeyPress={(e) => {
              if (e.key === "Enter" && changeDate) {
                InputDate();
              }
            }}
            onMouseLeave={() => {
              if (changeDate) {
                InputDate();
              }
            }}
            onChange={(e) => setChangeDate(e.currentTarget.value)}
          />
        ) : (
          <span>{CreateLocalDateString(startDate, options)}</span>
        )}
      </div>
      <div
        className={
          active === "end" ? "EndDateCounter ActiveDate" : "EndDateCounter"
        }
        onClick={() => setActive("end")}
      >
        <span className="DateExplainer">{options.Translate ? options.Translation.endDate : "End date"}</span>
        {active === "end" ? (
          <input
            value={
              active === "end" && changeDate
                ? changeDate
                : CreateLocalDateString(endDate, options, "")
            }
            onMouseEnter={() => setChangeDate(CreateLocalDateString(endDate, options))}
            onKeyPress={(e) => {
              if (e.key === "Enter" && changeDate) {
                InputDate();
              }
            }}
            onMouseLeave={() => {
              if (changeDate) {
                InputDate();
              }
            }}
            onChange={(e) => setChangeDate(e.currentTarget.value)}
          />
        ) : (
          <span>{CreateLocalDateString(endDate, options)}</span>
        )}
      </div>
      {startDate > endDate ? <div className="DateSwitcher" onClick={ChangeDates}>
        <Switch size="20px" color="white" />
      </div> : null}
    </div>
  );
}
