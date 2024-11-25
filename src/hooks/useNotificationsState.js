import { useState } from "react";

const useNotificationsState = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  const toggleNotifications = () => setShowNotifications((prev) => !prev);
  const markAsRead = (id) => {
    setNotificationList((prevList) =>
      prevList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const markAllAsRead = () => {
    setNotificationList((prevList) =>
      prevList.map((notification) => ({ ...notification, read: true }))
    );
  };

  return {
    showNotifications,
    notificationList,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  };
};

export default useNotificationsState;
