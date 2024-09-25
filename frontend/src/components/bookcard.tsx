import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import axios from "axios";
import Link from "next/link";

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
          width: "250px",
          margin: 2,
          borderRadius: "15px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Soft shadow for depth
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out", // Smooth hover effect
          "&:hover": {
            transform: "translateY(-5px)", // Subtle lift on hover
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {imageSrc && (
          <CardMedia
            component="img"
            sx={{
              height: "150px", // Increased height for a more prominent image
              objectFit: "cover",
              borderRadius: "15px 15px 0 0", // Rounded top corners
            }}
            src={imageSrc}
            alt={book.title}
          />
        )}
        <CardContent
          sx={{
            padding: "1.5em", // Ample padding for a clean look
            backgroundColor: "#F7F4F3", // Pastel background to match theme
            borderRadius: "0 0 15px 15px", // Rounded bottom corners
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "0.5em",
              color: "#3C3C3C", // Muted text color for titles
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.95rem",
              color: "#8B8B8B", // Lighter gray for author
              marginBottom: "0.75em",
            }}
          >
            {book.author}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: "1.1rem",
              color: "#FF69B4", // Pink accent for price
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
