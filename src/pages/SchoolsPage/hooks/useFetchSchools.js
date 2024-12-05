import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";

const apiClient = new APIClient("/schools");

const useFetchSchools = () => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: apiClient.get,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

export default useFetchSchools;
