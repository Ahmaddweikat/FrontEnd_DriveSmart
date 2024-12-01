import React from "react";

const ChatButton = ({ toggleChat }) => {
  return (
    <div
      className="fixed bottom-6 right-6 w-14 h-14 bg-customGreen rounded-full flex items-center justify-center shadow-lg cursor-pointer"
      onClick={toggleChat}
    >
      <span className="text-white text-2xl">💬</span>
    </div>
  );
};

export default ChatButton;
