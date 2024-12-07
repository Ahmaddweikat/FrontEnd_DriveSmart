import { useState } from "react";

const useQuizFilter = () => {
  const [filter, setFilter] = useState(""); // Search term
  const [selectedFilter, setSelectedFilter] = useState("all"); // Status filter

  const applyFilter = (quizzes) => {
    return quizzes.filter((quiz) => {
      // Apply search term filter
      const searchCondition = filter
        ? quiz.title.toLowerCase().includes(filter.toLowerCase()) ||
          quiz.timeSpent.toLowerCase().includes(filter.toLowerCase()) ||
          quiz.score.toString().includes(filter) ||
          quiz.status.toLowerCase().includes(filter.toLowerCase())
        : true;

      // Apply status filter
      let statusCondition = true;
      if (selectedFilter === "passed") {
        statusCondition = quiz.status === "PASSED";
      } else if (selectedFilter === "failed") {
        statusCondition = quiz.status === "FAILED";
      }

      return searchCondition && statusCondition;
    });
  };

  return {
    setFilter,
    selectedFilter,
    setSelectedFilter,
    applyFilter,
  };
};

export default useQuizFilter;
