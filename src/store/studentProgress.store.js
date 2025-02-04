import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuthStore from "./auth.store";

const useStudentProgressStore = create(
  persist(
    (set) => ({
      theoreticalExamStatus: "Not Attempted",
      hasBookedTrainer: false,
      successRate: 0,
      completedLessons: 0,

      initializeProgress: () => {
        const studentName = useAuthStore.getState().user?.name;

        switch (studentName) {
          case "Ibraheem Qadi":
            set({
              theoreticalExamStatus: "Not Attempted",
              hasBookedTrainer: false,
              successRate: 10,
              completedLessons: 0,
            });
            break;

          case "Ahmad Dweikat":
            set({
              theoreticalExamStatus: "Not Attempted",
              hasBookedTrainer: false,
              successRate: 96,
              completedLessons: 0,
            });
            break;

          case "Omar Qasem":
            set({
              theoreticalExamStatus: "Passed",
              hasBookedTrainer: true,
              successRate: 92,
              completedLessons: 20,
            });
            break;

          default:
            set({
              theoreticalExamStatus: "Not Attempted",
              hasBookedTrainer: false,
              successRate: 0,
              completedLessons: 0,
            });
        }
      },

      updateProgress: (newProgress) => {
        set((state) => ({
          ...state,
          ...newProgress,
        }));
      },
    }),
    {
      name: "student-progress-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useStudentProgressStore;
