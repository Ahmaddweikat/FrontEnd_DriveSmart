import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { messages } from "../../../../constants/Message/messages";
import { notifications } from "../../../../constants/Notifications/notifications";
import useMessages from "../../../../hooks/useMessages";
import useNotifications from "../../../../hooks/useNotificationsState";
import useAuthStore from "../../../../store/auth.store";

function TopBar({ toggleSidebar, initialNotifications, initialMessages }) {
  const { notificationList, unreadCount, markAsRead } =
    useNotifications(notifications);
  const { messagesList, unreadMessageCount, openChat } = useMessages(messages);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Add missing state variables
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const { user, logout } = useAuthStore();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center relative h-20 z-10">
      {/* Logo and Buttons */}
      <div className="relative flex items-center w-1/2 space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 border-r-2 border-gray-300 pr-5 h-20 flex items-center"
        >
          <HorizontalSplitOutlinedIcon className="h-5 w-5" />
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-full p-2 border border-gray-300 w-5/6 focus:outline-none focus:ring-2 focus:ring-customGreen"
        />
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
            <div className="absolute right-0 mt-2 w-72 bg-white border shadow-xl rounded-lg z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">
                  Notifications
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon style={{ width: "20px", height: "20px" }} />
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notificationList.length > 0 ? (
                  notificationList.map((notification) => (
                    <li
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-3 flex items-start space-x-3 cursor-pointer hover:bg-gray-50 transition duration-200 ${
                        notification.read ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <NotificationsNoneOutlinedIcon className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="p-4 text-gray-500 text-center">
                    No notifications
                  </div>
                )}
              </ul>
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
            <div className="fixed inset-y-0 right-0 w-96 bg-white border shadow-xl rounded-lg z-50 mt-16 h-full transition-transform transform ease-in-out">
              <div className="flex justify-between p-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Messages
                </h3>
                <button onClick={() => setShowMessagePanel(false)}>
                  <CloseIcon
                    style={{ width: "20px", height: "20px", color: "#6B7280" }}
                  />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-4 py-2 border-t border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search Messages"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customGreen text-sm"
                />
              </div>

              {/* Messages List */}
              <div className="mt-3 h-full overflow-y-auto">
                {messagesList.length > 0 ? (
                  messagesList.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition duration-200"
                      onClick={() => openChat(message)}
                    >
                      <img
                        src={message.profileImage || "/default-avatar.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-800">
                          {message.name}
                        </h5>
                        <p className="text-xs text-gray-500 truncate">
                          {message.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No messages available
                  </div>
                )}
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
          >
            <Avatar
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <span className="font-medium text-gray-600">Remy Sharp</span>
            <ExpandMoreOutlinedIcon sx={{ width: 20, height: 20 }} />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <Link to={`/${user.role}/profile`}>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                  Profile
                </button>
              </Link>
              <Link to={`/${user.role}/settings`}>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                  Settings
                </button>
              </Link>
              <button
                onClick={() => logout()}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
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
