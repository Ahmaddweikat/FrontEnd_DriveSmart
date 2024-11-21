import { useState } from "react";

const useDropdown = (initialDropdowns = {}) => {
  const [dropdownState, setDropdownState] = useState({
    theoryQuestions: false,
    theoryLearning: false,
    inquiryAbout: false,
    profile: false,
    ...initialDropdowns,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownState((prev) => {
      const isOpen = prev[dropdown];
      return {
        theoryQuestions: false,
        theoryLearning: false,
        inquiryAbout: false,
        profile: false,
        [dropdown]: !isOpen, // Toggle the selected dropdown
      };
    });
  };

  const closeDropdowns = () => {
    setDropdownState((prev) => {
      const closedState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return closedState;
    });
  };

  return {
    dropdownState,
    toggleDropdown,
    closeDropdowns,
  };
};

export default useDropdown;
