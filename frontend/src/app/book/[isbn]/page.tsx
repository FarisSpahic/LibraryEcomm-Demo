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
    if (status !== "authenticated") {
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
          const base64Image = Buffer.from(imageResponse.data.imgData, "binary").toString(
            "base64"
          );
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
        color: "black",
        fontFamily: "Inter, sans-serif", // Inter applied globally
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "3.5em",
      }}
    >
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt={book.title}
          sx={{
            height: "400px",
            width: "auto",
            borderRadius: "20px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            marginRight: "2em",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)", // Slight zoom on hover
            },
          }}
        />
      )}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ marginX: "2em", backgroundColor: "gray" }}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 2em",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "0.5em",
            fontSize: "2rem", // Bigger font size for emphasis
            fontFamily: "Gowun Batang, serif", // Title uses "Gowun Batang"
            fontWeight: "bold", // Make the title bold
            transition: "color 0.3s ease",
            "&:hover": {
              color: "gray", // Subtle color change on hover
            },
          }}
        >
          {book.title}
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: "0.5em", fontWeight: "bold" }}>
          Author: <span style={{ fontWeight: "normal" }}>{book.author}</span>
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: "0.5em", fontWeight: "bold" }}>
          Publisher: <span style={{ fontWeight: "normal" }}>{book.publisher}</span>
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: "0.5em", fontWeight: "bold" }}>
          Total Pages: <span style={{ fontWeight: "normal" }}>{book.totalPages}</span>
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: "0.5em", fontWeight: "bold" }}>
          In Stock:{" "}
          <span style={{ fontWeight: "normal" }}>{book.availability ? "Yes" : "No"}</span>
        </Typography>

        <Typography
          variant="h5"
          sx={{ marginBottom: "1em", fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Price: <span style={{ fontWeight: "normal" }}>${book.price.toFixed(2)}</span>
        </Typography>

        {/* Random Description */}
        <Typography variant="body1" sx={{ marginTop: "1em", lineHeight: "1.6" }}>
          This is a fascinating story that explores the depths of human emotion and
          experience. It captivates readers with its intricate plot and unforgettable
          characters. Dive into a world of imagination and adventure!
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={handlePurchase}
          sx={{
            backgroundColor: "#e0e0e0", // Gentle gray for the button
            color: "black",
            "&:hover": {
              backgroundColor: "#cfcfcf", // Darker gray on hover
            },
            height: "60px",
            width: "150px",
            fontSize: "1.2rem",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            // "&:hover": {
            //   transform: "scale(1.05)", // Subtle zoom on hover
            //   boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow on hover
            // },
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default BookDetails;
