import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";

const apiClient = new APIClient("/notifications");

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: apiClient.get,
  });

  const markAsRead = useMutation({
    mutationFn: (notificationId) => {
      const markReadClient = new APIClient(
        `/notifications/${notificationId}/read`
      );
      return markReadClient.put();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: () => {
      const markAllReadClient = new APIClient("/notifications/mark-all-read");
      return markAllReadClient.put();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
  };
};
