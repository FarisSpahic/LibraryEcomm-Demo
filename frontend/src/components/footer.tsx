import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: '35vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2c3e50', // Dark blue color
        color: 'white',
        padding: 4,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{fontFamily: "Gowun Batang"}}>
            BestLibrary LTE
          </Typography>
          <Typography variant="body2" gutterBottom>
            &copy; {new Date().getFullYear()} BestLibrary. All Rights Reserved.
          </Typography>
          <Typography variant="body2" gutterBottom>
            123 Business St.<br />
            Suite 456<br />
            City, State, Zip
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Typography sx={{fontFamily: "Gowun Batang"}} variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" gutterBottom>
            Phone: (+387) 456-7890
          </Typography>
          <Typography variant="body2" gutterBottom>
            Fax: (+387) 456-7891
          </Typography>
          <Typography variant="body2">
            Email: <Link href="mailto:info@company.com" color="inherit">info@bestlibrary.com</Link>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography sx={{fontFamily: "Gowun Batang"}} variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit">Facebook</Link>
            <Link href="#" color="inherit">Twitter</Link>
            <Link href="#" color="inherit">Instagram</Link>
            <Link href="#" color="inherit">LinkedIn</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
