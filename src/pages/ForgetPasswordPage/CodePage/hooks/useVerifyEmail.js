import { useMutation } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

const apiClient = new APIClient("/auth/verify-email");

const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data) => apiClient.post(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useVerifyEmail;
