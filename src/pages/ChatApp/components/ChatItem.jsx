import React from "react";

const ChatItem = ({ chat, selectedChatId, setSelectedChatId }) => {
  return (
    <div
      key={chat.id}
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-200 ${
        chat.id === selectedChatId ? "bg-gray-50" : ""
      }`}
      onClick={() => setSelectedChatId(chat.id)}
    >
      <div className="relative">
        <img
          src={chat.avatar}
          alt={`${chat.name}'s avatar`}
          className="w-12 h-12 rounded-full mr-3 border-2 border-gray-300"
        />
        {chat.status === "Online" && (
          <span className="absolute bottom-1 right-3 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
        )}
      </div>
      <div>
        <div className="font-semibold text-orange-400">{chat.name}</div>
        <div className="text-sm text-blue-900">
          {chat.messages[chat.messages.length - 1]?.text.slice(0, 20)}...
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
