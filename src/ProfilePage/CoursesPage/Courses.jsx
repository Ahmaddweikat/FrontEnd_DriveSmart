import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import CoursesList from "./components/CoursesList";

const Courses = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("courses");
  const [filter, setFilter] = useState(""); // For search input
  const [selectedRating, setSelectedRating] = useState(0); // Rating state
  const [selectedFilter, setSelectedFilter] = useState("all"); // Filter by difficulty

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const courses = [
    {
      title: "Final Driving Test",
      description: "Comprehensive driving test to assess your skills.",
      price: "50$",
      typeofvichle: "Bus",
      difficult: 1,
    },
    {
      title: "Intermediate Driving Test",
      description: "Test for intermediate drivers focusing on maneuvering.",
      price: "40$",
      typeofvichle: "Car",
      difficult: 2,
    },
    {
      title: "Basic Driving Test",
      description: "Basic skills assessment for new drivers.",
      price: "30$",
      typeofvichle: "Car",
      difficult: 1,
    },
    {
      title: "Parking Test",
      description: "Assessment of parking skills and techniques.",
      price: "25$",
      typeofvichle: "Car",
      difficult: 2,
    },
    {
      title: "Advanced Driving Test",
      description: "Advanced assessment for experienced drivers.",
      price: "60$",
      typeofvichle: "Car",
      difficult: 3,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col">
        <TopBar toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel />
            <SearchAndFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setFilter={setFilter}
              setSelectedRating={setSelectedRating}
            />
            <CoursesList
              courses={courses}
              filter={filter}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
