import React, { useState, useMemo } from "react";
import ProfilePanel from "./components/ProfilePanel";
import LessonsList from "./components/LessonsList";
import SearchAndFilter from "./components/SearchAndFilter";
import Pagination from "@mui/material/Pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const LessonsPage = () => {
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
      status: "upcoming",
      rating: 0
    },
    {
      title: "Advanced Highway Navigation",
      date: "2024-12-30",
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
      title: "Old Lesson",
      date: "2024-11-30",
      duration: "1 hour",
      student: "Alice Brown",
      note: "This lesson is out of date",
      car: "Toyota Corolla",
      status: "Out of date",
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
    newStatus = "completed"
  ) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.title === selectedLesson.title
          ? {
              ...lesson,
              ...selectedLesson,
              status: newStatus,
              rating: rating,
              feedback: feedback,
              reason: newStatus === "canceled" ? feedback : lesson.reason
            }
          : lesson
      )
    );
  };
  const filterLessonsByTab = useMemo(() => {
    const currentDate = new Date();
    let filteredLessons = lessons;

    switch (currentTab) {
      case 0:
        filteredLessons = lessons.filter(
          (lesson) =>
            new Date(lesson.date) < currentDate &&
            lesson.status !== "completed" &&
            lesson.status !== "canceled"
        );

        break;
      case 1:
        filteredLessons = lessons.filter(
          (lesson) =>
            new Date(lesson.date) >= currentDate && lesson.status === "upcoming"
        );

        break;
      case 2:
        filteredLessons = lessons.filter(
          (lesson) => lesson.status === "completed"
        );

        if (currentSubTab === 0) {
          filteredLessons = filteredLessons.filter(
            (lesson) => lesson.rating > 0
          );
        } else {
          filteredLessons = filteredLessons.filter(
            (lesson) => lesson.rating === 0
          );
        }
        break;
      case 3:
        filteredLessons = lessons.filter(
          (lesson) => lesson.status === "canceled"
        );

        break;
    }
    if (selectedRating > 0) {
      filteredLessons = filteredLessons.filter(
        (lesson) => lesson.rating === selectedRating
      );
    }
    if (searchTerm) {
      filteredLessons = filteredLessons.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.student.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredLessons;
  }, [lessons, currentTab, currentSubTab, selectedRating, searchTerm]);

  const displayedLessons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filterLessonsByTab.slice(startIndex, startIndex + itemsPerPage);
  }, [filterLessonsByTab, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filterLessonsByTab.length / itemsPerPage);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 mb-12">
            <ProfilePanel totalLicenses={3} />
          </div>

          <div className="max-w-7xl mx-auto">
            {" "}
            {/* Add this wrapper */}
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
                <Tab
                  label={`Out of Date (${
                    lessons.filter(
                      (l) =>
                        new Date(l.date) < new Date() &&
                        l.status !== "completed" &&
                        l.status !== "canceled"
                    ).length
                  })`}
                />
                <Tab
                  label={`Upcoming (${
                    lessons.filter(
                      (l) =>
                        new Date(l.date) >= new Date() &&
                        l.status === "upcoming"
                    ).length
                  })`}
                />
                <Tab
                  label={`Completed (${
                    lessons.filter((l) => l.status === "completed").length
                  })`}
                />
                <Tab
                  label={`Canceled (${
                    lessons.filter((l) => l.status === "canceled").length
                  })`}
                />
              </Tabs>
            </Box>
            {currentTab === 2 && (
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  width: "100%",
                  mb: 1,
                }}
              >
                <Tabs
                  value={currentSubTab}
                  onChange={handleSubTabChange}
                  variant="fullWidth"
                >
                  <Tab
                    label={`With Rating (${
                      lessons.filter((l) => l.status === "completed" && l.rating > 0).length
                    })`}
                  />
                  <Tab
                    label={`Without Rating (${
                      lessons.filter((l) => l.status === "completed" && l.rating === 0).length
                    })`}
                  />
                </Tabs>
              </Box>
            )}
          </div>

          <LessonsList
            lessons={displayedLessons}
            selectedRating={selectedRating}
            closeModal={handleClosePanel}
            onUpdateLesson={updateLessonRating} // Pass the update method
          />

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
  );
};

export default LessonsPage;
