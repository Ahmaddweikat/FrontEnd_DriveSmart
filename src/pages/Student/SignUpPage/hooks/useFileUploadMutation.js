import { useMutation } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";
import Roles from "../../../../constants/roles";

const useFileUploadMutation = () => {
  return useMutation({
    mutationFn: async ({ file, ownerId }) => {
      const apiClient = new APIClient(`/files/${Roles.STUDENT}/${ownerId}`);

      return apiClient.postFile(file, "files");
    },
    onSuccess: (data) => {
      console.log("File uploaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
  });
};

export default useFileUploadMutation;
