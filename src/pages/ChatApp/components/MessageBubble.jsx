import React from "react";
import useAuthStore from "../../../store/auth.store";
import useGetStudentProfile from "../../Student/ProfilePage/ProfileInfoPage/hooks/useGetStudentProfile";
import getOtherParticipantInfo from "../utils/getOtherParticipantInfo";

const MessageBubble = ({ msg, currentChat }) => {
  const { user } = useAuthStore();
  const isSender = msg.senderId === user.id; // Check if the message is from the current user
  const { data } = useGetStudentProfile();
  const otherUser = getOtherParticipantInfo(
    currentChat.participantsInfo,
    user.id
  );

  return (
    <div className={`mb-4 flex ${isSender ? "justify-end" : ""}`}>
      {!isSender && (
        <img
          src={otherUser.profilePicture}
          alt="Receiver Avatar"
          className="w-8 h-8 rounded-full mr-2 border-2 border-gray-200 shadow-sm object-cover"
        />
      )}

      <div className="max-w-[45%]">
        <div className="flex items-center text-xs mb-0.5">
          {!isSender && (
            <>
              <span className="font-medium text-gray-700">{msg.sender}</span>
              <span className="ml-2 text-gray-400">{msg.time}</span>
            </>
          )}
          {isSender && (
            <>
              <span className="ml-auto text-gray-400">{msg.time}</span>
              <span className="font-medium ml-2 mr-1 text-gray-700">Me</span>
            </>
          )}
        </div>

        <div
          className={`p-2 rounded-xl shadow-sm ${
            isSender
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
              : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
          }`}
        >
          <p className="whitespace-pre-line text-sm leading-snug">{msg.text}</p>
        </div>
      </div>

      {isSender && (
        <img
          src={data.profilePicture}
          alt="Your Avatar"
          className="w-8 h-8 rounded-full ml-2 border-2 border-gray-200 shadow-sm object-cover"
        />
      )}
    </div>
  );
};

export default MessageBubble;
