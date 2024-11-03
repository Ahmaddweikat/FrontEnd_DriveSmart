import React, { useState, useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
// import Banner from "./components/Banner";
import Sidebar from "./components/Sidebar";
import ImageSlider from "./components/ImageSlider";
import ActionAreaCard from "./components/ActionAreaCard";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import TimeCard from "./components/TimeCard";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";

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

const HomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [messagesList, setMessagesList] = useState(messages);
  const [selectedChat, setSelectedChat] = useState(null);
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

  const handleFilterClick = () => {
    toggleSidebar(true);
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

  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
    setShowNotifications(false); // Ensure bell notifications are closed when messages open
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isExpanded={isExpanded} />
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col h-screen overflow-y-scroll ${
          isExpanded ? "overflow-x-hidden" : "overflow-x-auto"
        }`}
      >
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
        <ImageSlider isExpanded={isExpanded} />
        <div className="flex justify-center mt-16 mb-12">
          <div>
            <h1 className="text-5xl">
              <span className="text-customGreen">Obtaining </span>the license
            </h1>
            <h4 className="flex justify-center text-2xl mt-4">
              Department service hours
            </h4>
          </div>
        </div>
        <div className="flex items-center text-center my-4">
          <span className="outer-line flex-grow border-b border-gray-300"></span>
          <span className="mx-4">
            <AccessAlarmsIcon style={{ width: 40, height: 40 }} />
          </span>
          <span className="outer-line flex-grow border-b border-gray-300"></span>
        </div>
        <div className="container mx-auto p-4">
          <div className="flex justify-center">
            <TimeCard
              className="w-full md:w-1/2 lg:w-1/3"
              isExpanded={isExpanded}
            />
          </div>
        </div>
        <div>
          <h4 className="flex justify-center text-2xl mt-4">Driving Schools</h4>
        </div>

        <div className="flex items-center text-center my-6 relative">
          {/* Left line */}
          <span className="outer-line flex-grow border-b border-gray-300"></span>

          {/* Center icon */}
          <span className="mx-4">
            <EmojiTransportationIcon style={{ width: 40, height: 40 }} />
          </span>

          {/* Right line */}
          <span className="outer-line flex-grow border-b border-gray-300 relative">
            {/* Positioned button above the line */}
            <Button
              variant="contained"
              endIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              style={{
                backgroundColor: "rgb(249, 250, 251)",
                color: "#72b626",
                position: "absolute",
                top: "-40px", // Adjust to position above the line
                right: "20px",
              }}
            >
              Filter
            </Button>
          </span>
        </div>

        <div className="container mx-auto p-4">
          <ActionAreaCard isExpanded={isExpanded} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
