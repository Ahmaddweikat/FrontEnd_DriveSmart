import React from 'react';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const SearchAndFilter = ({ searchTerm, setSearchTerm, dateFilter, setDateFilter }) => {
  const handleClear = () => {
    setSearchTerm('');
    setDateFilter('');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full items-end">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
      </div>
      <div className="w-full sm:w-48">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
      </div>
      {(searchTerm || dateFilter) && (
        <Button
          variant="outlined"
          onClick={handleClear}
          startIcon={<ClearIcon sx={{ color: '#72b626' }} />}
          sx={{
            height: '41px',
            borderColor: 'rgb(209 213 219)',
            color: '#72b626',
            '&:hover': {
              borderColor: '#72b626',
              backgroundColor: 'rgba(114, 182, 38, 0.04)'
            }
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default SearchAndFilter;
