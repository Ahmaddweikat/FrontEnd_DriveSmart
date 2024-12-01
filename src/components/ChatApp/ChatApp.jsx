import React, { useState, useRef, useEffect } from "react";
import { useConversations } from "./hooks/useConversations";
import SearchBar from "./components/SearchBar";
import ChatItem from "./components/ChatItem";
import MessageBubble from "./components/MessageBubble";
import EmojiPicker from "emoji-picker-react";
import smileyIcon from "../../assets/ChatApp/Svg/smiley.svg";
import SendIcon from "@mui/icons-material/Send";

const ChatApp = () => {
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { conversations, addMessageToConversation } = useConversations();

  const currentChat = conversations.find((chat) => chat.id === selectedChatId);

  const filteredConversations = conversations.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const chatWindowRef = useRef(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    addMessageToConversation(selectedChatId, newMessage);
    setNewMessage("");
    setEmojiPickerVisible(false); // Close emoji picker after sending message
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  const handleInputClick = () => {
    setEmojiPickerVisible(false);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long" }; // Format: Day Month (e.g., 01 December)
    return date.toLocaleDateString("en-UK", options);
  };
  return (
    <div className="flex h-[95vh] w-[200vh] justify-center items-center">
      <div className="w-5/6 h-5/6 flex bg-white border rounded-lg shadow-lg">
        <div className="w-1/4 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div>
            {filteredConversations.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                selectedChatId={selectedChatId}
                setSelectedChatId={setSelectedChatId}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          {currentChat && (
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <div className="flex items-center relative">
                <img
                  src={currentChat.avatar}
                  alt={`${currentChat.name}'s avatar`}
                  className="w-11 h-11 rounded-full border-2 mr-4"
                />
                <div>
                  <div className="font-semibold text-orange-400">
                    {currentChat.name}
                  </div>
                  <div className="text-sm text-blue-950">
                    {currentChat.status}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatWindowRef} className="flex-1 p-4 overflow-y-auto">
            {currentChat?.messages.map((msg, idx) => (
              <div key={idx}>
                {idx === 0 ||
                currentChat.messages[idx - 1].date !== msg.date ? (
                  <div className="text-center text-base text-customGreen my-4">
                    {formatDate(msg.date)}
                  </div>
                ) : null}

                <MessageBubble key={idx} msg={msg} currentChat={currentChat} />
              </div>
            ))}
          </div>
          {emojiPickerVisible && (
            <div className="absolute bottom-18 left-56 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <div className="p-4 border-t flex relative items-center">
            <button
              onClick={() => setEmojiPickerVisible((prev) => !prev)}
              className="mr-2 p-2 rounded-full"
              aria-label="Open Emoji Picker"
            >
              <img src={smileyIcon} alt="smiley" className="w-6 h-6" />
            </button>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onClick={handleInputClick} // Close emoji picker when the input is clicked
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message here"
              className="w-1/3 px-4 py-2 border-none rounded-lg"
              aria-label="Message input"
            />

            <button
              onClick={handleSendMessage}
              className="ml-auto px-1.5 py-1.5 bg-customGreen text-white rounded-full"
              aria-label="Send Message"
            >
              <SendIcon
                sx={{
                  width: 30,
                  height: 32,
                  transform: "rotate(310deg)",
                  marginLeft: 0.5,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
