import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button } from '@mui/material';
import { signOut } from 'next-auth/react';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    float: 'right', // Aligns the dropdown to the right
  },
  dropdownToggle: {
    backgroundColor: 'white', // Green
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'gray',
    },
  },
  dropdownMenu: {
    display: 'block',
    position: 'absolute',
    right: 0, // Ensures the dropdown opens aligned with the button
    backgroundColor: '#f1f1f1',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  menuItem: {
    listStyleType: 'none',
    padding: '12px 16px',
    '& a': {
      color: 'black',
      textDecoration: 'none',
      display: 'block',
      '&:hover': {
        backgroundColor: '#ddd',
      },
    },
  },
}));



const DropdownMenu = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default link behavior
    await signOut(); // Call your actual sign-out logic
    // router.push('/'); // Redirect after sign out
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box className={classes.dropdown} ref={dropdownRef}>
      <Button onClick={toggleDropdown} className={classes.dropdownToggle}>
        Menu
      </Button>
      {isOpen && (
        <ul className={classes.dropdownMenu}>
              <li className={classes.menuItem}><a href="/profile">Profile</a></li>
              <li className={classes.menuItem}><a href="#" onClick={handleSignOut} >Log out</a></li>
        </ul>
      )}
    </Box>
  );
};

export default DropdownMenu;
