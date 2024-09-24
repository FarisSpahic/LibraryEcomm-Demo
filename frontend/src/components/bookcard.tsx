import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Link from 'next/link';
// Define styles
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "25vw",
    margin: theme.spacing(2),
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    height: "300px",
    objectFit: "cover",
  },
  content: {
    padding: theme.spacing(2),
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  author: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

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
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the image bytes from the API
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Image/${book.imageId}`);
        console.log("img response data", response.data)
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
    <Card className={classes.card}>
      {imageSrc && (
        <CardMedia
          component="img"
          className={classes.image}
          src={imageSrc}
          alt={book.title}
        />
      )}
      <CardContent className={classes.content}>
        <Typography className={classes.title}>{book.title}</Typography>
        <Typography className={classes.author}>{book.author}</Typography>
        <Typography className={classes.price}>
          ${book.price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};

export default BookCard;
