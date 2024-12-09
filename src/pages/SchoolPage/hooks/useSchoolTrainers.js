import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";

const useSchoolTrainers = (schoolId) => {
  const apiClient = new APIClient(`/schools/${schoolId}/trainers`);

  return useQuery({
    queryKey: ["schoolTrainers", schoolId],
    queryFn: apiClient.get,
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 30 * 60 * 1000,
  });
};

export default useSchoolTrainers;
