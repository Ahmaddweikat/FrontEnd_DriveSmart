import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import BookIcon from "@mui/icons-material/Book";

const Sidebar = ({ isExpanded }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    car: false,
    motorcycle: false,
    bus: false,
    tractor: false,
    taxi: false,
  });
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => setSearchQuery("");
  const handleClearCity = () => setSelectedCity(null);
  const handleClearType = () => setSelectedType(null);
  const handleClearourse = () => setSelectedCourse(null);
  const handleClearRate = () => setValue(0);

  const handleClearAll = () => {
    setSelectedFilters({
      car: false,
      motorcycle: false,
      bus: false,
      tractor: false,
      taxi: false,
    });
    handleClearSearch();
    handleClearCity();
    handleClearType();
    handleClearRate();
    handleClearourse();
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };
  const CourseDifficulties = [
    { name: "Beginner" },
    { name: "Intermediate" },
    { name: "Advanced" },
  ];
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const Cities = [
    { name: "Jerusalem" },
    { name: "Haifa" },
    { name: "Jaffa" },
    { name: "Hebron" },
    { name: "Bethlehem" },
    { name: "Jericho" },
    { name: "Nablus" },
    { name: "Gaza" },
    { name: "Safed" },
    { name: "Beersheba" },
    { name: "Tiberias" },
    { name: "Akka" },
    { name: "Nazareth" },
    { name: "Ramallah" },
    { name: "Beirah" },
  ];

  const getLabelText = (value) =>
    `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;

  const activeFilterCount = [
    searchQuery.length > 0,
    selectedCity !== null,
    ...Object.values(selectedFilters),
    value > 0,
    selectedCourse !== null, // Include course difficulty in filter count
  ].filter(Boolean).length;

  return (
    <>
      {isExpanded && (
        <aside
          className={`transition-width duration-300 ${
            isExpanded ? "w-60" : "w-0"
          } bg-white flex flex-col items-center py-6 shadow-md border-r-2`}
        >
          <div className="flex justify-start w-full px-4 mb-4 border-b-2 sticky">
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
              <BookIcon style={{ color: "#72b626", marginRight: "0.5rem" }} />
              <label
                htmlFor="course-difficulty"
                className="text-lg font-semibold"
              >
                Course Difficulty
              </label>
              <button
                onClick={handleClearourse}
                className="ml-auto text-gray-400 hover:underline text-sm"
              >
                Clear
              </button>
            </div>
            <Autocomplete
              disablePortal
              options={CourseDifficulties} // Use the updated course difficulties array
              getOptionLabel={(option) => option.name}
              value={selectedCourse} // Keep the selectedCourse state
              onChange={(event, newValue) => setSelectedCourse(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Course Difficulty" />
              )}
              sx={{ width: "100%" }}
            />
          </div>

          <div className="flex flex-col items-start w-full px-4 mb-2 mt-2">
            <div className="flex items-center mb-2 w-full">
              <StarOutlinedIcon
                style={{ color: "#72b626", marginRight: "0.5rem" }}
              />
              <label htmlFor="rate" className="text-lg font-semibold">
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
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {/* {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )} */}
          </div>

          <button
            onClick={() => console.log("Filters applied")}
            className="px-4 py-2 mt-2 bg-customGreen text-white font-semibold rounded hover:bg-green-700 transition duration-200"
          >
            Apply
          </button>
          <nav className="space-y-4 w-full"></nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
