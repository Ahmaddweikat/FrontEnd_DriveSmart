import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

export const useLessons = (status) => {
  const apiClient = new APIClient(`/students/lessons/${status}`);

  return useQuery({
    queryKey: ["student-lessons", status],
    queryFn: apiClient.get,
  });
};
