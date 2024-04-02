import React from "react";

export function DateRangePicker({
  setEndDate,
  setStartDate,
  startDate,
  endDate,
}) {
  const handleStartDateChange = (event) => {
    const { value } = event.target;
    setStartDate(value);
    let startDateObj = new Date(value);
    let endDateObj = new Date(endDate);
    if (endDate && startDateObj > endDateObj) {
      endDateObj = new Date(startDateObj);
      endDateObj.setDate(startDateObj.getDate() + 7);
      const endDateFormatted = endDateObj.toISOString().split("T")[0];
      setEndDate(endDateFormatted);
    }
  };

  const handleEndDateChange = (event) => {
    const { value } = event.target;
    setEndDate(value);
  };

  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input
        id="startDate"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        max={new Date().toISOString().split("T")[0]}
      />
      <br />
      <label htmlFor="endDate">End Date:</label>
      <input
        id="endDate"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        min={startDate}
        max={new Date().toISOString().split("T")[0]}
        disabled={!startDate}
      />
    </div>
  );
}
