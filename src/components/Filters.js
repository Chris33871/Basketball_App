import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filters.css";

function Filters() {
  const [selectedDate, setSelectedDate] = useState(null);

  const initialFilters = {
    isDistance: "",
    isLeisure: false,
    isCompetitive: false,
    isTraining: false,
    sex: "",
    isIndoors: false,
    isOutdoors: false,
  };

  const [filters, setFilters] = useState(initialFilters);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSelectedDate(null);
  };

  return (
    <div className="filters">
      <DatePicker
        className="date--picker"
        placeholderText="Select Date"
        value={selectedDate}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
      />
      <label className="label--filters--distance">
        <h5>Distance</h5>
        <select
          className="distance--input"
          name="isDistance"
          value={filters.isDistance}
          onChange={handleChange}
        >
          <option value="3km">Less than 3km</option>
          <option value="5km">Less than 5km</option>
          <option value="10km">Less than 10km</option>
        </select>
      </label>
      <div className="competition">
        <div className="compLvl">
          <h5 className="compLvl--h5">Level</h5>
          <label className="compLvl--label">
            <input
              className="compLvl--input"
              type="checkbox"
              name="isLeisure"
              onChange={handleChange}
              value={filters.isLeisure}
            />
            Leisure
          </label>

          <label className="compLvl--label">
            <input
              className="compLvl--input"
              type="checkbox"
              name="isCompetitive"
              onChange={handleChange}
              value={filters.isCompetitive}
            />
            Competitive
          </label>

          <label className="compLvl--label">
            <input
              className="compLvl--input"
              type="checkbox"
              name="isTraining"
              onChange={handleChange}
              value={filters.isTraining}
            />
            Pro Run
          </label>
        </div>

        <div className="compSex">
          <h5>Play against:</h5>
          <label className="compSex--label">
            <input
              className="compSex--input"
              type="radio"
              name="sex"
              value="men"
              checked={filters.sex === "men"}
              onChange={handleChange}
            />
            Men
          </label>
          <label className="compSex--label">
            <input
              className="compSex--input"
              type="radio"
              name="sex"
              value="women"
              checked={filters.sex === "women"}
              onChange={handleChange}
            />
            Women
          </label>
          <label className="compSex--label">
            <input
              className="compSex--input"
              type="radio"
              name="sex"
              value="mix"
              checked={filters.sex === "mix"}
              onChange={handleChange}
            />
            Mix
          </label>
        </div>

        <div className="compArea">
          <h5 className="compArea--h5">Location</h5>
          <label className="compArea--label">
            <input
              className="compArea--input"
              type="checkbox"
              name="isIndoors"
              onChange={handleChange}
              value={filters.isIndoors}
            />
            Indoors
          </label>

          <label className="compArea--label">
            <input
              className="compArea--input"
              type="checkbox"
              name="isOutdoors"
              onChange={handleChange}
              value={filters.isOutdoors}
            />
            Outdoors
          </label>
        </div>
        <button className="date--reset" onClick={handleResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
