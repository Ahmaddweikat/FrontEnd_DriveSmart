import React, { useState } from "react";
import LessonsList from "./components/LessonsList";
import SearchAndFilter from "./components/SearchAndFilter";
import { useLessons } from "./hooks/useLessons";
import DayMapping from "../../../../constants/dayMapping";
import { Tabs, Tab, Box, Pagination } from "@mui/material";

const LessonsPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filter, setFilter] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Add handler functions
  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const resetRating = () => {
    setSelectedRating(0);
  };

  const { data: upcomingLessons = [] } = useLessons("upcoming");
  const { data: completedLessons = [] } = useLessons("completed");
  const { data: outdatedLessons = [] } = useLessons("outdated");
  const { data: canceledLessons = [] } = useLessons("canceled");

  const getCurrentLessons = () => {
    switch (currentTab) {
      case 0:
        return outdatedLessons;
      case 1:
        return upcomingLessons;
      case 2:
        return completedLessons;
      case 3:
        return canceledLessons;
      default:
        return [];
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formattedLessons = getCurrentLessons().map((lesson) => ({
    title: `Lesson with ${lesson?.trainer?.name || "Trainer"}`,
    date: new Date(lesson?.date || new Date()).toLocaleDateString("en-CA"),
    time: lesson?.startTime || "",
    day: DayMapping[lesson?.day] || "",
    duration: "1 hour",
    instructor: lesson?.trainer?.name || "Trainer",
    car: lesson?.car?.name || "Vehicle",
    carImage: lesson?.car?.profilePicture || "",
    trainerImage: lesson?.trainer?.profilePicture || "",
    note: lesson?.trainerFeedback || lesson?.studentFeedback || "",
    status: lesson?.status || "pending",
    rating: lesson?.studentRating || 0,
  }));

  const totalPages = Math.ceil(formattedLessons.length / itemsPerPage);
  const displayedLessons = formattedLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <SearchAndFilter
              setFilter={setFilter}
              handleFilterSelect={handleRatingClick}
              selectedRating={selectedRating}
              setHoveredRating={setHoveredRating}
              hoveredRating={hoveredRating}
              setSearchTerm={setSearchTerm}
              resetRating={resetRating}
            />
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                mb: 1,
              }}
            >
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Out of Date" />
                <Tab label="Upcoming" />
                <Tab label="Completed" />
                <Tab label="Canceled" />
              </Tabs>
            </Box>
            <LessonsList lessons={displayedLessons} />
            <div className="flex justify-center mt-4">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
