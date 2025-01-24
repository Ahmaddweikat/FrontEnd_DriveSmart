import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import { format } from "date-fns";
import { useNotifications } from "../../../hooks/useNotifications";

const NotificationsPanel = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, isLoading, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case "booking":
        return "bg-blue-100 text-blue-600";
      case "review":
        return "bg-yellow-100 text-yellow-600";
      case "student":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
  };

  return (
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
            <span className="text-sm text-gray-500">{unreadCount} new</span>
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
                      ${
                        notification.isRead
                          ? "bg-white hover:bg-gray-50"
                          : "bg-blue-50 hover:bg-blue-100"
                      }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        notification.isRead
                          ? "bg-gray-100 text-gray-600"
                          : getNotificationStyle(notification.type)
                      }`}
                    >
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p
                        className={`text-sm ${
                          notification.isRead
                            ? "text-gray-600"
                            : "text-gray-900"
                        }`}
                      >
                        {notification.body}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <NotificationsNoneOutlinedIcon
                    className="text-gray-400"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
