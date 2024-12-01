import React from "react";
import av from "../../../assets/ChatApp/Images/sideImage2.jpg"; // Your avatar

const MessageBubble = ({ msg, currentChat }) => {
  const isSender = msg.sender === "You"; // Check if the message is from the current user

  return (
    <div className={`mb-4 flex ${isSender ? "justify-end" : ""}`}>
      {/* Avatar for the receiver */}
      {!isSender && (
        <img
          src={currentChat.avatar}
          alt="Receiver Avatar"
          className="w-10 h-10 rounded-full mr-3 border-2"
        />
      )}

      <div className="max-w-lg">
        <div className="flex items-center text-sm text-gray-600 mb-1">
          {!isSender && (
            <>
              <span className="font-medium text-blue-900">{msg.sender}</span>
              <span className="ml-2 text-red-500 text-xs">{msg.time}</span>
            </>
          )}
          {isSender && (
            <>
              <span className="ml-auto text-red-500 text-xs">{msg.time}</span>
              <span className="font-medium ml-2 mr-1 text-blue-900">Me</span>
            </>
          )}
        </div>

        <div
          className={`p-2 rounded-lg ${
            isSender
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="whitespace-pre-line">{msg.text}</p>
        </div>
      </div>
      {isSender && (
        <img
          src={av}
          alt="Your Avatar"
          className="mb-4 w-10 h-10 rounded-full ml-3 border-2"
        />
      )}
    </div>
  );
};

export default MessageBubble;
