import { useState } from "react";

const useMessages = (initialMessages) => {
  const [messagesList, setMessagesList] = useState(initialMessages);

  const addMessage = (newMessage) => {
    setMessagesList((prevMessages) => [...prevMessages, newMessage]);
  };

  return { messagesList, addMessage };
};

export default useMessages;
