import { create } from "zustand";

const useSchoolRegistrationStore = create((set) => ({
  selectedSchool: null,
  selectedLicense: null,
  setSelectedSchool: (school) => set({ selectedSchool: school }),
  setSelectedLicense: (license) => set({ selectedLicense: license }),
  clearSelections: () => set({ selectedSchool: null, selectedLicense: null }),
}));

export default useSchoolRegistrationStore;
