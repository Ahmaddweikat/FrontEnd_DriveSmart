import { useMemo } from "react";

const useFilteredCards = (
  cardsData,
  { selectedCity, selectedLicenseTypes, ratingValue, searchQuery }
) => {
  const filteredCardsData = useMemo(() => {
    return cardsData.filter((card) => {
      const isCityMatch = !selectedCity || card.city === selectedCity;
      const isLicenseMatch =
        selectedLicenseTypes.length === 0 ||
        selectedLicenseTypes.some((type) => card.licenseTypes.includes(type));
      const isRatingMatch = card.rating >= ratingValue;
      const isSearchMatch =
        !searchQuery ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase());

      return isCityMatch && isLicenseMatch && isRatingMatch && isSearchMatch;
    });
  }, [cardsData, selectedCity, selectedLicenseTypes, ratingValue, searchQuery]);

  return filteredCardsData;
};

export default useFilteredCards;
