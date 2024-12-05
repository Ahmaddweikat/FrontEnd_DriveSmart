import { useState } from "react";
import initialConversations from "../constants/initialConversations";

export const useConversations = () => {
  const [conversations, setConversations] = useState(initialConversations);

  const addMessageToConversation = (selectedChatId, newMessage) => {
    const updatedConversations = conversations.map((chat) => {
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
    });
    setConversations(updatedConversations);
  };
  const markMessagesAsRead = (chatId) => {
    setConversations(prevConversations =>
      prevConversations.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            unreadCount: 0,
            messages: chat.messages.map(msg => ({
              ...msg,
              read: true
            }))
          };
        }
        return chat;
      })
    );
  };
  const getUnreadCount = (chatId) => {
    const chat = conversations.find(c => c.id === chatId);
    return chat ? chat.messages.filter(msg => !msg.read && msg.sender !== "You").length : 0;
  };
  const getTotalUnreadCount = () => {
    return conversations.reduce((total, chat) => 
      total + chat.messages.filter(msg => !msg.read && msg.sender !== "You").length, 0
    );
  };

  return {
    conversations,
    addMessageToConversation,
    markMessagesAsRead,
    getUnreadCount,
    getTotalUnreadCount,
  };
};  
