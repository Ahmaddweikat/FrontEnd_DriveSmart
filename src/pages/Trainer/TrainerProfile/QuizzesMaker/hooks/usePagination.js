import { useState } from 'react';

const usePagination = (rowsPerPage = 5) => {
  const [paginationState, setPaginationState] = useState({});

  const handlePageChange = (key, event, value) => {
    setPaginationState(prev => ({ ...prev, [key]: value }));
  };

  const getPaginatedItems = (items, key) => {
    const currentPage = paginationState[key] || 1;
    const totalPages = Math.ceil(items.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    
    return {
      currentItems: items.slice(startIndex, endIndex),
      currentPage,
      totalPages,
      startIndex,
      endIndex
    };
  };

  return {
    handlePageChange,
    getPaginatedItems,
    paginationState
  };
};

export default usePagination;
