import { useMemo } from "react";
import LicenseTypes from "../../../constants/licenseTypes";

const useFilteredCards = (schools = [], filters) => {
  const { selectedCity, selectedLicenseTypes, ratingValue, searchQuery } =
    filters;

  return useMemo(() => {
    const schoolsList = Array.isArray(schools) ? schools : [];

    if (
      !selectedCity &&
      !selectedLicenseTypes.length &&
      !ratingValue &&
      !searchQuery
    ) {
      return schoolsList;
    }

    return schoolsList.filter((school) => {
      const cityMatch = !selectedCity || school.city === selectedCity;

      const licenseMatch =
        !selectedLicenseTypes.length ||
        school.licenseTypes?.some((schoolType) =>
          selectedLicenseTypes.some(
            (selectedType) => LicenseTypes[selectedType] === schoolType
          )
        );

      const ratingMatch = !ratingValue || school.rating >= ratingValue;
      const searchMatch =
        !searchQuery ||
        school.name.toLowerCase().includes(searchQuery.toLowerCase());

      return cityMatch && licenseMatch && ratingMatch && searchMatch;
    });
  }, [schools, selectedCity, selectedLicenseTypes, ratingValue, searchQuery]);
};

export default useFilteredCards;
