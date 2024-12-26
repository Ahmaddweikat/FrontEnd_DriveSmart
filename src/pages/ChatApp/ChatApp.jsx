import React, { useEffect } from "react";
import SearchBar from "../../pages/ChatApp/components/SearchBar";
import ChatItem from "../ChatApp/components/ChatItem";
import MessageBubble from "../../pages/ChatApp/components/MessageBubble";
import EmojiPicker from "emoji-picker-react";
import smileyIcon from "../../assets/ChatApp/Svg/smiley.svg";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useChat } from "./hooks/useChat";
import { useMessageHandlers } from "./hooks/useMessageHandlers";
import { useDateFormatter } from "./hooks/useDateFormatter";

const ChatApp = ({ isTopBarChat = false, onUnreadCountChange }) => {
  const {
    currentChat,
    newMessage,
    setNewMessage,
    searchQuery,
    setSearchQuery,
    emojiPickerVisible,
    setEmojiPickerVisible,
    selectedChatId,
    setSelectedChatId,
    filteredConversations,
    chatWindowRef,
    addMessageToConversation,
    getUnreadCount,
    getTotalUnreadCount,
    handleUserSelect,
    filteredUsers,
  } = useChat();

  const { handleSendMessage, handleEmojiClick, handleInputClick } =
    useMessageHandlers(
      setNewMessage,
      addMessageToConversation,
      selectedChatId,
      setEmojiPickerVisible
    );

  useEffect(() => {
    if (onUnreadCountChange) {
      onUnreadCountChange(getTotalUnreadCount());
    }
  }, [getTotalUnreadCount, onUnreadCountChange, filteredConversations]);

  const { formatDate } = useDateFormatter();

  if (isTopBarChat) {
    return (
      <div className="flex h-full w-full bg-white overflow-hidden">
        <div className="flex w-full h-full">
          {!selectedChatId ? (
            // Conversations List View
            <div className="w-full bg-white flex flex-col h-full">
              <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
                <div className="px-4 pb-3">
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                {filteredConversations.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    selectedChatId={selectedChatId}
                    setSelectedChatId={setSelectedChatId}
                    unreadCount={getUnreadCount(chat.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Chat Messages View
            <div className="flex flex-col flex-1 bg-gray-50 h-full">
              {/* Sticky Header */}
              <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
                <div className="px-6 py-4 flex items-center">
                  <button
                    onClick={() => setSelectedChatId(null)}
                    className="mr-4 text-gray-500 hover:text-gray-700"
                  >
                    <ArrowBackOutlinedIcon />
                  </button>
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
              </div>

              {/* Messages Area with Auto Scroll */}
              <div
                ref={chatWindowRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth"
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

              {/* Sticky Input Area */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 z-30">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setEmojiPickerVisible((prev) => !prev)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    />
                    {emojiPickerVisible && (
                      <div className="absolute bottom-full right-0 mb-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSendMessage(newMessage)}
                    className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                  >
                    <SendIcon
                      sx={{
                        width: 24,
                        height: 24,
                        transform: "rotate(310deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  // For Main Messages Page - Split View
  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      <div className="flex w-full h-full">
        {/* Left Side - Conversations List */}
        <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
          <div className="sticky top-0 bg-white z-30">
            <div className="px-4 py-3">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search conversations..."
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredConversations.length > 0
              ? // Show existing conversations
                filteredConversations.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    selectedChatId={selectedChatId}
                    setSelectedChatId={setSelectedChatId}
                    unreadCount={getUnreadCount(chat.id)}
                  />
                ))
              : // Show filtered users when searching
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                      />
                      {user.status === "Online" && (
                        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.status}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Right Side - Chat Messages */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {currentChat ? (
            <>
              <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center">
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

              <div ref={chatWindowRef} className="flex-1 p-6 overflow-y-auto">
                {currentChat.messages.map((msg, idx) => (
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

              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setEmojiPickerVisible((prev) => !prev)}
                    className="p-2 rounded-full hover:bg-gray-100"
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
                      className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                    {emojiPickerVisible && (
                      <div className="absolute bottom-full right-0 mb-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSendMessage(newMessage)}
                    className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                  >
                    <SendIcon
                      sx={{
                        width: 24,
                        height: 24,
                        transform: "rotate(310deg)",
                      }}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <p className="mb-2">No conversations yet</p>
              <p className="text-sm">Search for users to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatApp;
