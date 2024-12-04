import { useState, useRef, useEffect } from "react";
import { useConversations } from "./useConversations";

export const useChat = () => {
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { conversations, addMessageToConversation } = useConversations();
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

  return {
    selectedChatId,
    setSelectedChatId,
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
  };
};
