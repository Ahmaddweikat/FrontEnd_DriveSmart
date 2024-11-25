import { useState } from "react";

const useFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    car: false,
    motorcycle: false,
    bus: false,
    tractor: false,
    taxi: false,
  });

  const [ratingValue, setRatingValue] = useState(0);

  const handleLicenseChange = (event, type) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [type]: event.target.checked };
      return updatedFilters;
    });
  };

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      Car: false,
      Motorcycle: false,
      Bus: false,
      Tractor: false,
      Taxi: false,
    });
    setRatingValue(0);
  };

  return {
    selectedFilters,
    ratingValue,
    handleLicenseChange,
    handleRatingChange,
    handleClearFilters,
  };
};

export default useFilters;
