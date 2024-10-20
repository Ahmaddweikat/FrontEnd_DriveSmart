import React, { useState, useRef, useEffect } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import TestList from "./components/TestList";

const Tests = () => {
  // Notification and Test data
  const notifications = [
    { id: 1, message: "Your lesson is scheduled for tomorrow.", read: false },
    {
      id: 2,
      message: "You have a new message from your instructor.",
      read: false,
    },
    { id: 3, message: "Don't forget to submit your assignment.", read: false },
  ];

  const tests = [
    {
      title: "Final Driving Test",
      date: "October 5, 2024",
      duration: "60 mins",
      tester: "Ibrahim Qadi",
      score: 28,
    },
    {
      title: "Intermediate Test",
      date: "September 15, 2024",
      duration: "45 mins",
      tester: "Ibrahim Qadi",
      score: 26,
    },
    {
      title: "Basic Test",
      date: "August 25, 2024",
      duration: "45 mins",
      tester: "Ibrahim Qadi",
      score: 22,
    },
    {
      title: "Parking Test",
      date: "August 1, 2024",
      duration: "30 mins",
      tester: "Ibrahim Qadi",
      score: 18,
    },
  ];

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [selectedRating, setSelectedRating] = useState(0);
  const [filter, setFilter] = useState(""); // Search term
  const [selectedFilter, setSelectedFilter] = useState("all"); // Filter by status
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("test");

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

  // Function to filter tests
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title
      .toLowerCase()
      .includes(filter.toLowerCase()); // Search filtering
    const scoreCondition = selectedRating
      ? test.score >= selectedRating * 6
      : true; // Example rating filter
    let statusCondition = true; // Default to true

    // Status filter based on selectedFilter
    if (selectedFilter === "passed") {
      statusCondition = test.score > 24; // Passed tests
    } else if (selectedFilter === "failed") {
      statusCondition = test.score <= 24; // Failed tests
    }

    return matchesSearch && statusCondition; // Return true if both conditions are met
  });

  const totalTestsTaken = tests.length;
  const totalTestsPassed = tests.filter((test) => test.score > 24).length;
  const passRate =
    totalTestsTaken > 0
      ? ((totalTestsPassed / totalTestsTaken) * 100).toFixed(2)
      : 0;

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

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel
              totalTestsTaken={totalTestsTaken}
              totalTestsPassed={totalTestsPassed}
              passRate={passRate}
            />
            <SearchAndFilter
              setFilter={setFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setSelectedRating={setSelectedRating}
              setHoveredRating={setHoveredRating}
            />
            <TestList filteredTests={filteredTests} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
