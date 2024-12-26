import React from "react";
import { Outlet } from "react-router-dom";
import useNotificationsState from "../../hooks/useNotificationsState";
import useSidebarState from "../../hooks/useSidebarState";
import Breadcrumb from "./components/Breadcrumb";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import InAppNotification from "../../components/InAppNotification";

const Layout = () => {
  const { isExpanded, toggleSidebar } = useSidebarState();
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationsState();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar isExpanded={isExpanded} />
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
        <Outlet />
        <InAppNotification />
      </div>
    </div>
  );
};

export default Layout;
