import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const ChatView = ({ initialMessages = [], onClose }) => {
  const [messagesList, setMessagesList] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null); // State for the selected message

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageToSend = {
      id: messagesList.length + 1,
      name: "Your Name", // Replace with actual sender's name
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      profileImage: "/path-to-your-image", // Replace with actual sender's profile image
      read: false,
    };

    setMessagesList((prevMessages) => [...prevMessages, messageToSend]);
    setNewMessage("");
  };

  const handleMessageClick = (msg) => {
    setSelectedMessage(msg); // Set the selected message
  };

  return (
    <div className="flex flex-col bg-white border-l shadow-lg w-92 max-w-full h-full">
      {/* Chat Header */}
      <div className="flex items-start p-4 border-b-2">
        <button onClick={onClose} className="text-gray-600">
          <ArrowBackIosIcon style={{ width: "15px", height: "15px" }} />
        </button>
        {messagesList.length > 0 && (
          <>
            <img
              src={messagesList[0].profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full ml-8"
            />
            <span className="ml-2 font-semibold">{messagesList[0].name}</span>
          </>
        )}
      </div>

      {/* Messages Display */}
      <div className="flex-1 p-4 overflow-y-auto h-full">
        {messagesList.map((msg, index) => {
          const messageDate = new Date(msg.timestamp);
          const formattedDate = messageDate.toLocaleDateString("en-UK", {
            day: "numeric",
            month: "long",
          });
          const formattedTime = messageDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const showDate =
            index === 0 ||
            new Date(messagesList[index - 1].timestamp).toLocaleDateString() !==
              messageDate.toLocaleDateString();

          return (
            <div
              key={msg.id}
              className="mb-4"
              onClick={() => handleMessageClick(msg)}
            >
              {showDate && (
                <div className="text-gray-500 text-sm mb-8 mt-4 flex justify-center">
                  {formattedDate}
                </div>
              )}

              <div className="flex items-start">
                <img
                  src={msg.profileImage}
                  alt="Profile"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{msg.name}</div>
                    <div className="text-sm text-gray-500 ml-10">
                      {formattedTime}
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded p-2 mt-1">
                    <div className="text-gray-700">{msg.message}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Display Selected Message Details */}
      {selectedMessage && (
        <div className="p-4 border-t bg-gray-100">
          <h3 className="font-bold">Selected Message Details:</h3>
          <p>
            <strong>From:</strong> {selectedMessage.name}
          </p>
          <p>
            <strong>Message:</strong> {selectedMessage.message}
          </p>
          <p>
            <strong>Time:</strong> {selectedMessage.timestamp}
          </p>
        </div>
      )}

      {/* Message Input Area */}
      <div className="flex flex-rows border-t mb-28">
        <input
          type="text"
          className="w-3/4 border-none rounded p-2 mr-4"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          style={{ marginRight: "4px" }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatView;
