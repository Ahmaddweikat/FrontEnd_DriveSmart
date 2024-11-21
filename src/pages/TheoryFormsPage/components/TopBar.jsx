import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faHome,
  faQuestionCircle,
  faChevronDown,
  faBookOpen,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatView from "./ChatView";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CloseIcon from "@mui/icons-material/Close";

function TopBar({
  toggleSidebar,
  toggleNotifications,
  showNotifications,
  markAsRead,
  markAllAsRead,
  toggleMessageNotifications,
  showMessageNotifications,
  notificationList,
  messagesList,
  initialMessages,
}) {
  const [showTheoryQuestions, setShowTheoryQuestions] = useState(false);
  const [showTheoryLearning, setShowTheoryLearning] = useState(false);
  const [showInquiryAbout, setShowInquiryAbout] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [showMessagePanel, setShowMessagePanel] = useState(false); // Manage panel visibility
  const [selectedChat, setSelectedChat] = useState(null); // Manage the selected chat
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Dropdown state
  const [showHeader, setShowHeader] = useState(true); // New state for header visibility
  const [showSearch, setShowSearch] = useState(true); // New state for header visibility

  const unreadCount = notificationList.filter((n) => !n.read).length;
  const unreadNotificationCount = notificationList.filter(
    (n) => !n.read
  ).length;
  const unreadMessageCount = messagesList.filter((m) => !m.read).length;

  const handleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const handleChatOpen = (message) => {
    setSelectedChat(message); // Ensure message is unique per chat
    setShowHeader(false);
    setShowSearch(false);
  };

  const handleChatClose = () => {
    setSelectedChat(null); // Close the chat view and show the message panel
    setShowMessagePanel(true);
    setShowHeader(true); // Show the header again when closing the chat
    setShowSearch(true);
  };

  const filteredMessages = messagesList.filter((message) =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <NotificationsNoneOutlinedIcon
              style={{ width: "30px", height: "30px" }}
            />
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
                    onClick={() => markAllAsRead("notification")}
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
                      onClick={() =>
                        markAsRead(notification.id, "notification")
                      }
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

        {/* Message Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMessagePanel((prev) => !prev); // Toggle message panel visibility
              toggleMessageNotifications(); // Call the existing function as well
            }}
            className="text-gray-500 hover:text-gray-700 border-x-2 h-16 pr-4 pl-4"
          >
            <MessageOutlinedIcon
              style={{ width: "25px", height: "25px", marginTop: "4px" }}
            />
            {unreadMessageCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadMessageCount}
              </span>
            )}
          </button>

          {/* Message Panel */}
          {showMessagePanel && (
            <div
              className={`fixed inset-y-0 right-0 w-96 bg-white border shadow-lg z-50 mt-16 h-full `}
            >
              <div className="flex justify-end mr-2">
                <button
                  onClick={() => {
                    setShowMessagePanel((prev) => !prev); // Toggle message panel visibility
                  }}
                >
                  <CloseIcon
                    style={{ width: "20px", height: "20px", marginTop: "4px" }}
                  />
                </button>
              </div>
              {showSearch && (
                <div className="flex justify-center">
                  {/* Search Bar */}
                  <input
                    type="text"
                    placeholder="Search Messages"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border rounded p-2 w-80 mb-4"
                  />
                </div>
              )}

              {/* {showHeader && ( // Conditionally render the header
                <div className="flex justify-between items-center p-4 border-b">
                  <h4 className="font-semibold">Messages</h4>
                  <button className="text-sm text-blue-500 hover:underline">
                    See all
                  </button>
                </div>
              )} */}

              <div className="mt-3 h-full overflow-hidden flex flex-col">
                {selectedChat ? (
                  <ChatView
                    messagesList={messagesList.filter(
                      (msg) => msg.id === selectedChat.id
                    )}
                    onClose={handleChatClose}
                    initialMessages={messagesList}
                  />
                ) : (
                  <div className="overflow-y-auto flex-1">
                    {filteredMessages.length > 0 ? ( // Check against filtered messages
                      filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-center justify-between p-2 border-b last:border-b-0 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleChatOpen(message)} // Open chat on click
                        >
                          <img
                            src={message.profileImage || "/default-avatar.png"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold">{message.name}</h5>
                            <p className="text-gray-500 text-sm truncate">
                              {message.message}
                            </p>
                          </div>
                          <span className="text-gray-400 text-xs">
                            {message.timestamp}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-4 text-gray-500">
                        No messages available.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4">
                <button className="text-blue-500 hover:underline">
                  See All
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={handleProfileDropdown}
              className="flex items-center space-x-2"
            >
              <img
                src="/path/to/profile-picture.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 font-medium">Ahmad Dweikat</span>
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-600" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-4 w-48 bg-white border rounded shadow-lg z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                    <span>Profile</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                    <span>Settings</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-gray-600"
                    />
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
