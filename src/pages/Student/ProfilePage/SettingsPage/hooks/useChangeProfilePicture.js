import { useMutation } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

const apiClient = new APIClient("/files/profile-picture");

const useChangeProfilePicture = () => {
  return useMutation({
    mutationFn: async (file) => {
      return apiClient.postFile(file, "profilePicture");
    },
    onSuccess: (data) => {
      console.log("Profile picture updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating profile picture:", error);
    },
  });
};

export default useChangeProfilePicture;
