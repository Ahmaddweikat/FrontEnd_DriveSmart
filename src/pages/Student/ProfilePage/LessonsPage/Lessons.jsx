import React, { useState, useEffect } from "react";
import TopBar from "../../../../components/ProfileTopBar/TopBar";
import Sidebar from "../../../../components/ProfileSideBar/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import LessonsList from "./components/LessonsList";
import useNotificationsState from "../../../../hooks/useNotificationsState";
import useRatingFulter from "./hooks/useRatingFilter";
import useSearchState from "./hooks/useSearchState";
import useSidebarState from "../../../../hooks/useSidebarState";
import { lessons } from "./constants/Lessons";

const Lessons = () => {
  const [activePage, setActivePage] = useState("lessons");
  const [filter, setFilter] = useState({});
  const [activeTab, setActiveTab] = useState("completed");

  const handleFilterSelect = (rating) => {
    setFilter({ ...filter, rating });
  };

  const { isExpanded, toggleSidebar } = useSidebarState();
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationsState();
  const { setSearchTerm, filteredLessons } = useSearchState(lessons[activeTab]);
  const {
    hoveredRating,
    selectedRating,
    setHoveredRating,
    handleRatingClick,
    resetRating,
  } = useRatingFulter(handleFilterSelect);

  // Function to toggle tabs and clear search term
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(""); // Clear search when tab changes
  };

  // Reset search term whenever activeTab changes
  useEffect(() => {
    setSearchTerm(""); // Ensure search term is cleared when tab changes
  }, [activeTab, setSearchTerm]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications}
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <Breadcrumb />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel lessons={lessons[activeTab]} />
            {/* Tabs for Completed and Upcoming Lessons */}
            <div className="flex mb-6 border-b">
              <button
                onClick={() => handleTabChange("completed")}
                className={`px-4 py-2 text-lg font-semibold ${
                  activeTab === "completed"
                    ? "border-b-2 border-customGreen text-customGreen"
                    : "text-gray-600"
                } transition-all`}
              >
                Completed Lessons
              </button>
              <button
                onClick={() => handleTabChange("upcoming")}
                className={`px-4 py-2 text-lg font-semibold ${
                  activeTab === "upcoming"
                    ? "border-b-2 border-customGreen text-customGreen"
                    : "text-gray-600"
                } transition-all`}
              >
                Upcoming Lessons
              </button>
            </div>
            {/* Search and Filter Component */}
            <SearchAndFilter
              setFilter={setFilter}
              handleFilterSelect={handleRatingClick}
              selectedRating={selectedRating}
              setHoveredRating={setHoveredRating}
              hoveredRating={hoveredRating}
              setSearchTerm={setSearchTerm}
              resetRating={resetRating}
            />
            {/* Lessons List Component */}
            <LessonsList
              lessons={filteredLessons}
              selectedRating={selectedRating}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
