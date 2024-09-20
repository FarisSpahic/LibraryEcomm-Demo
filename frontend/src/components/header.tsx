import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

// Define styles using makeStyles
const useStyles = makeStyles((theme: Theme) => ({
  headerStyle: {
    display: 'flex',
    height: '10vh',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    color: 'black',
    padding: theme.spacing(2), // Optionally use theme spacing
  },
  headerText: {
    display: 'inline',
  }
}));

export default function Header() {
  const classes = useStyles(); // Use the styles

  return (
    <footer className={classes.headerStyle}>
      <h1 className={classes.headerText}>Header</h1>
      <p>header data</p>
    </footer>
  );
}