import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

const useGetAvailabilities = (query) => {
  const apiClient = new APIClient(`/students/availabilities/filter?${query}`);

  return useQuery({
    queryKey: ["availabilities"],
    queryFn: apiClient.get,
  });
};

export default useGetAvailabilities;
