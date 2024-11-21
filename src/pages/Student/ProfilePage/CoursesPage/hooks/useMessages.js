import { useState } from "react";

export const useMessages = (initialMessages) => {
  const [messagesList, setMessagesList] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);

  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
  };

  const openChat = (message) => {
    setSelectedChat(message);
  };

  return {
    messagesList,
    selectedChat,
    showMessageNotifications,
    toggleMessageNotifications,
    openChat,
  };
};
