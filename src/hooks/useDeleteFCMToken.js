import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/auth/clear-fcm-token");

const useDeleteFCMToken = () => {
  return useMutation({
    mutationFn: apiClient.delete,
  });
};

export default useDeleteFCMToken;
