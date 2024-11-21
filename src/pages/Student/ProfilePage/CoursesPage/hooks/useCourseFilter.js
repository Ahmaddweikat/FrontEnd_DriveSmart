import { useState } from "react";

export const useCourseFilter = () => {
  const [filter, setFilter] = useState(""); // Search term
  const [selectedFilter, setSelectedFilter] = useState("all"); // Difficulty filter

  const applyFilter = (courses) => {
    return courses.filter((course) => {
      // Apply search term filter
      const searchCondition = filter
        ? course.title.toLowerCase().includes(filter.toLowerCase()) ||
          course.description.toLowerCase().includes(filter.toLowerCase())
        : true;

      // Apply difficulty filter
      let difficultyCondition = true;
      if (selectedFilter === "beginner") {
        difficultyCondition = course.difficult === 1;
      } else if (selectedFilter === "intermediate") {
        difficultyCondition = course.difficult === 2;
      } else if (selectedFilter === "advanced") {
        difficultyCondition = course.difficult === 3;
      }

      return searchCondition && difficultyCondition;
    });
  };

  return {
    setFilter,
    selectedFilter,
    setSelectedFilter,
    applyFilter,
  };
};
