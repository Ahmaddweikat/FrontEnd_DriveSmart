import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";

const useSchoolCars = (schoolId) => {
  const apiClient = new APIClient(`/schools/${schoolId}/cars`);

  return useQuery({
    queryKey: ["schoolCars", schoolId],
    queryFn: apiClient.get,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export default useSchoolCars;
