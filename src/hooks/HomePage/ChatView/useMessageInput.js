import { useState } from "react";

const useMessageInput = () => {
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const clearInput = () => {
    setNewMessage("");
  };

  return {
    newMessage,
    handleInputChange,
    clearInput,
  };
};

export default useMessageInput;
