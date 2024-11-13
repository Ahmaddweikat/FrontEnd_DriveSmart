import React, { useState, useEffect, useRef, useCallback } from "react";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
// import Banner from "./components/Banner";
// import Sidebar from "./components/Sidebar";
import ImageSlider from "./components/ImageSlider";
import ActionAreaCard from "./components/ActionAreaCard";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import TimeCard from "./components/FlipCard";
import Button from "@mui/material/Button";
import NorthIcon from "@mui/icons-material/North";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlipSection from "./components/FlipSection";
const HomePage = () => {
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
    <div className="grid grid-row-5 bg-custombg">
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
        <TimeCard className="w-full md:w-1/2 lg:w-1/3" />
      </div>
      <div>
        <div className="flex justify-center mt-16 mb-12">
          <div>
            <h4 className="flex justify-center text-2xl mt-4">
              License Sections
            </h4>
          </div>
        </div>
        <div className="flex items-center text-center my-8 relative">
          {/* Left line */}
          <span className="outer-line flex-grow border-b border-gray-300"></span>

          {/* Center icon */}
          <span className="mx-4">
            <TrafficOutlinedIcon style={{ width: 40, height: 40 }} />
          </span>

          {/* Right line */}
          <span className="outer-line flex-grow border-b border-gray-300 relative">
            {/* Positioned button above the line */}
          </span>
        </div>
        <FlipSection className="w-full md:w-1/2 lg:w-1/3" />
      </div>
      <div>
        <div>
          <h4 className="flex justify-center text-2xl mt-8">Driving Schools</h4>
        </div>
        <div className="flex items-center text-center my-8 relative">
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
              variant="outlined"
              endIcon={<MoreHorizIcon />}
              style={{
                color: "#72b626",
                position: "absolute",
                top: "-40px",
                right: "20px",
              }}
            >
              See all
            </Button>
          </span>
        </div>
        <ActionAreaCard />
      </div>

      <div>
        <div>
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-5 right-5 bg-customGreen text-white p-2 rounded-full shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Back to top"
            >
              <NorthIcon />
            </button>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
