// src/Profile.js
import React, { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Breadcrumb from "./components/Breadcrumb";
import ProfileInformation from "./components/ProfileInformation";
import useNotificationsMessages from "../../hooks/HomePage/TopBar/useNotifications";

const Profile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("profile");
  const {
    notificationList,
    messagesList,
    showNotifications,
    showMessageNotifications,
    toggleNotifications,
    toggleMessageNotifications,
    markAsRead,
    markAllAsRead,
    notificationRef,
  } = useNotificationsMessages();

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar
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
          showMessageNotifications={showMessageNotifications}
          notificationList={notificationList}
          messagesList={messagesList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <Breadcrumb />
        <ProfileInformation />
      </div>
    </div>
  );
};

export default Profile;
