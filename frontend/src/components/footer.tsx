import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: '35vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'blue',
        color: 'black',
        padding: 2, // theme spacing can also be used here as `padding: (theme) => theme.spacing(2)`
      }}
    >
      <Typography sx={{ color: 'yellow' }}>Footer</Typography>
      <Typography>footer data</Typography>
    </Box>
  );
}
