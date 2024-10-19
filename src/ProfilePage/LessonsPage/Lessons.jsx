import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import LessonsList from "./components/LessonsList";

const Lessons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("lessons");
  const [filter, setFilter] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Define a list of lessons with ratings
  const lessons = [
    {
      title: "Lesson Title",
      date: "October 5, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Completed",
      rating: 5,
    },
    {
      title: "Basic Vehicle Control",
      date: "October 5, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Showed improvement in steering control. Needs to work on smooth braking.",
      rating: 5,
    },
    {
      title: "Lesson Title",
      date: "October 5, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Completed",
      rating: 3,
    },
    {
      title: "Lesson Title",
      date: "October 15, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Completed",
      rating: 2,
    },
  ];

  // Function to render star rating

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar toggleSidebar={toggleSidebar} />
        <Breadcrumb />

        {/* Main Body */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel lessons={lessons} />
            <SearchAndFilter
              setFilter={setFilter}
              setHoveredRating={setHoveredRating}
              handleFilterSelect={(rating) => {
                setFilter(rating);
                setSelectedRating(rating === "" ? 0 : parseInt(rating[0], 10));
              }}
              hoveredRating={hoveredRating}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
            <LessonsList
              lessons={lessons}
              selectedRating={selectedRating}
              setFilter={setFilter}
              setSelectedRating={setSelectedRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
