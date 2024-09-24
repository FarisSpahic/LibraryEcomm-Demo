"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import Banner from "@/components/banner";
import BookCard from "@/components/bookcard"; // Assume you created this component

export default function Home() {
  const [books, setBooks] = useState([]);

  // Fetch books data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book?limit=5`
        );
        setBooks(response.data.rows); // assuming the API returns an array of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: '2.5em',
        alignItems: 'center',
        color: 'black',
      }}
    >
      <Box>
        <Typography variant="body1">Your library</Typography>
        <Typography variant="body2">
          The best titles are available to you at this very moment!
        </Typography>
        <Banner imgSrc="/images/front-banner-1.jpg" />
      </Box>

      {/* Display the book cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginTop: "2em",
        }}
      >
        {books.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Box>
    </Box>
  );
}
