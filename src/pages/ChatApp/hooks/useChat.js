import { useState, useRef, useEffect } from "react";
import { useConversations } from "./useConversations";
// import users from "../constants/users";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import { useUsers } from "./useUsers";
import useAuthStore from "../../../store/auth.store";

export const useChat = ({ onUnreadCountChange } = {}) => {
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const {
    conversations,
    addMessageToConversation,
    startNewConversation,
    markMessagesAsRead,
    getUnreadCount,
    getTotalUnreadCount,
    unreadMessageCounts,
  } = useConversations();
  const chatWindowRef = useRef(null);
  const { user: currentUser } = useAuthStore();

  const { data: users = [] } = useUsers(searchQuery);

  const currentChat = conversations.find((chat) => chat.id === selectedChatId);

  const filteredUsers = searchQuery ? users : [];

  const filteredConversations =
    conversations &&
    conversations.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

  const handleUserSelect = async (user) => {
    const chatId = await startNewConversation(user);
    console.log("🚀 ~ handleUserSelect ~ chatId:", chatId);
    setSelectedChatId(chatId);
    setSearchQuery("");
  };

  useEffect(() => {
    if (chatWindowRef.current && messages[selectedChatId]?.length > 0) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [selectedChatId, messages]);

  useEffect(() => {
    if (selectedChatId) {
      const q = query(
        collection(db, "messages"),
        where("conversationId", "==", selectedChatId),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages((prev) => ({
          ...prev,
          [selectedChatId]: messagesList,
        }));
      });

      return () => unsubscribe();
    }
  }, [selectedChatId]);

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    if (chatId) {
      await markMessagesAsRead(chatId, currentUser.id);
      const newTotalUnread = await getTotalUnreadCount();
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
    filteredUsers,
    handleUserSelect,
    chatWindowRef,
    addMessageToConversation,
    getUnreadCount,
    getTotalUnreadCount,
    messages,
    unreadMessageCounts,
  };
};
