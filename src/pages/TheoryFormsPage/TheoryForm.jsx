import React, { useState, useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Sidebar from "./components/Sidebar";

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

const TheoryForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [messagesList, setMessagesList] = useState(messages);
  const [selectedChat, setSelectedChat] = useState(null); // Manage the selected chat
  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);
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
  const handleChatOpen = (message) => {
    setSelectedChat(message);
  };
  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
    setShowNotifications(false); // Ensure bell notifications are closed when messages open
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isExpanded={isExpanded} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          toggleMessageNotifications={toggleMessageNotifications}
          showNotifications={showNotifications}
          showMessageNotifications={showMessageNotifications}
          notificationList={notificationList}
          messagesList={messagesList} // Ensure this line is present
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

export default TheoryForm;
