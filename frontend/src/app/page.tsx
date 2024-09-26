"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Container } from "@mui/material";
import Banner from "@/components/banner";
import BookCard from "@/components/bookcard"; // Assume you created this component
import { useSession } from "next-auth/react"; // Assuming you are using NextAuth for authentication

export default function Home() {
  const { data: session, status } = useSession(); // Get session data from NextAuth
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  // Fetch books data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book?limit=6&page=4`
        );
        setBooks(response.data.rows); // assuming the API returns an array of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Fetch recommendations if user is authenticated
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (status === "authenticated") {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book/recommendations/${session.user.userId}`
          );
          console.log("Recs response: ", JSON.stringify(response.data));
          setRecommendedBooks(response.data.rows); // assuming the API returns an array of recommended books
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };

    fetchRecommendations();
  }, [session]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "2.5em 4em",
        color: "#3C3C3C", // Muted dark color for text
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: "2em" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            marginBottom: "0.5em",
          }}
        >
          Your Library.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#8B8B8B", fontFamily: "Inter" }}
        >
          The best titles are available for you right now!
        </Typography>
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "3em",
        }}
      >
        <Banner />
      </Box>

      {/* All Books Section */}
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "1em",
          textAlign: "center",
        }}
      >
        Popular Books
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2em",
          justifyContent: "center",
        }}
      >
        {books.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Box>

      {/* Recommended Books Section - Conditional Rendering */}
      {recommendedBooks.length > 0 && (
        <>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1em",
              textAlign: "center",
              marginTop: "3em",
            }}
          >
            Check our recommendations
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2em",
              justifyContent: "center",
            }}
          >
            {recommendedBooks.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}
