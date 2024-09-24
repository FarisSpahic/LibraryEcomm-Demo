"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { signIn, useSession } from "next-auth/react";


interface Book {
  title: string;
  author: string;
  price: number;
  imageId: number;
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
    if(status !== 'authenticated') {
      signIn();
    }
    router.push(`/order?bookId=${isbn}`)
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
        console.log('knjiga', book)
        // Fetch the book image
        const imageResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Image/${book?.imageId || 1}`
        );

        const base64Image = Buffer.from(
          imageResponse.data.imgData,
          "binary"
        ).toString("base64");
        const mimeType = imageResponse.headers["content-type"];
        setImageSrc(`data:${mimeType};base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [isbn]);

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{color: 'black', width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: '3em', padding: '2em'}}>
      {imageSrc && <img src={imageSrc} style={{height: '300px', objectFit: 'cover'}} alt={book.title} />}
      <Box>
      <Typography variant="h4" sx={{}}>{book.title}</Typography>
      <Typography variant="h6">Author: {book.author}</Typography>
      <Typography variant="body1">Price: ${book.price}</Typography>
      <Button variant="contained" style={{height: '2em'}} onClick={handlePurchase}>
        Buy
      </Button>
      </Box>
    </Box>
  );
};

export default BookDetails;
