import React, { useState } from "react";
import TopBar from "../../components/ProfileTopBar/TopBar";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import LessonsList from "./components/LessonsList";
import useNotificationsState from "./hooks/useNotificationsState"; // Import custom hook
import useRatingFulter from "./hooks/useRatingFilter"; // Import custom hook
import useSearchState from "./hooks/useSearchState"; // Import custom hook
import useSidebarState from "../../hooks/useSidebarState"; // Import custom hook
import { lessons } from "./constants/Lessons"; // Assuming lessons are imported

const Lessons = () => {
  const [activePage, setActivePage] = useState("lessons");
  const [filter, setFilter] = useState({}); // Filter state initialized here

  const handleFilterSelect = (rating) => {
    setFilter({ ...filter, rating }); // Apply filter on rating
  };

  const { isExpanded, toggleSidebar } = useSidebarState();
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationsState();
  const { setSearchTerm, filteredLessons } = useSearchState(lessons); // Use search hook
  const {
    hoveredRating,
    selectedRating,
    setHoveredRating,
    handleRatingClick,
    resetRating,
  } = useRatingFulter(handleFilterSelect); // Use rating filter hook

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
            <ProfilePanel lessons={lessons} />
            <SearchAndFilter
              setFilter={setFilter}
              handleFilterSelect={handleRatingClick}
              selectedRating={selectedRating}
              setHoveredRating={setHoveredRating}
              hoveredRating={hoveredRating}
              setSearchTerm={setSearchTerm}
              resetRating={resetRating}
            />
            <LessonsList
              lessons={filteredLessons}
              selectedRating={selectedRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
