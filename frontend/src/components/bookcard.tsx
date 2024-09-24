import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import axios from "axios";
import Link from 'next/link';

interface Book {
  title: string;
  author: string;
  price: number;
  imageId: number;
  ISBN: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the image bytes from the API
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Image/${book.imageId}`
        );
        console.log("img response data", response.data);

        // Convert image bytes to base64 string for display
        const base64Image = Buffer.from(response.data.imgData, "binary").toString(
          "base64"
        );
        const mimeType = response.headers["content-type"];
        setImageSrc(`data:${mimeType};base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [book.imageId]);

  return (
    <Link href={`/book/${book.ISBN}`} passHref>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: 2, // theme.spacing(2)
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: 'pointer', // Add cursor pointer for better UX
          '&:hover': { boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)' } // Add hover effect
        }}
      >
        {imageSrc && (
          <CardMedia
            component="img"
            sx={{
              height: "100px",
              objectFit: "cover",
            }}
            src={imageSrc}
            alt={book.title}
          />
        )}
        <CardContent
          sx={{
            padding: 2, // theme.spacing(2)
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: 1, // theme.spacing(1)
            }}
          >
            {book.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "text.secondary",
              marginBottom: 1, // theme.spacing(1)
            }}
          >
            {book.author}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            ${book.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
