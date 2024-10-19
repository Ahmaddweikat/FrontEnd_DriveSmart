import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
function TopBar({
  toggleSidebar,
  toggleNotifications,
  showNotifications,
  notificationList,
  markAsRead,
  markAllAsRead,
}) {
  const unreadCount = notificationList.filter((n) => !n.read).length; // Calculate unread notifications count

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center relative h-16 ">
      {/* Left Section: Expand Button and Search Input */}
      <div className="relative flex items-center w-1/2 ">
        {/* Expand Button */}
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 hover:text-gray-800 border-r-2 border-gray-300 pr-5 h-16 flex items-center"
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </button>
        {/* <input
          type="text"
          placeholder="Type in to Search..."
          className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-600 placeholder-gray-400 focus:outline-none"
        /> */}
        {/* Search Icon */}
        {/* <div className="absolute left-12">
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
        </div> */}
      </div>

      {/* Notification Icon */}
      {/* Right Section: Notification Icon */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="text-gray-500 hover:text-gray-700 border-x-2 h-16 pr-4 pl-4"
          >
            <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
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
                      onClick={() => markAsRead(notification.id)} // Mark as read on click
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
        {/* Profile Picture */}
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
