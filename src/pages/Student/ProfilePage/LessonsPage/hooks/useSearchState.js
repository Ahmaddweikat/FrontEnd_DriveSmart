import { useState } from "react";

const useSearchState = (lessons) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLessons = lessons.filter((lesson) => {
    return lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return {
    searchTerm,
    setSearchTerm,
    filteredLessons,
  };
};

export default useSearchState;
