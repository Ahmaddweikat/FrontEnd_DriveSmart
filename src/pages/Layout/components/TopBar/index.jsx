import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { notifications } from "../../../../constants/Notifications/notifications";
import useNotifications from "../../../../hooks/useNotificationsState";
import useAuthStore from "../../../../store/auth.store";
import ChatApp from "../../../ChatApp/ChatApp";

function TopBar({ toggleSidebar, initialNotifications, initialMessages }) {
  const { notificationList, unreadCount, markAsRead } =
    useNotifications(notifications);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [SelectedChatId, setSelectedChatId] = useState(null);

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

        {/* Message Button */}
        <button
          onClick={() => {
            setShowChatPanel((prev) => !prev);
            setSelectedChatId(null); // Reset selected chat when opening panel
          }}
          className="text-gray-500 hover:text-gray-700 h-16 pr-4 pl-4"
        >
          <MessageOutlinedIcon
            style={{ width: "25px", height: "25px", marginTop: "4px" }}
          />
        </button>
        {/* Chat Panel */}
        {showChatPanel && (
          <div className="fixed top-20 right-0 w-96 bg-white shadow-xl z-50 h-[calc(100vh-5rem)]">
            <div className="flex flex-col h-full">
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Messages</h3>
                  <button
                    onClick={() => setShowChatPanel(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <CloseIcon style={{ width: "20px", height: "20px" }} />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden">
                <ChatApp isTopBarChat={true} />
              </div>

              {/* Footer with See All Button */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <Link to="/student/messages">
                  <button
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                    onClick={() => setShowChatPanel(false)}
                  >
                    See All Messages
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
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
