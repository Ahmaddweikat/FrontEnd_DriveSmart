import { useState } from "react";

const useMessages = () => {
  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);

  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
  };

  return {
    showMessageNotifications,
    toggleMessageNotifications,
  };
};

export default useMessages;
