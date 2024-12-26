import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfig";

export const getFCMToken = async () => {
  try {
    await Notification.requestPermission();
    const token = await getToken(messaging, {
      vapidKey:
        "BLRtzvCOIXcab7M04djgyTxqxLqjNDqFqVyqJpNh0NEsYCJO0um6ORVVR7K8wyaKqmBqXBZO0ppAPxwnZUlVTnE",
    });
    return token;
  } catch (error) {
    console.error("FCM Token Error:", error);
    return null;
  }
};
