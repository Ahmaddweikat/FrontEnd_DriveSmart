import { useMutation } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

const apiClient = new APIClient("/auth/reset-password");

const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => apiClient.post(data),
  });
};

export default useResetPassword;
