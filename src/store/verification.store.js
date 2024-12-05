import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVerificationStore = create(
  persist(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
    }),
    {
      name: "verification-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useVerificationStore;
