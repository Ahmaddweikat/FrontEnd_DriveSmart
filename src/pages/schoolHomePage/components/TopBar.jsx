import { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import ChatView from "./ChatView";

import logo from "../../../assets/HomePage/ImageSlider/Images/alqudsLogo.png";
import useDropdown from "./../../../hooks/useDropdown";
import useMessages from "./../../Student/HomePage/hooks/ChatView/useMessages";
import useNotificationsState from "./../../../hooks/useNotificationsState";
import { notifications } from "./../../../constants/Notifications/notifications";
import { messages } from "./../../../constants/Message/messages";

function TopBar({ toggleSidebar, initialNotifications, initialMessages }) {
  const { notificationList, unreadCount, markAsRead, markAllAsRead } =
    useNotificationsState(notifications);

  const {
    messagesList,
    selectedChat,
    showMessagePanel,
    setShowMessagePanel,
    searchQuery,
    setSearchQuery,
    filteredMessages = [],
    openChat,
    closeChat,
  } = useMessages(messages);

  const { dropdownState, toggleDropdown, closeDropdowns } = useDropdown();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  // Count unread messages
  const unreadMessageCount = (filteredMessages || []).filter(
    (msg) => !msg.read
  ).length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Profile Dropdown Toggle
  const handleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // Define the handleKeyDown function
  const handleKeyDown = (event, dropdown) => {
    if (event.key === "Escape") {
      if (dropdown === "profile") {
        setShowProfileDropdown(false);
      }
      // You can add more dropdown handling logic here if needed
    }
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center relative h-20 z-10">
      {/* Logo and Buttons */}
      <div className="relative flex items-center ">
        <div className=" mr-8 ml-2">
          <img src={logo} alt="Logo" className="h-24 w-24" />
        </div>

        <button className="text-gray-600 hover:text-customGreen flex items-center font-medium text-base mx-4">
          <HomeIcon className="h-4 w-4 mr-2" />
          Home
        </button>

        {/* Theory Questions Dropdown */}
        <div
          className="relative mx-2"
          onMouseEnter={() => toggleDropdown("theoryQuestions")}
          onMouseLeave={closeDropdowns}
        >
          <button
            className={`text-gray-600 flex items-center mr-2 font-medium text-base ${
              dropdownState.theoryQuestions
                ? "text-customGreen"
                : "hover:text-customGreen"
            }`}
          >
            <HelpCenterIcon className="h-4 w-4 mr-2" />
            Theory Questions
            <ExpandMoreOutlinedIcon
              sx={{ width: 20, height: 20, marginLeft: "2px" }}
            />{" "}
          </button>
          {dropdownState.theoryQuestions && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-base">
              {/* Theory questions options here */}
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Motorcycle Theory Questions
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Car Theory Questions
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Light Charge Theory Questions
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Heavy Charge Theory Questions
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Taxi Charge Theory Questions
              </button>
            </div>
          )}
        </div>
        {/* Theory Learning Dropdown */}
        <div
          className="relative mx-2"
          onMouseEnter={() => toggleDropdown("theoryLearning")}
          onMouseLeave={closeDropdowns}
        >
          <button
            className={`text-gray-600 flex items-center mr-2 font-medium text-base ${
              dropdownState.theoryLearning
                ? "text-customGreen"
                : "hover:text-customGreen"
            }`}
          >
            <AutoStoriesIcon className="h-4 w-4 mr-2" />
            Theory Learning
            <ExpandMoreOutlinedIcon
              sx={{ width: 20, height: 20, marginLeft: "4px" }}
            />{" "}
          </button>
          {dropdownState.theoryLearning && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-base">
              {/* Theory questions options here */}
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Steps to study theory
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Traffic signals study
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Study of traffic signals on the street
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Study of the theory book
              </button>
            </div>
          )}
        </div>

        {/* Inquiry About Dropdown */}
        <div
          className="relative mx-2"
          onMouseEnter={() => toggleDropdown("inquiryAbout")}
          onMouseLeave={closeDropdowns}
        >
          <button
            className={`text-gray-600 flex items-center mr-2 font-medium text-base ${
              dropdownState.inquiryAbout
                ? "text-customGreen"
                : "hover:text-customGreen"
            }`}
          >
            <InfoIcon className="h-4 w-4 mr-2" />
            Inquiry About
            <ExpandMoreOutlinedIcon
              sx={{ width: 20, height: 20, marginLeft: "4px" }}
            />
          </button>
          {dropdownState.inquiryAbout && (
            <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-base">
              {/* Theory questions options here */}
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Theory exam results
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                Practical exam results
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200">
                License Requirements
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications and Messages */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="text-gray-500 hover:text-gray-700 h-16 pr-2 pl-2 relative"
          >
            <Badge
              badgeContent={unreadCount}
              classes={{ badge: "bg-red-500 text-white" }}
              overlap="circular"
            >
              <NotificationsNoneOutlinedIcon
                style={{ width: "30px", height: "30px" }}
              />
            </Badge>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-md">
              <ul className="max-h-60 overflow-y-auto">
                {notificationList.map((notification) => (
                  <li
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)} // Mark as read on click
                    className={`p-2 cursor-pointer ${
                      notification.read ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
              {notificationList.length === 0 && (
                <div className="p-2 text-gray-500">No notifications</div>
              )}
            </div>
          )}
        </div>

        {/* Message Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowMessagePanel((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 h-16 pr-4 pl-4"
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
            <div className="fixed inset-y-0 right-0 w-96 bg-white border shadow-lg z-50 mt-16 h-full">
              <div className="flex justify-end mr-2">
                <button onClick={() => setShowMessagePanel(false)}>
                  <CloseIcon
                    style={{ width: "20px", height: "20px", marginTop: "4px" }}
                  />
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Search Messages"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="border rounded p-2 w-80 mb-4"
                />
              </div>

              <div className="mt-3 h-full overflow-hidden flex flex-col">
                {selectedChat ? (
                  <ChatView
                    message={selectedChat} // Pass the selected chat message to ChatView
                    onClose={() => openChat(null)} // Function to close the chat view
                  />
                ) : (
                  <div className="overflow-y-auto flex-1">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-center justify-between p-2 border-b last:border-b-0 hover:bg-gray-200 cursor-pointer"
                          onClick={() => openChat(message)} // Open chat on click
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
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfileDropdown}
            className="flex items-center space-x-2"
            aria-expanded={showProfileDropdown}
            onKeyDown={(e) => handleKeyDown(e, "profile")}
          >
            {/* Avatar placed here before the name */}
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <span className="font-medium text-gray-600">Remy Sharp</span>
            <ExpandMoreOutlinedIcon sx={{ width: 20, height: 20 }} />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                <AccountCircleOutlinedIcon className="mr-2" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                <SettingsOutlinedIcon className="mr-2" />
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                <LogoutOutlinedIcon className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
