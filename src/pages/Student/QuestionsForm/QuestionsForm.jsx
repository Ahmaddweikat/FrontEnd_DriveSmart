import React from "react";
import QuizApp from "./components/QuizApp";
import TopBar from "../../../components/HomeTopBar/TopBar";
import Footer from "../../../components/Footer";
import { notifications } from "../../../constants/Notifications/notifications";
import { messages } from "../../../constants/Message/messages";
import useNotifications from "../../../hooks/useNotificationsState";
import useMessages from "../../../hooks/useMessages";
const QuestionsForm = () => {
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
  const { messagesList, showMessageNotifications, toggleMessageNotifications } =
    useMessages();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <TopBar
          toggleNotifications={toggleNotifications}
          toggleMessageNotifications={toggleMessageNotifications}
          showNotifications={showNotifications}
          showMessageNotifications={showMessageNotifications}
          notificationList={notificationList}
          messagesList={messagesList} // Ensure this line is present
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        {/* Banner */}
        <section
          className="relative min-h-[35vh] bg-cover bg-center"
          // style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            {/* Add any title or content here if needed */}
          </div>
        </section>
        <QuizApp />
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsForm;
