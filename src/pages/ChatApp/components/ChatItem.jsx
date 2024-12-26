import React from "react";
import useAuthStore from "../../../store/auth.store";
import getOtherParticipantInfo from "../utils/getOtherParticipantInfo";

const ChatItem = ({ chat, selectedChatId, setSelectedChatId, unreadCount }) => {
  const { user: currentUser } = useAuthStore();
  const otherUser = getOtherParticipantInfo(
    chat.participantsInfo,
    currentUser.id
  );

  return (
    <div
      key={chat.id}
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
        chat.id === selectedChatId
          ? "bg-gray-50 border-l-4 border-blue-500"
          : unreadCount > 0
          ? "bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-400 shadow-sm"
          : "hover:border-l-4 hover:border-gray-200"
      }`}
      onClick={setSelectedChatId}
    >
      <div className="relative flex-shrink-0">
        <img
          src={otherUser.profilePicture}
          alt={`${chat.name}'s avatar`}
          className={`w-12 h-12 rounded-full mr-3 transition-transform duration-200 ${
            unreadCount > 0
              ? "border-2 border-blue-400 scale-105"
              : "border-2 border-gray-300"
          }`}
        />
        {chat.status === "Online" && (
          <span className="absolute bottom-1 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <div className="flex-grow min-w-0">
        <div
          className={`font-semibold transition-colors duration-200 ${
            unreadCount > 0 ? "text-blue-700" : "text-gray-700"
          }`}
        >
          {otherUser.name}
        </div>
        <div
          className={`text-sm truncate transition-all duration-200 ${
            unreadCount > 0
              ? "text-blue-600 font-medium transform translate-x-1"
              : "text-gray-500"
          }`}
        >
          {chat?.lastMessage}
        </div>
      </div>
      {unreadCount > 0 && (
        <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 animate-pulse" />
      )}
    </div>
  );
};

export default ChatItem;
