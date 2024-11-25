import { useState } from "react";

const useCity = (initialValue = null) => {
  const [selectedCity, setSelectedCity] = useState(initialValue);

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
  };

  const handleClearCity = () => {
    setSelectedCity(null);
  };

  return {
    selectedCity,
    handleCityChange,
    handleClearCity,
  };
};

export default useCity;
