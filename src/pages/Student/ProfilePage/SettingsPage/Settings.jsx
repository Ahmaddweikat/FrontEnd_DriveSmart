import React from "react";
import TopBar from "../../components/ProfileTopBar/TopBar";
import SideBar from "../../components/ProfileSideBar/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfileEditForm from "./components/ProfileEditForm";
import useNotifications from "../../hooks/useNotificationsState";
import useProfilePicture from "./hooks/useProfilePicture";
import useSidebar from "../../hooks/useSidebarState";
import { notifications } from "../../HomePage/components/constants/Notifications/notifications";
import { messages } from "../../HomePage/components/constants/Message/messages";

const Settings = () => {
  // Using the custom hooks
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
    notificationRef,
  } = useNotifications(notifications);
  const { profilePicture, selectedImage, handleImageChange, handleSave } =
    useProfilePicture();
  const { isExpanded, activePage, toggleSidebar, setActivePage } = useSidebar();

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
          notificationRef={notificationRef}
        />
        <Breadcrumb />
        <ProfileEditForm
          profilePicture={profilePicture}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Settings;
