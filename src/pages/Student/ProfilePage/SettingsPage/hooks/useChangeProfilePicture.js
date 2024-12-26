import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocs, query, updateDoc, where } from "firebase/firestore";
import APIClient from "../../../../../services/apiClient";
import {
  conversationsRef,
  db,
} from "../../../../../services/firebase/firebaseConfig";
import useAuthStore from "../../../../../store/auth.store";

const apiClient = new APIClient("/files/profile-picture");

const useChangeProfilePicture = () => {
  const queryClient = useQueryClient();
  const { user: currentUser, updateProfilePicture } = useAuthStore();

  return useMutation({
    mutationFn: async (file) => {
      return apiClient.postFile(file, "profilePicture");
    },
    onSuccess: async (data) => {
      // Update student profile cache
      queryClient.invalidateQueries("studentProfile");
      updateProfilePicture(data.profilePicture);

      // Get all conversations where user is a participant
      const q = query(
        conversationsRef,
        where("participants", "array-contains", currentUser.id)
      );

      const snapshot = await getDocs(q);

      // Update each conversation's participantsInfo
      const updatePromises = snapshot.docs.map((doc) => {
        const conversationRef = doc(db, "conversations", doc.id);
        return updateDoc(conversationRef, {
          [`participantsInfo.${currentUser.id}.profilePicture`]:
            data.profilePicture,
        });
      });

      await Promise.all(updatePromises);
    },
  });
};

export default useChangeProfilePicture;
