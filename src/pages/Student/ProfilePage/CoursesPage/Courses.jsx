import React, { useState } from "react";
import TopBar from "../../../../components/ProfileTopBar/TopBar.jsx";
import Sidebar from "../../../../components/ProfileSideBar/Sidebar.jsx";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import CoursesList from "./components/CoursesList";

import useNotifications from "../../../../hooks/useNotificationsState.js";

import useMessages from "../../../../hooks/useMessages.js";
import useCourseFilter from "./hooks/useCourseFilter";

import { notifications } from "../../../../constants/Notifications/notifications.js";
import { messages } from "../../../../constants/Message/messages.js";
import { courses } from "./constant/courses.js";
import useSidebarState from "../../../../hooks/useSidebarState.js"; // Import custom hook

const Courses = () => {
  const [activePage, setActivePage] = useState("courses");
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications(notifications);

  const { toggleMessageNotifications } = useMessages(messages);
  const { setFilter, selectedFilter, setSelectedFilter, applyFilter } =
    useCourseFilter();
  const filteredCourses = applyFilter(courses);
  const { isExpanded, toggleSidebar } = useSidebarState();

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
          toggleMessageNotifications={toggleMessageNotifications}
          showNotifications={showNotifications}
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel totalCourses={courses.length} />
            <SearchAndFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setFilter={setFilter}
            />
            <CoursesList
              courses={filteredCourses}
              filter={selectedFilter}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
