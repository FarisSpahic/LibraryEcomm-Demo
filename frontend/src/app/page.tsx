"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Banner from "@/components/banner";
import BookCard from "@/components/bookcard"; // Assume you created this component

// Define styles using makeStyles
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    margin: 0,
    padding: '2.5em',
    alignItems: 'center',
    color: 'black',
  },
  main: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  body: {
    margin: 0,
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "2em",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);

  // Fetch books data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book?limit=5`);
        setBooks(response.data.rows); // assuming the API returns an array of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="body1">Your library</Typography>
        <Typography variant="body2">
          The best titles are available to you at this very moment!
        </Typography>
        <Banner imgSrc="/images/front-banner-1.jpg" />
      </Box>

      {/* Display the book cards */}
      <Box className={classes.cardContainer}>
        {books.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Box>
    </Box>
  );
}
