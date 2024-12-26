import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useAuthStore from "../../../store/auth.store";

export const useUsers = (searchQuery = "") => {
  const user = useAuthStore((state) => state.user);
  const apiClient = new APIClient(
    `/schools/${user.schoolId}/people?search=${searchQuery}`
  );

  return useQuery({
    queryKey: ["users", user.schoolId, searchQuery],
    queryFn: apiClient.get,
    enabled: !!user.schoolId,
  });
};
