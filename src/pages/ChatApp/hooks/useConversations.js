import { useState, useEffect } from "react";
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  conversationsRef,
  messagesRef,
  db,
} from "../../../services/firebase/firebaseConfig";
import useAuthStore from "../../../store/auth.store";

export const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [unreadMessageCounts, setUnreadMessageCounts] = useState({});
  const { user: currentUser } = useAuthStore();
  const currentUserId = currentUser.id;

  useEffect(() => {
    const q = query(
      conversationsRef,
      where("participants", "array-contains", currentUserId),
      orderBy("lastMessageAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(conversationsData);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  const startNewConversation = async (user) => {
    if (user.id === currentUserId) {
      // search for existing conversation with the same participants
      const existingConversation = conversations.find((conv) => {
        if (conv.participants[0] === conv.participants[1]) return true;
      });

      if (existingConversation) {
        return existingConversation.id;
      }
    }

    const existingConversation = conversations.find((conv) =>
      conv.participants.includes(user.id)
    );

    if (!existingConversation || user.id === currentUserId) {
      const newConversation = {
        name: `${user.name}`,
        // avatar: user.profilePicture,
        status: user.status || "Online",
        participants: [currentUserId, user.id],
        participantsInfo: {
          [currentUserId]: {
            name: currentUser.name,
            profilePicture: currentUser.profilePicture,
          },
          [user.id]: { name: user.name, profilePicture: user.profilePicture },
        },
        lastMessageAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(conversationsRef, newConversation);
      return docRef.id;
    }

    return existingConversation.id;
  };

  const addMessageToConversation = async (conversationId, messageText) => {
    const newMessage = {
      conversationId,
      senderId: currentUserId,
      text: messageText,
      timestamp: serverTimestamp(),
      read: false,
    };

    await addDoc(messagesRef, newMessage);

    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      lastMessageAt: serverTimestamp(),
      lastMessage: messageText,
    });
  };

  const markMessagesAsRead = async (conversationId, currentUserId) => {
    const q = query(
      messagesRef,
      where("conversationId", "==", conversationId),
      where("senderId", "!=", currentUserId),
      where("read", "==", false)
    );

    const unreadMessages = await getDocs(q);
    const updatePromises = unreadMessages.docs.map((doc) =>
      updateDoc(doc.ref, { read: true })
    );

    await Promise.all(updatePromises);
  };

  const getUnreadCount = async (conversationId) => {
    const q = query(
      messagesRef,
      where("conversationId", "==", conversationId),
      where("senderId", "!=", currentUserId),
      where("read", "==", false)
    );

    const snapshot = await getDocs(q);
    console.log("🚀 ~ getUnreadCount ~ snapshot:", snapshot.size);
    return snapshot.size;
  };

  useEffect(() => {
    const q = query(
      messagesRef,
      where("senderId", "!=", currentUserId),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const unreadCounts = {};
      snapshot.docs.forEach((doc) => {
        const message = doc.data();
        unreadCounts[message.conversationId] =
          (unreadCounts[message.conversationId] || 0) + 1;
      });
      setUnreadMessageCounts(unreadCounts);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  const getTotalUnreadCount = () => {
    return 0;
    return conversations.reduce(
      (total, chat) =>
        total +
        chat.messages.filter((msg) => !msg.read && msg.sender !== "You").length,
      0
    );
  };

  return {
    conversations,
    addMessageToConversation,
    startNewConversation,
    markMessagesAsRead,
    getUnreadCount,
    getTotalUnreadCount,
    unreadMessageCounts,
  };
};
