import { useState } from "react";

export const useConversations = () => {
  const [conversations, setConversations] = useState([]);

  const startNewConversation = (user) => {
    const existingConversation = conversations.find(
      (conv) => conv.userId === user.id
    );

    if (!existingConversation) {
      const newConversation = {
        id: Date.now(),
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
        status: user.status,
        messages: [],
      };
      setConversations((prev) => [...prev, newConversation]);
      return newConversation.id;
    }
    return existingConversation.id;
  };

  const addMessageToConversation = (selectedChatId, newMessage) => {
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                sender: "You",
                text: newMessage,
                date: new Date().toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                }),
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                read: true,
              },
            ],
          };
        }
        return chat;
      })
    );
  };

  const markMessagesAsRead = (chatId) => {
    setConversations((prevConversations) =>
      prevConversations.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            unreadCount: 0,
            messages: chat.messages.map((msg) => ({
              ...msg,
              read: true,
            })),
          };
        }
        return chat;
      })
    );
  };

  const getUnreadCount = (chatId) => {
    const chat = conversations.find((c) => c.id === chatId);
    return chat
      ? chat.messages.filter((msg) => !msg.read && msg.sender !== "You").length
      : 0;
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce(
      (total, chat) =>
        total +
        chat.messages.filter((msg) => !msg.read && msg.sender !== "You").length,
      0
    );
  };

  return {
    conversations,
    addMessageToConversation,
    startNewConversation,
    markMessagesAsRead,
    getUnreadCount,
    getTotalUnreadCount,
  };
};
