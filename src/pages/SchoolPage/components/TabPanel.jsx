import React from 'react';
import { Box } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3, backgroundColor: 'customGreen' }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
