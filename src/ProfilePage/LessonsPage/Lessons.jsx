import React, { useState, useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import LessonsList from "./components/LessonsList";

const Lessons = () => {
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

  const lessons = [
    {
      title: "Lesson Title",
      date: "October 5, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Completed",
      rating: 5,
    },
    {
      title: "Basic Vehicle Control",
      date: "October 5, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Showed improvement in steering control. Needs to work on smooth braking.",
      rating: 5,
    },
    {
      title: "Lesson Title",
      date: "October 5, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Completed",
      rating: 3,
    },
    {
      title: "Lesson Title",
      date: "October 15, 2024",
      duration: "45 mins",
      instructor: "Ibrahim Qadi",
      note: "Completed",
      rating: 2,
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("lessons");
  const [filter, setFilter] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [showNotifications, setShowNotifications] = useState(false);

  const getFilteredLessons = () => {
    return lessons.filter((lesson) => {
      const matchesRating = selectedRating
        ? lesson.rating === selectedRating
        : true;
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(filter.toLowerCase());
      return matchesRating && matchesSearch;
    });
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
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Define a list of lessons with ratings

  // Function to render star rating

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
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <Breadcrumb />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel lessons={lessons} />
            <SearchAndFilter
              setFilter={setFilter}
              setHoveredRating={setHoveredRating}
              handleFilterSelect={(rating) => {
                setSelectedRating(rating); // Set the selected rating directly
              }}
              hoveredRating={hoveredRating}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
            <LessonsList
              lessons={getFilteredLessons()} // Use filtered lessons here
              selectedRating={selectedRating}
              setFilter={setFilter}
              setSelectedRating={setSelectedRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lessons;
