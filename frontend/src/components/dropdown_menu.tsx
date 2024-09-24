import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';

const DropdownMenu = () => {
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
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        float: 'right',
      }}
      ref={dropdownRef}
    >
      <Button
        onClick={toggleDropdown}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      >
        Menu
      </Button>
      {isOpen && (
        <List
          sx={{
            display: 'block',
            position: 'absolute',
            right: 0,
            backgroundColor: '#f1f1f1',
            minWidth: '160px',
            boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
            zIndex: 1,
            listStyleType: 'none',
            padding: 0,
          }}
        >
          <ListItem
            sx={{
              padding: '12px 16px',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}
          >
            <Typography
              component="a"
              href="/profile"
              sx={{
                color: 'black',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              Profile
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              padding: '12px 16px',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}
          >
            <Typography
              component="a"
              href="#"
              onClick={handleSignOut}
              sx={{
                color: 'black',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              Log out
            </Typography>
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default DropdownMenu;
