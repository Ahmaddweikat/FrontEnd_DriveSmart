export const useMessageHandlers = (
  setNewMessage,
  addMessageToConversation,
  selectedChatId,
  setEmojiPickerVisible
) => {
  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    addMessageToConversation(selectedChatId, message);
    setNewMessage("");
    setEmojiPickerVisible(false);
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  const handleInputClick = () => {
    setEmojiPickerVisible(false);
  };

  return {
    handleSendMessage,
    handleEmojiClick,
    handleInputClick,
  };
};
