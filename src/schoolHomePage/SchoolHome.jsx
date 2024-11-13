import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageSlider from "./components/ImageSlider";
import TopBar from "../schoolHomePage/components/TopBar";
import FlipSection from "./components/FlipSection";

const SchoolHome = () => {
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

  const messages = [
    {
      id: 1,
      name: "Yasni Abdulrahman",
      message: "Lecture in Hall 111080...",
      timestamp: "7/09/24 10:30 AM",
      type: "Private",
      profileImage: "/path-to-image-1",
      read: false,
    },
    {
      id: 2,
      name: "Ahmed Saifuddin",
      message: "Engineering exam details...",
      timestamp: "31/03/24 2:15 PM",
      type: "Private",
      profileImage: "/path-to-image-2",
      read: true,
    },
    // Add more messages if needed
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [messagesList, setMessagesList] = useState(messages);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleFilterClick = () => {
    const toggleSidebar = () => {
      setIsExpanded((prev) => !prev);
    };
    toggleSidebar(true);
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
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
  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
    setShowNotifications(false); // Ensure bell notifications are closed when messages open
  };
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const showThreshold = 655; // Adjust threshold to 650px
    const showTopThreshold = 300;

    setShowBackToTop(scrollY > showThreshold);
    setShowTopBar(scrollY > showTopThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="grid grid-rows-3">
      <div
        className={`fixed top-0 left-0 w-full transition-transform transform z-50 ${
          showTopBar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        {showTopBar && (
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
        )}
      </div>
      <div>
        <ImageSlider />
      </div>
      <div>
        <FlipSection />
      </div>
    </div>
  );
};

export default SchoolHome;
