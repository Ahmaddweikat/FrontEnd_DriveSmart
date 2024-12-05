import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { notifications as initialNotifications } from "../../../../constants/Notifications/notifications";
import useAuthStore from "../../../../store/auth.store";
import ChatApp from "../../../ChatApp/ChatApp";
import {useChat} from "../../../ChatApp/hooks/useChat";

function TopBar({ toggleSidebar }) {
  
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(
    initialNotifications.filter(n => !n.read).length
  );
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [SelectedChatId, setSelectedChatId] = useState(null);
  const { getTotalUnreadCount } = useChat();

  useEffect(() => {
    if (!showChatPanel) {
      setUnreadMessageCount(getTotalUnreadCount());
    }
  }, [showChatPanel, getTotalUnreadCount]);

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
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-100 text-blue-600';
      case 'review':
        return 'bg-yellow-100 text-yellow-600';
      case 'student':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
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
            <div className="absolute right-0 mt-2 w-80 bg-white border shadow-2xl rounded-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    You have {unreadCount} unread notifications
                  </p>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <CloseIcon style={{ width: "20px", height: "20px" }} />
                </button>
              </div>
              
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                <span className="text-sm text-gray-500">
                  {notifications.filter(n => !n.read).length} new
                </span>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 flex items-start space-x-3 cursor-pointer transition-all duration-200 
                          ${notification.read 
                            ? 'bg-white hover:bg-gray-50' 
                            : 'bg-blue-50 hover:bg-blue-100'
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                          ${notification.read 
                            ? 'bg-gray-100 text-gray-600' 
                            : getNotificationStyle(notification.type)
                          }`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {notification.time}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"/>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <NotificationsNoneOutlinedIcon className="text-gray-400" style={{ width: "24px", height: "24px" }} />
                    </div>
                    <p className="text-gray-500">No notifications yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Message Button */}
        <button
          onClick={() => {
            setShowChatPanel((prev) => !prev);
            setSelectedChatId(null);
          }}
          className="text-gray-500 hover:text-gray-700 h-16 pr-4 pl-4"
        >
          <Badge
            badgeContent={unreadMessageCount}
            classes={{ badge: "bg-red-500 text-white" }}
            overlap="circular"
          >
            <MessageOutlinedIcon
              style={{ width: "25px", height: "25px", marginTop: "4px" }}
            />
          </Badge>
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
                <ChatApp 
                  isTopBarChat={true} 
                  onUnreadCountChange={setUnreadMessageCount}
                />
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
