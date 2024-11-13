import { useState, useEffect } from "react";

const useSearchTerm = (setFilter) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(searchTerm); // Update filter after a delay
    }, 300); // 300ms delay

    return () => clearTimeout(handler); // Cleanup on unmount or term change
  }, [searchTerm, setFilter]);

  const clearSearchTerm = () => setSearchTerm("");

  return { searchTerm, setSearchTerm, clearSearchTerm };
};

export default useSearchTerm;
