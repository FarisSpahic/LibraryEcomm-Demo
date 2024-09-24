"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Typography, Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  publisher: string;
  availability: boolean;
  totalPages: number;
  imageId: number | null;
  ISBN: string;
}

interface BookDetailsProps {
  params: { isbn: string };
}

const BookDetails = ({ params }: BookDetailsProps) => {
  const { isbn } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handlePurchase = () => {
    if (status !== 'authenticated') {
      signIn();
    } else {
      router.push(`/order?bookId=${isbn}`);
    }
  };

  useEffect(() => {
    if (!isbn) return;

    // Fetch the book details by ISBN
    const fetchBook = async () => {
      try {
        const bookResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book/ISBN/${isbn}`
        );
        setBook(bookResponse.data);

        // Fetch the book image if imageId exists
        if (bookResponse.data.imageId) {
          const imageResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Image/${bookResponse.data.imageId}`
          );
          const base64Image = Buffer.from(imageResponse.data.imgData, "binary").toString("base64");
          const mimeType = imageResponse.headers["content-type"];
          setImageSrc(`data:${mimeType};base64,${base64Image}`);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [isbn]);

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Box 
      sx={{
        color: 'black', // Change text color to black for better readability
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3.5em',
      }}
    >
      {imageSrc && (
        <Box 
          component="img"
          src={imageSrc}
          alt={book.title}
          sx={{
            height: '400px',
            width: 'auto',
            borderRadius: '20px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            marginRight: '2em', // Space between image and text
          }}
        />
      )}
      <Divider orientation="vertical" flexItem sx={{ marginX: '2em', backgroundColor: 'gray' }} /> {/* Vertical Divider */}
      <Box 
        sx={{
          flex: 1, // Take remaining space
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start', // Align text to the left
          justifyContent: 'center',
          padding: '0 2em',
          maxWidth: '600px', // Limit max width for better readability
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '0.5em', fontSize: '1.5rem' }}>
          {book.title}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '0.5em', fontSize: '1rem' }}>
          Author: {book.author}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '0.5em', fontSize: '1rem' }}>
          Publisher: {book.publisher}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '0.5em', fontSize: '1rem' }}>
          Total Pages: {book.totalPages}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '0.5em', fontSize: '1rem' }}>
          In Stock: {book.availability ? "Yes" : "No"}
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: '1em', fontSize: '1.2rem' }}>
          Price: ${book.price.toFixed(2)}
        </Typography>

        {/* Random Description */}
        <Typography variant="body1" sx={{ marginTop: '1em', fontSize: '1rem' }}>
          This is a fascinating story that explores the depths of human emotion and experience. 
          It captivates readers with its intricate plot and unforgettable characters. 
          Dive into a world of imagination and adventure!
        </Typography>
      </Box>
      <Box>
        <Button 
          variant="contained" 
          onClick={handlePurchase} 
          sx={{
            backgroundColor: 'orange',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkorange',
            },
            height: '60px', // Height of the button
            width: '150px', // Width of the button
            fontSize: '1.2rem',
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default BookDetails;
