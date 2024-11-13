import { useState, useEffect, useCallback, useMemo } from "react";

const useMessages = (initialMessages) => {
  const [messagesList, setMessagesList] = useState(initialMessages || []);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load messages from local storage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessagesList(parsedMessages);
      } catch (error) {
        console.error("Failed to parse messages from localStorage", error);
      }
    }
  }, []);

  // Save messages to local storage when updated
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messagesList));
  }, [messagesList]);

  // Memoized filtered messages based on search query
  const filteredMessages = useMemo(() => {
    return messagesList.filter((message) =>
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messagesList, searchQuery]);

  const openChat = useCallback((message) => {
    setSelectedChat(message);
    setShowMessagePanel(true);
  }, []);

  const closeChat = useCallback(() => {
    setSelectedChat(null);
    setShowMessagePanel(false);
  }, []);

  const addMessage = (newMessage) => {
    setMessagesList((prevMessages) => [...prevMessages, newMessage]);
  };

  const deleteMessage = (messageId) => {
    setMessagesList((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId)
    );
  };

  return {
    messagesList,
    selectedChat,
    showMessagePanel,
    setShowMessagePanel,
    searchQuery,
    setSearchQuery,
    filteredMessages,
    openChat,
    closeChat,
    addMessage,
    deleteMessage,
  };
};

export default useMessages;
