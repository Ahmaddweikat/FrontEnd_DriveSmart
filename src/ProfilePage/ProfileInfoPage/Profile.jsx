import React, { useState, useEffect, useRef } from "react";

import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Breadcrumb from "../LessonsPage/components/Breadcrumb";
import ProfileInformation from "./components/ProfileInformation";
const notifications = [
  { id: 1, message: "Your lesson is scheduled for tomorrow.", read: false },
  {
    id: 2,
    message: "You have a new message from your instructor.",
    read: false,
  },
  { id: 3, message: "Don't forget to submit your assignment.", read: false },
  { id: 4, message: "Don't forget to submit your assignment.", read: false },
];
const Profile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("profile");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications} // Pass showNotifications as a prop
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
