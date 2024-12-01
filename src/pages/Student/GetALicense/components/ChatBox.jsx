import React from "react";

const ChatBox = ({ isChatOpen, toggleChat }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-500 ${
        isChatOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 bg-customGreen text-white flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat with us</h2>
        <button className="text-white text-xl font-bold" onClick={toggleChat}>
          ×
        </button>
      </div>
      <div className="p-4 overflow-y-auto flex flex-col h-full">
        {/* Chat content here */}
        <p className="text-gray-600">Hi! How can I assist you today?</p>
      </div>
    </div>
  );
};

export default ChatBox;
