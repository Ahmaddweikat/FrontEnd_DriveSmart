import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery, licenseFilter, setLicenseFilter, licenseTypes }) => {
  return (
    <Box className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>License Type</InputLabel>
        <Select
          value={licenseFilter}
          onChange={(e) => setLicenseFilter(e.target.value)}
          label="License Type"
        >
          <MenuItem value="all">All Types</MenuItem>
          {licenseTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchBar;
