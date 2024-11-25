import { useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    handleSearchChange,
    handleClearSearch,
  };
};

export default useSearch;
