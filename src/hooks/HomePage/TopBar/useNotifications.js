import { useState } from "react";

const useNotifications = (initialNotifications) => {
  const [notificationList, setNotificationList] = useState(
    initialNotifications || []
  ); // Ensure it defaults to an empty array

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return { notificationList, unreadCount, markAsRead, markAllAsRead };
};

export default useNotifications;
