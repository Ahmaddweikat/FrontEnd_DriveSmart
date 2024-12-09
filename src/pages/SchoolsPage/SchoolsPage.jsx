import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import FilterListIcon from "@mui/icons-material/FilterList";
import NorthIcon from "@mui/icons-material/North";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Footer from "../../components/Footer";
// import useCardData from "../../constants/ActionCardsData/cardsData";
import useScrollManagement from "../../hooks/useScrollManagement";
import FilterPanel from "./components/FilterPanel";
import useFetchSchools from "./hooks/useFetchSchools";
import useFilter from "./hooks/useFilter";
import useFilteredCards from "./hooks/useFilteredCards";
import usePagination from "./hooks/usePagination";
import { Link, useNavigate } from "react-router-dom";
import LicenseTypes from "./../../constants/licenseTypes";
import Spinner from "./../../components/Spinner/index";

const SchoolsPage = () => {
  const navigate = useNavigate();
  const { data: cardsData, isLoading, error } = useFetchSchools();

  const {
    selectedCity,
    setSelectedCity,
    selectedLicenseTypes,
    setSelectedLicenseTypes,
    ratingValue,
    setRatingValue,
    searchQuery,
    setSearchQuery,
    applyFilters,
  } = useFilter();

  const {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    handlePageChange,
  } = usePagination(cardsData?.length || 0);

  const filteredCardsData = useFilteredCards(cardsData ?? [], {
    selectedCity,
    selectedLicenseTypes,
    ratingValue,
    searchQuery,
  });

  const currentCards = filteredCardsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const [isFilterPanelOpen, setIsFilterPanelOpen] = React.useState(false);

  const handleFilterToggle = () => {
    setIsFilterPanelOpen((prevState) => !prevState);
  };

  const { showBackToTop } = useScrollManagement();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const licenseTypeOptions = Object.entries(LicenseTypes).map(
    ([key, value]) => ({
      id: key,
      name: value,
    })
  );

  if (isLoading) return <Spinner />;
  if (error) navigate("/not-found");

  if (!isLoading)
    return (
      <div className="bg-custombg">
        {/* Top Bar */}

        <div className="relative">
          {/* Filter Panel */}
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-300 ${
              isFilterPanelOpen ? "w-80 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <FilterPanel
              isExpanded={isFilterPanelOpen}
              onClose={handleFilterToggle}
              setSelectedCity={setSelectedCity}
              setSelectedLicenseTypes={setSelectedLicenseTypes}
              setRatingValue={setRatingValue}
              setSearchQuery={setSearchQuery}
              applyFilters={applyFilters}
              licenseTypeOptions={licenseTypeOptions}
            />
          </div>

          {/* Content Section */}
          <div
            className={`p-8 transition-all duration-300 ${
              isFilterPanelOpen ? "ml-80" : "ml-0"
            }`}
          >
            <h3 className="flex justify-center text-4xl mt-8">
              Driving Schools
            </h3>

            <div className="flex items-center text-center my-6 relative">
              <span className="outer-line flex-grow border-b border-gray-300"></span>
              <span className="mx-4">
                <EmojiTransportationIcon style={{ width: 40, height: 40 }} />
              </span>
              <span className="outer-line flex-grow border-b border-gray-300 relative">
                <Button
                  variant="outlined"
                  onClick={handleFilterToggle}
                  endIcon={<FilterListIcon />}
                  style={{
                    color: "#72b626",
                    position: "absolute",
                    top: "-40px",
                    right: "20px",
                    borderColor: "#72b626",
                  }}
                >
                  Filter
                </Button>
              </span>
            </div>

            {/* Cards Grid */}
            <div
              className={`grid ${
                isFilterPanelOpen
                  ? "grid-cols-1 md:grid-cols-3 gap-6"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              }`}
            >
              {currentCards.map((school, index) => (
                <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={school.profilePicture}
                      alt={school.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {school.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 1 }}
                      >
                        {school.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        <>City:</> {school.city}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={`/school/${school.id}`} target="_blank">
                      <Button size="small" color="primary">
                        Visit
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 bg-customGreen text-white p-2 rounded-full shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            aria-label="Back to top"
          >
            <NorthIcon />
          </button>
        )}

        {/* Pagination */}
        <div className="flex justify-center my-4">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
};

export default SchoolsPage;
