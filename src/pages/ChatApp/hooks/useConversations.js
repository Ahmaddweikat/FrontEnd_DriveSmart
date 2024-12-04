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
            },
          ],
        };
      }
      return chat;
    });
    setConversations(updatedConversations);
  };

  return {
    conversations,
    addMessageToConversation,
  };
};
