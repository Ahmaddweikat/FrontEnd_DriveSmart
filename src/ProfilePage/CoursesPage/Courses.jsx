import React, { useState, useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import CoursesList from "./components/CoursesList";
import AppRoutes from "./AppRoutes"; // Import your routing component

const Courses = () => {
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

  const courses = [
    {
      title: "Final Driving Test",
      description: "Comprehensive driving test to assess your skills.",
      price: "50$",
      typeofvichle: "Bus",
      difficult: 1,
    },
    {
      title: "Intermediate Driving Test",
      description: "Test for intermediate drivers focusing on maneuvering.",
      price: "40$",
      typeofvichle: "Car",
      difficult: 2,
    },
    {
      title: "Basic Driving Test",
      description: "Basic skills assessment for new drivers.",
      price: "30$",
      typeofvichle: "Car",
      difficult: 1,
    },
    {
      title: "Parking Test",
      description: "Assessment of parking skills and techniques.",
      price: "25$",
      typeofvichle: "Car",
      difficult: 2,
    },
    {
      title: "Advanced Driving Test",
      description: "Advanced assessment for experienced drivers.",
      price: "60$",
      typeofvichle: "Car",
      difficult: 3,
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("courses");
  const [filter, setFilter] = useState(""); // For search input
  const [selectedRating, setSelectedRating] = useState(0); // Rating state
  const [selectedFilter, setSelectedFilter] = useState("all"); // Filter by difficulty
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications}
          notificationList={notificationList} // Ensure this is passed
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel totalCourses={courses.length} />
            <SearchAndFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setFilter={setFilter}
              setSelectedRating={setSelectedRating}
            />

            <CoursesList
              courses={courses}
              filter={filter}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
