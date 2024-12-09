import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

const apiClient = new APIClient("/students/profile");
const useGetStudentProfile = () => {
  return useQuery({
    queryKey: ["studentProfile"],
    queryFn: apiClient.get,
  });
};

export default useGetStudentProfile;
