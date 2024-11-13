import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import LessonsList from "./components/LessonsList";
import useNotifications from "../../hooks/HomePage/TopBar/useNotifications"; // Import custom hook for notifications
import useFilter from "../../hooks/StudentDashboard/LessonPage/useRatingFilter"; // Import custom hook for filter
import { lessons } from "./components/constants/Lessons";

const Lessons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("lessons");
  const {
    notificationRef,
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications(); // Use notifications hook

  const { filter, setFilter, selectedRating, setSelectedRating } =
    useFilter(lessons); // Use filter hook

  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

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
              handleFilterSelect={(rating) => {
                setSelectedRating(rating);
              }}
              selectedRating={selectedRating}
            />
            <LessonsList
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
