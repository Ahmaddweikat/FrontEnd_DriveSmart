import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/users/profile");

const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: apiClient.get,
  });
};

export default useGetProfile;
