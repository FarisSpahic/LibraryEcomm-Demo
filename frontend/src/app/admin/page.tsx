"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasRole, setHasRole] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    ISBN: "",
    publisher: "",
    availability: false,
    totalPages: 0,
    price: 0,
    imageId: 0,
  });

  useEffect(() => {
    if (status === "authenticated") {
      const userRoles = session?.user.roles || [];
      if (userRoles.includes("offline_access")) {
        setHasRole(true);
      } else {
        router.push("/"); // Redirect if the user doesn't have the role
      }
    } else if (status === "unauthenticated") {
      router.push("/"); // Redirect if unauthenticated
    }
  }, [status, session, router]);

  // Handle form change
  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission here (e.g., API request to submit the book)
    console.log("Form Data: ", formData);
  };

  if (status === "loading" || (status === "authenticated" && !hasRole)) {
    return (
      <Box sx={{ padding: "2em", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
        <Typography variant="h5" style={{ color: "black" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2em", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "2em",
          maxWidth: 600,
          margin: "auto",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "2em" }}>

        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ marginTop: "2em", display: hasRole ? "block" : "none" }}
        >
          <Typography variant="h5" gutterBottom>
            Submit a New Book
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="ISBN"
            name="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Available"
          />
          <TextField
            label="Total Pages"
            name="totalPages"
            type="number"
            value={formData.totalPages}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Image ID"
            name="imageId"
            type="number"
            value={formData.imageId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: "1em" }}
          >
            Submit Book
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/")} // Button to go back to home
          sx={{ marginTop: "2em" }}
        >
          Go Back Home
        </Button>
      </Paper>
    </Box>
  );
}
