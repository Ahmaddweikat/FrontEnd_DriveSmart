import { useState } from "react";

export const useFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // Keep track of selected type
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

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleClearSearch = () => setSearchQuery("");
  const handleClearCity = () => setSelectedCity(null);
  const handleClearType = () => setSelectedType(null); // Clear selected type
  const handleClearCourse = () => setSelectedCourse(null);
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
    handleClearType(); // Clear type in clear all
    handleClearRate();
    handleClearCourse();
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return {
    searchQuery,
    selectedCity,
    selectedType,
    selectedCourse,
    selectedFilters,
    value,
    hover,
    handleSearchChange,
    handleClearSearch,
    handleClearCity,
    handleClearType, // Export the clear type function
    handleClearCourse,
    handleClearRate,
    handleClearAll,
    handleFilterChange,
    setValue,
    setHover,
    setSelectedCity,
    setSelectedCourse,
  };
};
