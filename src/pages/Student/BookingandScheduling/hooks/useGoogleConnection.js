import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

export const useCheckGoogleConnection = (userId) => {
  const apiClient = new APIClient(`/OAuth/check-connection?userId=${userId}`);

  return useQuery({
    queryKey: ["googleConnection", userId],
    queryFn: apiClient.get,
  });
};

export const useDisconnectGoogle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => {
      const apiClient = new APIClient(`/OAuth/disconnect?userId=${userId}`);
      return apiClient.delete();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["googleConnection"]);
    },
  });
};
