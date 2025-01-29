import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../../../services/apiClient";

const apiClient = new APIClient("/trainers/bookings");

export const useGetTrainerBookings = () => {
  return useQuery({
    queryKey: ["trainer-bookings"],
    queryFn: apiClient.get,
  });
};
