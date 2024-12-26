// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "graduation-36815.firebaseapp.com",
  databaseURL: "https://graduation-36815-default-rtdb.firebaseio.com",
  projectId: "graduation-36815",
  storageBucket: "graduation-36815.appspot.com",
  messagingSenderId: "523157222473",
  appId: "1:523157222473:web:394f069ec5a6a68b30fb98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
export const db = getFirestore(app);
export const conversationsRef = collection(db, "conversations");
export const messagesRef = collection(db, "messages");
