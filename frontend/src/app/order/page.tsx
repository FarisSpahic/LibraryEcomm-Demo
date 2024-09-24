"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Typography, Box, Button, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
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
  const bookId = searchParams.get('bookId');
  const { data: session, status } = useSession();
  const [book, setBook] = useState<Book | null>(null);
  
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    address: '',
    phone: '',
    creditCard: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (status === "unauthenticated") {
      router.push('/');
    }

    // Fetch book details
    const fetchBook = async () => {
      try {
        const bookResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book/ISBN/${bookId}`
        );
        setBook(bookResponse.data);
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
      [e.target.name]: e.target.value
    });
  };

  const handlePurchase = () => {
    // Implement purchase logic here
    alert('Purchase made successfully');
  };

  if (status === "loading" || !book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: 'white', color: 'black', padding: '3em' }}>
      <Typography variant="h4">Order: {book.title}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5em', marginTop: '2em' }}>
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Credit Card Number"
          name="creditCard"
          value={formData.creditCard}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Expiry Date (MM/YY)"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" onClick={handlePurchase}>
          Purchase
        </Button>
      </Box>
    </Box>
  );
};

export default OrderPage;
