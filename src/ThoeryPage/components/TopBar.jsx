import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faBook,
  faHome,
  faQuestionCircle,
  faChevronDown,
  faEnvelope,
  faBookOpen,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
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
  const [showInquiryAbout, setShowInquiryAbout] = useState(false);

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
          className="text-gray-600 hover:text-gray-800 border-r-2 border-gray-300 pr-5 h-16 flex items-center"
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </button>

        <button className="text-gray-600 hover:text-customGreen flex items-center font-medium text-base mx-4">
          <FontAwesomeIcon icon={faHome} className="h-4 w-4 mr-2" />
          Home
        </button>

        {/* Theory Questions Dropdown */}
        <div
          className="relative mx-2"
          onMouseEnter={() => setShowTheoryQuestions(true)}
          onMouseLeave={() => setShowTheoryQuestions(false)}
        >
          <button
            className={`text-gray-600 flex items-center mr-2 font-medium text-base ${
              showTheoryQuestions
                ? "text-customGreen"
                : "hover:text-customGreen"
            }`}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="h-4 w-4 mr-2" />
            Theory Questions
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-2" />
          </button>
          {showTheoryQuestions && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-base">
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
          className="relative mx-2"
          onMouseEnter={() => setShowTheoryLearning(true)}
          onMouseLeave={() => setShowTheoryLearning(false)}
        >
          <button
            className={`text-gray-600 flex items-center font-medium text-base mr-2 ${
              showTheoryLearning ? "text-customGreen" : "hover:text-customGreen"
            }`}
          >
            <FontAwesomeIcon icon={faBook} className="h-4 w-4 mr-2" />
            Theory Learning
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-2" />
          </button>
          {showTheoryLearning && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-base">
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
          className="relative mx-2"
          onMouseEnter={() => setShowInquiryAbout(true)}
          onMouseLeave={() => setShowInquiryAbout(false)}
        >
          <button
            className={`text-gray-600 flex items-center font-medium text-base ${
              showInquiryAbout ? "text-customGreen" : "hover:text-customGreen"
            }`}
          >
            <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 mr-2" />
            Inquiry About
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-2" />
          </button>
          {showInquiryAbout && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-base">
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

export default TopBar;
