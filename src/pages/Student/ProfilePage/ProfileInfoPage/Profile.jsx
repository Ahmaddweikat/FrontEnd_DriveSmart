import React, { useState } from "react";
import TopBar from "../../components/ProfileTopBar/TopBar";
import SideBar from "../../components/ProfileSideBar/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfileInformation from "./components/ProfileInformation";
import useNotificationsMessages from "../../hooks/HomePage/TopBar/useNotifications";
import useSidebarState from "../../hooks/useSidebarState"; // Import custom hook

const Profile = () => {
  const [activePage, setActivePage] = useState("profile");
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationsMessages();
  const { isExpanded, toggleSidebar } = useSidebarState();

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
          showNotifications={showNotifications}
          notificationList={notificationList}
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
