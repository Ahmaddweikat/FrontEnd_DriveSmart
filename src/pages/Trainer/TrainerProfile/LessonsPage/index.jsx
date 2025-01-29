import React, { useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LessonsList from "./components/LessonsList";
import SearchAndFilter from "./components/SearchAndFilter";
import Pagination from "@mui/material/Pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLessons } from "./hooks/useLessons";
import DayMapping from "../../../../constants/dayMapping";

const LessonsPage = () => {
  const location = useLocation();
  const showList = location.pathname === "/trainer/lessons";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);

  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [lessons, setLessons] = useState([]);

  const itemsPerPage = 5;

  const resetRating = () => {
    setSelectedRating(0);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClosePanel = () => {
    setSelectedLesson(null);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);

    setCurrentPage(1);
  };

  const updateLessonRating = (
    selectedLesson,
    rating,
    feedback,
    newStatus = null
  ) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.title === selectedLesson.title
          ? {
              ...lesson,
              ...selectedLesson,
              status: newStatus || lesson.status,
              rating: rating,
              feedback: feedback,
              reason: newStatus === "canceled" ? feedback : lesson.reason,
            }
          : lesson
      )
    );
  };

  const getTabCounts = () => {
    return {
      outOfDate: lessons.filter((l) => l.status === "out of date").length,
      upcoming: lessons.filter((l) => l.status === "upcoming").length,
      completed: lessons.filter((l) => l.status === "completed").length,
      canceled: lessons.filter((l) => l.status === "canceled").length,
      withRating: lessons.filter(
        (l) => l.status === "completed" && l.rating > 0
      ).length,
      withoutRating: lessons.filter(
        (l) => l.status === "completed" && l.rating === 0
      ).length,
    };
  };

  const filteredAndSortedLessons = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date);
      lessonDate.setHours(0, 0, 0, 0);

      switch (currentTab) {
        case 0: // Out of Date
          return lesson.status === "out of date";
        case 1: // Upcoming
          return lesson.status === "upcoming";
        case 2: // Completed
          return lesson.status === "completed";
        case 3: // Canceled
          return lesson.status === "canceled";
        default:
          return true;
      }
    });
  }, [currentTab, lessons]);

  const displayedLessons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedLessons.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedLessons, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedLessons.length / itemsPerPage);

  const tabCounts = getTabCounts();

  const { data: upcomingLessons = [], isLoading: isUpcomingLoading } =
    useLessons("upcoming");

  const { data: completedLessons = [], isLoading: isCompletedLoading } =
    useLessons("completed");

  const { data: outdatedLessons = [], isLoading: isOutdatedLoading } =
    useLessons("outdated");

  const { data: canceledLessons = [], isLoading: isCanceledLoading } =
    useLessons("canceled");

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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          {showList ? (
            <>
              <div className="max-w-7xl mx-auto">
                <SearchAndFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleFilterSelect={setSelectedRating}
                  selectedRating={selectedRating}
                  setHoveredRating={setHoveredRating}
                  hoveredRating={hoveredRating}
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
                    <Tab label={`Out of Date (${tabCounts.outOfDate})`} />
                    <Tab label={`Upcoming (${tabCounts.upcoming})`} />
                    <Tab label={`Completed (${tabCounts.completed})`} />
                    <Tab label={`Canceled (${tabCounts.canceled})`} />
                  </Tabs>
                </Box>
              </div>

              <LessonsList
                lessons={getCurrentLessons().map((lesson) => ({
                  title: `Lesson with ${lesson.student.name}`,
                  date: new Date(lesson.date).toLocaleDateString("en-CA"),
                  time: lesson.startTime || "00:00:00",
                  day: DayMapping[lesson.day],
                  duration: "1 hour",
                  student: lesson.student.name,
                  studentImage: lesson.student.profilePicture,
                  car: lesson.car.name,
                  carImage: lesson.car.profilePicture,
                  status: lesson.status,
                  rating: lesson.studentRating || 0,
                  feedback: lesson.trainerFeedback || lesson.studentFeedback,
                  reason: lesson.cancellationReason,
                }))}
                selectedRating={selectedRating}
                closeModal={handleClosePanel}
                onUpdateLesson={updateLessonRating}
              />

              <div className="flex justify-center mt-4">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            </>
          ) : (
            <Outlet
              context={{
                lessons: getCurrentLessons().map((lesson) => ({
                  title: `Lesson with ${lesson.student.name}`,
                  date: new Date(lesson.date).toLocaleDateString("en-CA"),
                  time: lesson.startTime,
                  day: DayMapping[lesson.day],
                  duration: "1 hour",
                  student: lesson.student.name,
                  studentImage: lesson.student.profilePicture,
                  car: lesson.car.name,
                  carImage: lesson.car.profilePicture,
                  status: lesson.status,
                  rating: lesson.studentRating || 0,
                  feedback: lesson.trainerFeedback || lesson.studentFeedback,
                  reason: lesson.cancellationReason,
                })),
                updateLessonRating,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
