import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

const apiClient = new APIClient("/trainers/availability");

export const useTrainerAvailability = () => {
  const queryClient = useQueryClient();

  const { data: availabilities = [], isLoading } = useQuery({
    queryKey: ["trainer-availabilities"],
    queryFn: apiClient.get,
  });

  const createAvailability = useMutation({
    mutationFn: (data) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainer-availabilities"]);
    },
  });

  const updateAvailability = useMutation({
    mutationFn: ({ id, data }) => {
      const updateClient = new APIClient(`/trainers/availability/${id}`);
      return updateClient.put(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trainer-availabilities"]);
    },
  });

  const deleteAvailability = useMutation({
    mutationFn: (id) => {
      const deleteClient = new APIClient(`/trainers/availability/${id}`);
      return deleteClient.delete();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trainer-availabilities"]);
    },
  });

  return {
    availabilities,
    isLoading,
    createAvailability: createAvailability.mutate,
    updateAvailability: updateAvailability.mutate,
    deleteAvailability: deleteAvailability.mutate,
  };
};
