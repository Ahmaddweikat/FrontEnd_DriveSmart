import React from "react";
import SearchBar from "./components/SearchBar";
import ChatItem from "./components/ChatItem";
import MessageBubble from "./components/MessageBubble";
import EmojiPicker from "emoji-picker-react";
import smileyIcon from "../../assets/ChatApp/Svg/smiley.svg";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "./hooks/useChat";
import { useMessageHandlers } from "./hooks/useMessageHandlers";
import { useDateFormatter } from "./hooks/useDateFormatter";

const ChatApp = () => {
  const {
    currentChat,
    newMessage,
    setNewMessage,
    addMessageToConversation,
    selectedChatId,
    setSelectedChatId,

    searchQuery,
    setSearchQuery,
    emojiPickerVisible,
    setEmojiPickerVisible,

    filteredConversations,
    chatWindowRef,
  } = useChat();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    addMessageToConversation(selectedChatId, newMessage);
    setNewMessage("");

    // Log active chat data after sending message
    console.log("Chat Update:", {
      chatId: currentChat.id,
      name: currentChat.name,
      latestMessage: {
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      },
      allMessages: currentChat.messages,
    });
  };

  const { handleEmojiClick, handleInputClick } = useMessageHandlers(
    setNewMessage,
    addMessageToConversation,
    selectedChatId,
    setEmojiPickerVisible
  );

  const { formatDate } = useDateFormatter();

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg overflow-hidden">
      <div className="flex w-full h-full">
        <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="divide-y divide-gray-100">
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

        <div className="flex flex-col flex-1 bg-gray-50">
          {currentChat && (
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center relative">
                <div className="relative">
                  <img
                    src={currentChat.avatar}
                    alt={`${currentChat.name}'s avatar`}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 mr-4"
                  />
                  {currentChat.status === "Online" && (
                    <div className="absolute bottom-0.5 right-5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    {currentChat.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentChat.status}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            ref={chatWindowRef}
            className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
          >
            {currentChat?.messages.map((msg, idx) => (
              <div key={idx}>
                {idx === 0 ||
                currentChat.messages[idx - 1].date !== msg.date ? (
                  <div className="flex items-center justify-center my-6">
                    <div className="text-sm text-gray-500 bg-white px-4 py-1 rounded-full shadow-sm border border-gray-100">
                      {formatDate(msg.date)}
                    </div>
                  </div>
                ) : null}

                <MessageBubble msg={msg} currentChat={currentChat} />
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-4">
            <button
              onClick={() => setEmojiPickerVisible((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Open Emoji Picker"
            >
              <img src={smileyIcon} alt="smiley" className="w-6 h-6" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onClick={handleInputClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    handleSendMessage(newMessage);
                  }
                }}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                aria-label="Message input"
              />
              {emojiPickerVisible && (
                <div className="absolute bottom-full right-0 mb-2">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>

            <button
              onClick={() => handleSendMessage(newMessage)}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-sm"
              aria-label="Send Message"
            >
              <SendIcon
                sx={{ width: 24, height: 24, transform: "rotate(310deg)" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
