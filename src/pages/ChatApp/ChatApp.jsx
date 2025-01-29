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
import useAuthStore from "../../store/auth.store";
import getOtherParticipantInfo from "./utils/getOtherParticipantInfo";
import { Avatar } from "@mui/material";

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
    messages,
    unreadMessageCounts,
  } = useChat();
  console.log("🚀 ~ ChatApp ~ filteredConversations:", filteredConversations);
  console.log("🚀 ~ ChatApp ~ filteredUsers:", filteredUsers);
  const { user: currentUser } = useAuthStore();
  const otherUser = getOtherParticipantInfo(
    currentChat?.participantsInfo,
    currentUser.id
  );

  const { handleSendMessage, handleEmojiClick, handleInputClick } =
    useMessageHandlers(
      setNewMessage,
      addMessageToConversation,
      selectedChatId,
      setEmojiPickerVisible
    );

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
            {searchQuery
              ? // Show filtered users when searching
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar
                        src={user.profilePicture}
                        alt={`${user.name}'s avatar`}
                        sx={{
                          width: 48,
                          height: 48,
                          border: 2,
                          borderColor: "grey.200",
                        }}
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
                ))
              : // Show existing conversations when not searching
                filteredConversations.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    selectedChatId={selectedChatId}
                    setSelectedChatId={() => {
                      setSearchQuery("");
                      setSelectedChatId(chat.id);
                      window.scrollTo(0, 0);
                    }}
                    unreadCount={unreadMessageCounts[chat.id] || 0}
                  />
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
                    <Avatar
                      src={otherUser.profilePicture}
                      alt={`${otherUser.name}'s avatar`}
                      sx={{
                        width: 48,
                        height: 48,
                        marginRight: 2,
                        border: 2,
                        borderColor: "grey.200",
                      }}
                    />
                    {currentChat.status === "Online" && (
                      <div className="absolute bottom-0.5 right-5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 text-lg">
                      {otherUser.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {currentChat.status}
                    </div>
                  </div>
                </div>
              </div>

              <div ref={chatWindowRef} className="flex-1 p-6 overflow-y-auto">
                {currentChat &&
                  messages[selectedChatId]?.map((msg, idx) => (
                    <div key={idx}>
                      {idx === 0 ||
                      messages[selectedChatId][idx - 1].timestamp !==
                        msg.timestamp ? (
                        <div className="flex items-center justify-center my-6">
                          <div className="text-sm text-gray-500 bg-white px-4 py-1 rounded-full shadow-sm border border-gray-100">
                            {msg?.timestamp?.toDate().toLocaleString()}
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
