import { useMutation } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";

const apiClient = new APIClient("/students");

const useStudentRegistration = () => {
  return useMutation({
    mutationFn: (studentData) => apiClient.post(studentData),
    onSuccess: (data) => {
      // You can handle success scenarios here
      console.log("Student registered successfully:", data);
    },
    onError: (error) => {
      // You can handle error scenarios here
      console.error("Registration failed:", error);
    },
  });
};

export default useStudentRegistration;
