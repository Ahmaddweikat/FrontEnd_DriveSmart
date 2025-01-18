import React from 'react';
import { 
  Select, 
  MenuItem, 
  OutlinedInput,
  Chip,
  Box,
  FormControl,
  InputLabel
} from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 200,
    },
  },
};

const SearchBar = ({ searchQuery, setSearchQuery, daysFilter, setDaysFilter, uniqueDays }) => {
  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    setDaysFilter(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
      </div>
      <div className="w-full sm:w-48">
        <FormControl fullWidth size="small">
          <InputLabel id="days-filter-label">Select Days</InputLabel>
          <Select
            labelId="days-filter-label"
            multiple
            value={daysFilter}
            onChange={handleDaysChange}
            input={<OutlinedInput label="Select Days" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                    key={value} 
                    label={value} 
                    size="small"
                    sx={{ height: 20 }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            sx={{ height: 40 }}
          >
            {uniqueDays.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SearchBar;
