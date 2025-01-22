import React, { useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfilePanel from "./components/ProfilePanel";
import LessonsList from "./components/LessonsList";
import SearchAndFilter from "./components/SearchAndFilter";
import Pagination from "@mui/material/Pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const LessonsPage = () => {
  const location = useLocation();
  const showList = location.pathname === '/trainer/lessons';

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);

  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentSubTab, setCurrentSubTab] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [lessons, setLessons] = useState([
    {
      title: "Winter Driving Techniques",
      date: "2024-12-28",
      duration: "2 hours",
      student: "Emily Davis",
      note: "Focus on winter driving safety",
      car: "Toyota Corolla",
      status: "out of date",  
      rating: 0
    },
    {
      title: "Advanced Highway Navigation",
      date: "2025-01-15",
      duration: "1.5 hours",
      student: "Robert Wilson",
      note: "Complex highway scenarios",
      car: "Toyota Corolla",
      status: "upcoming",  
      rating: 0
    },
    {
      title: "Advanced Parking",
      date: "2024-12-10",
      duration: "1 hour",
      student: "Jane Smith",
      note: "Parallel parking practice",
      car: "Toyota Corolla",
      status: "completed",
      rating: 5,
    },
    {
      title: "Highway Driving",
      date: "2024-12-08",
      duration: "2 hours",
      student: "Mike Johnson",
      note: "Canceled due to weather",
      car: "Toyota Corolla",
      status: "canceled",
      reason: "Weather",
      rating: 0,
    },
    {
      title: "Night Driving",
      date: "2024-12-01",
      duration: "1.5 hours",
      student: "Sarah Wilson",
      note: "Basic night driving techniques",
      car: "Toyota Corolla",
      status: "completed",
      rating: 4,
    },
    {
      title: "Basic Training",
      date: "2024-11-30",
      duration: "1 hour",
      student: "Alice Brown",
      note: "This lesson is out of date",
      car: "Toyota Corolla",
      status: "out of date",  
      rating: 0,
    },
    {
      title: "Driving Assessment",
      date: "2024-12-05",
      duration: "1 hour",
      student: "Tom Hanks",
      note: "Assessment of driving skills",
      car: "Toyota Corolla",
      status: "completed",
      rating: 0,
    },
  ]);

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
    setCurrentSubTab(0);
  };

  const handleSubTabChange = (event, newValue) => {
    setCurrentSubTab(newValue);
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
              reason: newStatus === "canceled" ? feedback : lesson.reason
            }
          : lesson
      )
    );
  };

  const getTabCounts = () => {
    return {
      outOfDate: lessons.filter(l => l.status === "out of date").length,
      upcoming: lessons.filter(l => l.status === "upcoming").length,
      completed: lessons.filter(l => l.status === "completed").length,
      canceled: lessons.filter(l => l.status === "canceled").length,
      withRating: lessons.filter(l => l.status === "completed" && l.rating > 0).length,
      withoutRating: lessons.filter(l => l.status === "completed" && l.rating === 0).length,
    };
  };

  const filteredAndSortedLessons = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return lessons.filter(lesson => {
      const lessonDate = new Date(lesson.date);
      lessonDate.setHours(0, 0, 0, 0);

      switch (currentTab) {
        case 0: // Out of Date
          return lesson.status === "out of date";
        case 1: // Upcoming
          return lesson.status === "upcoming";
        case 2: // Completed
          if (currentSubTab === 0) {
            return lesson.status === "completed" && lesson.rating > 0;
          } else {
            return lesson.status === "completed" && lesson.rating === 0;
          }
        case 3: // Canceled
          return lesson.status === "canceled";
        default:
          return true;
      }
    });
  }, [currentTab, currentSubTab, lessons]);

  const displayedLessons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedLessons.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedLessons, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedLessons.length / itemsPerPage);

  const tabCounts = getTabCounts();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          {showList ? (
            <>
              <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 mb-12">
                <ProfilePanel totalLicenses={3} />
              </div>

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
                <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", mb: 1 }}>
                  <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
                    <Tab label={`Out of Date (${tabCounts.outOfDate})`} />
                    <Tab label={`Upcoming (${tabCounts.upcoming})`} />
                    <Tab label={`Completed (${tabCounts.completed})`} />
                    <Tab label={`Canceled (${tabCounts.canceled})`} />
                  </Tabs>
                </Box>
                {currentTab === 2 && (
                  <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", mb: 1 }}>
                    <Tabs value={currentSubTab} onChange={handleSubTabChange} variant="fullWidth">
                      <Tab label={`With Rating (${tabCounts.withRating})`} />
                      <Tab label={`Without Rating (${tabCounts.withoutRating})`} />
                    </Tabs>
                  </Box>
                )}
              </div>

              <LessonsList
                lessons={displayedLessons}
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
            <Outlet context={{ lessons, setLessons, updateLessonRating }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
