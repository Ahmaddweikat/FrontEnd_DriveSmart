import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

export const useBookingRespond = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, status, rejectionReason }) => {
      const apiClient = new APIClient(
        `/trainers/bookings/${bookingId}/respond`
      );
      return apiClient.put({ status, rejectionReason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trainer-bookings"]);
    },
  });
};
