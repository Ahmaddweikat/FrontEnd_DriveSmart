import React, { useState, useEffect, useRef } from "react";
import QuizApp from "./components/QuizApp";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import CategoryGrid from "../TheoryFormsPage/components/CategoryGrid";

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

const QuestionsForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);

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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SideBar isExpanded={isExpanded} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications}
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        {/* Banner */}
        <section
          className="relative min-h-[35vh] bg-cover bg-center"
          // style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            {/* Add any title or content here if needed */}
          </div>
        </section>
        <QuizApp />
        {/* CategoryGrid Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 pb-12">
          <CategoryGrid />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsForm;
