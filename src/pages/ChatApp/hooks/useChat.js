import { useState, useRef, useEffect } from "react";
import { useConversations } from "./useConversations";

export const useChat = ({ onUnreadCountChange } = {}) => {
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { 
    conversations, 
    addMessageToConversation, 
    markMessagesAsRead, 
    getUnreadCount,
    getTotalUnreadCount 
  } = useConversations();
  const chatWindowRef = useRef(null);

  const currentChat = conversations.find((chat) => chat.id === selectedChatId);

  const filteredConversations = conversations.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  useEffect(() => {
    if (selectedChatId) {
      markMessagesAsRead(selectedChatId);
      // Force an update of the total unread count
      const newTotalUnread = getTotalUnreadCount();
      if (onUnreadCountChange) {
        onUnreadCountChange(newTotalUnread);
      }
    }
  }, [selectedChatId, markMessagesAsRead, getTotalUnreadCount, onUnreadCountChange]);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    if (chatId) {
      markMessagesAsRead(chatId);
      // Force an update of the total unread count
      const newTotalUnread = getTotalUnreadCount();
      if (onUnreadCountChange) {
        onUnreadCountChange(newTotalUnread);
      }
    }
  };
  return {
    selectedChatId,
    setSelectedChatId: handleSelectChat,
    newMessage,
    setNewMessage,
    searchQuery,
    setSearchQuery,
    emojiPickerVisible,
    setEmojiPickerVisible,
    currentChat,
    filteredConversations,
    chatWindowRef,
    addMessageToConversation,
    getUnreadCount,
    getTotalUnreadCount,
  };
};