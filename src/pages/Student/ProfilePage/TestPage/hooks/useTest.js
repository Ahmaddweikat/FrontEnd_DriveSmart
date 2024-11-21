import { useState, useEffect } from "react";
import { tests } from "../constant/tests";

const useTests = () => {
  const [filter, setFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // This will hold the filtered tests
  const [filteredTests, setFilteredTests] = useState(tests);

  useEffect(() => {
    const filtered = tests.filter((test) => {
      // Filter by search term in title
      const matchesSearch = test.title
        .toLowerCase()
        .includes(filter.toLowerCase());

      // Filter by status (Passed or Failed)
      let matchesStatus = true; // Default to true (show all)
      if (selectedFilter === "passed") {
        matchesStatus = test.score > 24;
      } else if (selectedFilter === "failed") {
        matchesStatus = test.score <= 24;
      }

      // Combine both filters: search term and status
      return matchesSearch && matchesStatus;
    });

    setFilteredTests(filtered);
  }, [filter, selectedFilter]);

  return {
    filteredTests,
    setFilter,
    setSelectedFilter,
  };
};

export default useTests;
