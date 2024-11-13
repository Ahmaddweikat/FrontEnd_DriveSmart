import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import BookIcon from "@mui/icons-material/Book";
import CloseIcon from "@mui/icons-material/Close";
import { useFilters } from "../../hooks/HomePage/SideBar/useFilters"; // Import your custom hook
import { Cities, CourseDifficulties, Labels } from "./constants"; // Import constants

const Sidebar = ({ isExpanded, onClose }) => {
  const {
    searchQuery,
    selectedCity,
    selectedCourse,
    selectedFilters,
    value,
    hover,
    handleSearchChange,
    handleClearSearch,
    handleClearCity,
    handleClearCourse,
    handleClearRate,
    handleClearType,
    handleClearAll,
    handleFilterChange,
    setValue,
    setHover,
    setSelectedCity,
    setSelectedCourse,
  } = useFilters();

  const activeFilterCount = [
    searchQuery.length > 0,
    selectedCity !== null,
    ...Object.values(selectedFilters),
    value > 0,
    selectedCourse !== null,
  ].filter(Boolean).length;

  return (
    <aside
      className={`transition-all duration-300 ease-in-out 
                   ${isExpanded ? "w-60 opacity-100" : "w-0 opacity-0"}
                   bg-white flex flex-col items-center py-6 shadow-md border-r-2`}
    >
      <div className="flex justify-between w-full px-4 mb-4 border-b-2 sticky">
        <button
          onClick={onClose}
          className="absolute bottom-6 right-2 text-gray-400 hover:text-black"
        >
          <CloseIcon />
        </button>
        <h2 className="text-lg font-semibold">
          Filters{" "}
          {activeFilterCount > 0 && (
            <span className="text-customGreen">({activeFilterCount})</span>
          )}
        </h2>
        <button
          onClick={handleClearAll}
          className="ml-auto text-gray-400 hover:underline text-sm"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col items-start w-full px-4 mb-2 mt-2">
        <div className="flex items-center mb-2 w-full">
          <SearchOutlinedIcon
            style={{ color: "#72b626", marginRight: "0.5rem" }}
          />
          <label htmlFor="search" className="text-lg font-semibold">
            Search
          </label>
          <button
            onClick={handleClearSearch}
            className="ml-auto text-gray-400 hover:underline text-sm"
          >
            Clear
          </button>
        </div>
        <input
          id="search"
          type="text"
          placeholder="Search School"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="flex flex-col items-start w-full px-4 mb-2 mt-2">
        <div className="flex items-center mb-2 w-full">
          <LocationCityOutlinedIcon
            style={{ color: "#72b626", marginRight: "0.5rem" }}
          />
          <label htmlFor="city" className="text-lg font-semibold">
            Select City
          </label>
          <button
            onClick={handleClearCity}
            className="ml-auto text-gray-400 hover:underline text-sm"
          >
            Clear
          </button>
        </div>
        <Autocomplete
          disablePortal
          options={Cities}
          getOptionLabel={(option) => option.name}
          value={selectedCity}
          onChange={(event, newValue) => setSelectedCity(newValue)}
          renderInput={(params) => <TextField {...params} label="City" />}
          sx={{ width: "100%" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-1 px-4 mb-2 mt-2">
        <div className="col-span-2 mb-2">
          <CommuteOutlinedIcon
            style={{
              color: "#72b626",
              marginRight: "0.5rem",
              marginBottom: "4px",
            }}
          />
          <label htmlFor="typeofcar" className="text-lg font-semibold">
            Type of license
          </label>
          <button
            onClick={handleClearType}
            className="ml-7 text-gray-400 hover:underline text-sm"
          >
            Clear
          </button>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.car}
              onChange={() => handleFilterChange("car")}
            />
          }
          label="Car"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.motorcycle}
              onChange={() => handleFilterChange("motorcycle")}
            />
          }
          label="Motorcycle"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.bus}
              onChange={() => handleFilterChange("bus")}
            />
          }
          label="Bus"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.tractor}
              onChange={() => handleFilterChange("tractor")}
            />
          }
          label="Tractor"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters.taxi}
              onChange={() => handleFilterChange("taxi")}
            />
          }
          label="Taxi"
        />
      </div>

      <div className="flex flex-col items-start w-full px-4 mb-2 mt-2">
        <div className="flex items-center mb-2 w-full">
          <StarOutlinedIcon
            style={{ color: "#72b626", marginRight: "0.5rem" }}
          />
          <label htmlFor="rating" className="text-lg font-semibold">
            Rating
          </label>
          <button
            onClick={handleClearRate}
            className="ml-auto text-gray-400 hover:underline text-sm"
          >
            Clear
          </button>
        </div>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            setHover(-1);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={<StarIcon style={{ color: "#72b626" }} fontSize="inherit" />}
          emptyIcon={
            <StarIcon style={{ color: "#e0e0e0" }} fontSize="inherit" />
          }
        />
        {value !== null && (
          <div className="text-sm">{Labels[hover !== -1 ? hover : value]}</div>
        )}
      </div>

      <div className="flex flex-col items-start w-full px-4 mb-2 mt-2">
        <div className="flex items-center mb-2 w-full">
          <BookIcon style={{ color: "#72b626", marginRight: "0.5rem" }} />
          <label htmlFor="difficulty" className="text-lg font-semibold">
            Difficulty
          </label>
          <button
            onClick={handleClearCourse}
            className="ml-auto text-gray-400 hover:underline text-sm"
          >
            Clear
          </button>
        </div>
        <Autocomplete
          disablePortal
          options={CourseDifficulties}
          getOptionLabel={(option) => option.name}
          value={selectedCourse}
          onChange={(event, newValue) => setSelectedCourse(newValue)}
          renderInput={(params) => <TextField {...params} label="Difficulty" />}
          sx={{ width: "100%" }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
