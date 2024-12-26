import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient("/students/bookings");

  return useMutation({
    mutationFn: (bookingData) => apiClient.post(bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId) => {
      const apiClient = new APIClient(`/students/bookings/${bookingId}/cancel`);
      return apiClient.put();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });
};

export const useGetBookings = () => {
  const apiClient = new APIClient("/students/bookings");

  return useQuery({
    queryKey: ["bookings"],
    queryFn: apiClient.get,
  });
};
