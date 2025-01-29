import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

export const useLessons = (status) => {
  const apiClient = new APIClient(`/trainers/lessons/${status}`);

  return useQuery({
    queryKey: ["lessons", status],
    queryFn: apiClient.get,
  });
};

export const useCancelLesson = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient("/trainers/lessons/cancel");

  return useMutation({
    mutationFn: (data) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["lessons"]);
    },
  });
};

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient("/trainers/lessons/complete");

  return useMutation({
    mutationFn: (data) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["lessons"]);
    },
  });
};
