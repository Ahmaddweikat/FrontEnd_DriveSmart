import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useStudentProgressStore from "./studentProgress.store";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token) => {
        set({
          user: jwtDecode(token),
          token,
          isAuthenticated: true,
        });
        useStudentProgressStore.getState().initializeProgress();
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      updateProfilePicture: (profilePicture) => {
        set((state) => ({
          user: { ...state.user, profilePicture },
        }));
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
