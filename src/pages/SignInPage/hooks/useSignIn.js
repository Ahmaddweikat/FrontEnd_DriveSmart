import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../services/apiClient";
import useAuthStore from "../../../store/auth.store";

const apiClient = new APIClient("/auth/sign-in");

const useSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const signInMutation = useMutation({
    mutationFn: (credentials) => apiClient.post(credentials),
    onSuccess: (data) => {
      login(data.token);
      // TODO: This line may be need to be moved to the PrivateRoute component
      APIClient.setAuthorizationHeader(data.token);

      // Navigate based on user role
      const user = useAuthStore.getState().user;
      navigate(`/${user.role}`);
    },
  });

  return {
    signIn: signInMutation.mutate,
    isLoading: signInMutation.isPending,
    error: signInMutation.error,
  };
};

export default useSignIn;
