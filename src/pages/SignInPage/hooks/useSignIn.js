import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../services/apiClient";
import useAuthStore from "../../../store/auth.store";
import { getFCMToken } from "../../../services/firebase/Notifications";
const apiClient = new APIClient("/auth/sign-in");

const useSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const signInMutation = useMutation({
    mutationFn: async (credentials) => {
      const fcmToken = await getFCMToken();
      console.log("🚀 ~ mutationFn: ~ fcmToken:", fcmToken);
      return apiClient.post({ ...credentials, fcmToken });
    },

    onSuccess: (data) => {
      login(data.token);
      APIClient.setAuthorizationHeader(data.token);
      // Navigate based on user role
      const user = useAuthStore.getState().user;
      navigate(`/${user.role}`);
    },
    onError: (error) => {
      console.error("Sign-in failed:", error);
    },
  });

  return {
    signIn: signInMutation.mutate,
    isLoading: signInMutation.isPending,
    error: signInMutation.error,
  };
};

export default useSignIn;
