import { useState } from "react";

const useFilter = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = () => {
    console.log("Filters applied with the following values:");
    console.log("City:", selectedCity);
    console.log("License Types:", selectedLicenseTypes);
    console.log("Rating:", ratingValue);
    console.log("Search Query:", searchQuery);
  };

  return {
    selectedCity,
    setSelectedCity,
    selectedLicenseTypes,
    setSelectedLicenseTypes,
    ratingValue,
    setRatingValue,
    searchQuery,
    setSearchQuery,
    applyFilters,
  };
};

export default useFilter;
