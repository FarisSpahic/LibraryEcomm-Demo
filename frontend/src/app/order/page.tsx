"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Typography, Box, Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";

interface Book {
  title: string;
  author: string;
  price: number;
  imageId: number;
  ISBN: string;
}

const OrderPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("bookId");
  const { data: session, status } = useSession();
  const [book, setBook] = useState<Book | null>(null);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    addressLine: "",
    phoneNumber: "",
    bookId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    const fetchBook = async () => {
      try {
        const bookResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book/ISBN/${bookId}`
        );
        setBook(bookResponse.data);
        formData.bookId = bookResponse.data.id;
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePurchase = async () => {
    try {
      if (session?.user.userId === undefined) {
        alert("User not signed in!!!");
        return;
      }
      if (bookId === "" || bookId === "0") {
        alert("No book is selected!");
        return;
      }
      const bookResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Order/`,
        {
          ...formData,
          userId: session?.user?.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (bookResponse.status !== 201) alert("Purchase failed!");
      else {
        alert("Purchase succeeded!");
        router.push("/");
      }
      setBook(bookResponse.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  if (status === "loading" || !book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box 
      sx={{ 
        backgroundColor: "#f5f5f5", 
        color: "black", 
        padding: "3em", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: "white", 
          padding: "2em", 
          borderRadius: "8px", 
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", 
          width: "400px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1em", textAlign: "center" }}>
          Order: {book.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5em",
          }}
        >
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <TextField
            label="Address"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <TextField
            label="Credit Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <TextField
            label="Expiry Date (MM/YY)"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <TextField
            label="CVV"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handlePurchase}
            sx={{ 
              backgroundColor: '#3f51b5', 
              '&:hover': { 
                backgroundColor: '#303f9f' 
              },
              marginTop: '1em',
            }}
          >
            Purchase
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderPage;
