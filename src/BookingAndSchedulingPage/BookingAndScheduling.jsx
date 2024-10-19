import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faBook,
  faHome,
  faQuestionCircle,
  faEnvelope,
  faChevronDown,
  faBookOpen,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import { getMonth } from "../util";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "../components/EventModal";

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
const BookingAndScheduling = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
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
      {/* Sidebar */}
      <aside
        className={`transition-width duration-300 ${
          isExpanded ? "w-80" : "w-20"
        } bg-white text-green-500 flex flex-col items-center py-6 shadow-md border-r-2`}
      >
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-4 w-full"></nav>
      </aside>

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
        <div className="container mx-auto p-4">
          {/* Student Calendar Section */}
          <div className="mt-2">
            <React.Fragment>
              {showEventModal && <EventModal />}

              <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                  <Sidebar />
                  <Month month={currenMonth} />
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

function TopBar({
  toggleSidebar,
  toggleNotifications,
  showNotifications,
  notificationList,
  markAsRead,
  markAllAsRead,
}) {
  const [showTheoryQuestions, setShowTheoryQuestions] = useState(false);
  const [showTheoryLearning, setShowTheoryLearning] = useState(false);
  const [showInquiryAbout, setShowInquiryAbout] = useState(false); // State for Inquiry About list

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const theoryQuestionsList = [
    "Motorcycle Theory Questions",
    "Car Theory Questions",
    "Tractor Theory Questions",
    "Light Charge Theory Questions",
    "Heavy Charge Theory Questions",
    "Taxi Charge Theory Questions",
  ];
  const theoryLearningList = [
    "Steps to study theory",
    "Traffic signals study",
    "Study of traffic signals on the street",
    "Study of the theory book",
  ];
  const inquiryAboutList = [
    "Theory exam results",
    "Practical exam results",
    "License Requirements",
  ];

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center relative h-16">
      <div className="relative flex items-center w-1/2">
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 hover:text-gray-800 border-r-2 border-gray-300 pr-5 h-16 flex items-center"
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </button>
        <button className="text-gray-600 hover:text-green-600 flex items-center mr-6 font-medium text-sm">
          <FontAwesomeIcon icon={faHome} className="h-3 w-3 mr-2" />
          Home
        </button>

        <div
          className="relative"
          onMouseEnter={() => setShowTheoryQuestions(true)}
          onMouseLeave={() => setShowTheoryQuestions(false)}
        >
          <button
            className={`text-gray-600 flex items-center mr-6 font-medium text-sm ${
              showTheoryQuestions ? "text-green-500" : "hover:text-green-600"
            }`}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="h-3 w-3 mr-2" />
            Theory Questions
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-1" />
          </button>
          {showTheoryQuestions && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-sm">
              {theoryQuestionsList.map((question) => (
                <button
                  key={question}
                  className="w-full text-left py-2 px-4 hover:bg-gray-200"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theory Learning Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowTheoryLearning(true)}
          onMouseLeave={() => setShowTheoryLearning(false)}
        >
          <button
            className={`text-gray-600 flex items-center mr-6 font-medium text-sm ${
              showTheoryLearning ? "text-green-500" : "hover:text-green-600"
            }`}
          >
            <FontAwesomeIcon icon={faBook} className="h-3 w-3 mr-2" />
            Theory Learning
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-1" />
          </button>
          {showTheoryLearning && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-sm">
              {theoryLearningList.map((learning) => (
                <button
                  key={learning}
                  className="w-full text-left py-2 px-4 hover:bg-gray-200"
                >
                  {learning}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Inquiry About Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowInquiryAbout(true)}
          onMouseLeave={() => setShowInquiryAbout(false)}
        >
          <button
            className={`text-gray-600 flex items-center mr-6 font-medium text-sm ${
              showInquiryAbout ? "text-green-500" : "hover:text-green-600"
            }`}
          >
            <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3 mr-2" />
            Inquiry About
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-1" />
          </button>
          {showInquiryAbout && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-sm">
              {inquiryAboutList.map((inquiry) => (
                <button
                  key={inquiry}
                  className="w-full text-left py-2 px-4 hover:bg-gray-200"
                >
                  {inquiry}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="text-gray-600 hover:text-green-600 flex items-center font-medium text-sm">
          <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 mr-2" />
          Contact Us
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="text-gray-500 hover:text-gray-700 border-x-2 h-16 pr-4 pl-4"
          >
            <FontAwesomeIcon icon={faMessage} className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-16 right-0 bg-white border rounded shadow-lg z-50 w-64">
              <div className="p-4">
                <h4 className="font-semibold flex justify-between items-center">
                  Notifications
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Mark All as Read
                  </button>
                </h4>
                {notificationList.length > 0 ? (
                  notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`py-2 border-b last:border-b-0 ${
                        notification.read ? "text-gray-500" : "font-semibold"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <div>No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="text-gray-500 hover:text-gray-700 border-x-2 h-16 pr-4 pl-4"
          >
            <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-16 right-0 bg-white border rounded shadow-lg z-50 w-64">
              <div className="p-4">
                <h4 className="font-semibold flex justify-between items-center">
                  Notifications
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Mark All as Read
                  </button>
                </h4>
                {notificationList.length > 0 ? (
                  notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`py-2 border-b last:border-b-0 ${
                        notification.read ? "text-gray-500" : "font-semibold"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <div>No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>
        <img
          src="/path/to/profile-picture.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover z-10"
        />
        <span className="text-gray-700 font-medium">Ahmad Dweikat</span>
      </div>
    </div>
  );
}

// function SidebarButton({}) {
//   return <div>asd</div>;
// }

// function Breadcrumb() {
//   return (
//     <nav className="flex p-4 text-gray-600 bg-gray-100">
//       <ol className="flex items-center space-x-2">
//         <li>
//           <p className="hover:text-gray-800">My Profile</p>
//         </li>
//         <li>
//           <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 mx-2" />
//         </li>
//         <li>
//           <p className="hover:text-gray-800 font-medium text-gray-700">
//             Profile
//           </p>
//         </li>
//       </ol>
//     </nav>
//   );
// }

// function InfoField({ label, value }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <p className="mt-1 text-base text-gray-900">{value}</p>
//     </div>
//   );
// }

export default BookingAndScheduling;
