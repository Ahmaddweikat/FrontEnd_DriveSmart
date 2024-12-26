import React, { useState, useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../services/firebase/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";

const InAppNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const newNotification = {
        id: Date.now(),
        title: payload.notification.title,
        body: payload.notification.body,
        timestamp: new Date(),
      };

      setNotifications((prev) => [...prev, newNotification]);
      queryClient.invalidateQueries(["notifications"]);

      // Auto remove notification after 5 seconds
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== newNotification.id)
        );
      }, 5000);
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white shadow-lg rounded-lg p-4 mb-2 border-l-4 border-customGreen animate-slide-enter"
          style={{ maxWidth: "300px" }}
        >
          <h4 className="font-semibold text-gray-800">{notification.title}</h4>
          <p className="text-gray-600 text-sm">{notification.body}</p>
          <span className="text-xs text-gray-400">
            {notification.timestamp.toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InAppNotification;
