import React from "react";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
  Rating,
} from "@mui/material";
import Cities from "../constant/cities"; // Ensure this file exists

import useCity from "../hooks/useCity";
import useSearch from "../hooks/useSearch";
import useFilters from "../hooks/useFilters";

const FilterPanel = ({
  isExpanded,
  onClose,
  setSelectedCity,
  setSelectedLicenseTypes,
  setRatingValue,
  setSearchQuery,
  applyFilters,
  licenseTypeOptions,
}) => {
  const { selectedCity, handleCityChange, handleClearCity } = useCity();
  const { searchQuery, handleSearchChange, handleClearSearch } = useSearch();
  const {
    selectedFilters,
    ratingValue,
    handleLicenseChange,
    handleRatingChange,
    handleClearFilters,
  } = useFilters();

  const handleApplyFilters = () => {
    setSelectedCity(selectedCity ? selectedCity.name : null);
    setSelectedLicenseTypes(
      Object.keys(selectedFilters).filter((key) => selectedFilters[key])
    );
    setRatingValue(ratingValue);
    setSearchQuery(searchQuery);
    applyFilters();
  };

  // Count the number of active filters
  const activeFiltersCount = [
    selectedCity,
    ...Object.values(selectedFilters).filter((val) => val),
    ratingValue > 0,
    searchQuery,
  ].filter(Boolean).length;

  const handleClearAll = () => {
    handleClearCity();
    handleClearSearch();
    handleClearFilters();
    setRatingValue(0);
    setSearchQuery("");
    setSelectedCity(null);
    setSelectedLicenseTypes([]);
  };

  const handleClearCheckboxes = () => {
    handleClearFilters();
  };

  return (
    <aside
      className={`transition-all duration-300 ease-in-out ${
        isExpanded ? "w-80 opacity-100" : "w-0 opacity-0"
      } bg-white flex flex-col py-6 shadow-md border-r-2`}
      style={{ position: "sticky", top: 0, height: "100vh" }}
    >
      <div className="flex flex-col px-4 mb-4 border-b-2 sticky -mt-4 top-0 z-10 bg-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="self-end text-gray-400 hover:text-black"
        >
          <CloseIcon />
        </button>

        {/* Filters Header */}
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-semibold flex items-center">
            Filters{" "}
            <span className="text-base text-customGreen ml-2">
              ({activeFiltersCount})
            </span>
          </h2>
          <button
            onClick={handleClearAll}
            className="text-gray-400 hover:underline text-sm"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="flex flex-col overflow-auto px-4 flex-grow">
        {/* Search Input */}
        <div className="flex flex-col items-start w-full mb-2 mt-2">
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

        {/* City Selection */}
        <div className="flex flex-col items-start w-full mb-2 mt-2">
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
            onChange={handleCityChange}
            renderInput={(params) => <TextField {...params} label="City" />}
            sx={{ width: "100%" }}
          />
        </div>

        {/* License Type Filters */}
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
              onClick={handleClearCheckboxes}
              className="ml-16 text-gray-400 hover:underline text-sm"
            >
              Clear
            </button>
          </div>
          {licenseTypeOptions.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  checked={selectedFilters[type.id]}
                  onChange={(e) => handleLicenseChange(e, type.id)}
                />
              }
              label={type.name}
            />
          ))}
        </div>

        {/* Rating Filter */}
        <div className="flex flex-col items-start w-full mb-2 mt-2">
          <div className="flex items-center mb-2 w-full">
            <StarOutlinedIcon
              style={{ color: "#72b626", marginRight: "0.5rem" }}
            />
            <label htmlFor="rating" className="text-lg font-semibold">
              Rating
            </label>
            <button
              onClick={() => handleRatingChange(null, 0)}
              className="ml-auto text-gray-400 hover:underline text-sm"
            >
              Clear
            </button>
          </div>
          <Rating
            name="hover-feedback"
            value={ratingValue}
            precision={0.5}
            onChange={handleRatingChange}
            icon={<StarIcon style={{ color: "#72b626" }} fontSize="inherit" />}
            emptyIcon={
              <StarIcon style={{ color: "#e0e0e0" }} fontSize="inherit" />
            }
          />
        </div>

        {/* Apply Button */}
        <div className="mt-4">
          <button
            onClick={handleApplyFilters}
            className="bg-customGreen text-white py-2 px-4 rounded-full w-full"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
