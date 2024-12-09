import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";

const useSchool = (schoolId) => {
  const apiClient = new APIClient(`/schools/${schoolId}`);

  return useQuery({
    queryKey: ["school", schoolId],
    queryFn: apiClient.get,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

export default useSchool;
