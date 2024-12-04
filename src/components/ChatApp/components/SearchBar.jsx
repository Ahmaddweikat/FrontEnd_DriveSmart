import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear"; // Import ClearIcon from Material UI

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleClear = () => {
    setSearchQuery(""); // Reset the search query when clear button is clicked
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

      {/* Clear button */}
      {searchQuery && (
        <ClearIcon
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleClear} 
        />
      )}
    </div>
  );
};

export default SearchBar;
