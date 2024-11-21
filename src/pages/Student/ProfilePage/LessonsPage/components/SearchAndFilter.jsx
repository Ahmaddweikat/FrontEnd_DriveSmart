import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const SearchAndFilter = ({
  handleFilterSelect, // Function to handle filter selection
  selectedRating,
  setHoveredRating,
  hoveredRating,
  setSearchTerm, // Function to set search term
  resetRating, // Function to reset rating to 'All'
}) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClear = () => {
    resetRating();
  };

  return (
    <div className="mb-6 flex items-center space-x-6">
      {/* Search Bar */}
      <div className="flex flex-1 space-x-4">
        <input
          type="text"
          placeholder="Search by lesson title"
          onChange={handleSearchChange}
          className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen"
        />
      </div>

      {/* Rating Filter */}
      <div className="flex items-center">
        <span className="text-sm font-medium">Filter by Rating:</span>
        <div className="flex ml-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <div
              key={rating}
              onClick={() => handleFilterSelect(rating)} // Call handleFilterSelect to set rating
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={
                  rating <= (hoveredRating || selectedRating)
                    ? solidStar
                    : regularStar
                }
                className="h-6 w-6 text-yellow-400"
              />
            </div>
          ))}
        </div>
        {/* Clear Button */}
        <button
          onClick={handleClear} // Reset rating to 'All'
          className="ml-4 text-sm text-customGreen underline-shrink "
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
