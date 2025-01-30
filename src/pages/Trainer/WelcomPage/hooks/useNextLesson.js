import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

const apiClient = new APIClient("/trainers/lessons/next");

const useNextLesson = () => {
  return useQuery({
    queryKey: ["nextLesson"],
    queryFn: apiClient.get,
  });
};

export default useNextLesson;
