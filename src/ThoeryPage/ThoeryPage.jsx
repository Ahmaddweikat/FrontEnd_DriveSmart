import React, { useState, useEffect, useRef } from "react";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import SideBar from "./components/Sidebar";

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

const ThoeryPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SideBar isExpanded={isExpanded} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications} // Pass showNotifications as a prop
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <Banner />
        <div className="container mx-auto p-4"></div>
        <Footer />
      </div>
    </div>
  );
};

export default ThoeryPage;
