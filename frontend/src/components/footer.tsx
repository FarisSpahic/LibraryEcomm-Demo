import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme, Typography } from '@mui/material';

// Define styles using makeStyles
const useStyles = makeStyles((theme: Theme) => ({
  footerStyle: {
    height: '35vh',
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    color: 'black',
    padding: theme.spacing(2), // Optionally use theme spacing
  },
  footerTitle: {
    color: "yellow"
  }
}));

export default function Footer() {
  const classes = useStyles(); // Use the styles

  return (
    <footer className={classes.footerStyle}>
      <Typography className={classes.footerTitle}>Footer</Typography>
      <Typography>footer data</Typography>
    </footer>
  );
}
